'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerTextEditorCommand('extension.equalize', (textEditor, edit) => {

        const document = textEditor.document;
        const tabSize = Number(textEditor.options.tabSize);

        textEditor.edit(editBuilder => {

            textEditor.selections.forEach(selection => {

                let maxLineLength = -1;
                const arrLineLayout: { numLine: number, length: number, lastCharPos: vscode.Position }[] = [];

                for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; lineIndex++) {

                    const charactersInLine = document.lineAt(lineIndex).range.end.character - document.lineAt(lineIndex).range.start.character;
                    const lineText = document.lineAt(lineIndex).text;
                    const documentPos = document.lineAt(lineIndex).range.end;

                    if ((lineIndex < selection.end.line) || (document.lineAt(lineIndex).range.end.isBeforeOrEqual(selection.end) && (charactersInLine > 0))) {

                        let lineColumns = 0;

                        if (tabSize > 1) {

                            let lineChar = 0;

                            while (true) {

                                let prevIndex = lineChar;
                                lineChar = lineText.indexOf("\t", prevIndex);

                                if (lineChar >= 0) {
                                    lineColumns += lineChar - prevIndex;
                                    lineColumns += tabSize - (lineColumns % tabSize);
                                    lineChar++;
                                }
                                else {
                                    lineColumns += lineText.length - prevIndex;
                                    break;
                                }
                            }
                        }
                        else {
                            lineColumns = charactersInLine;
                        }

                        if (lineColumns > maxLineLength) {
                            maxLineLength = lineColumns;
                        }

                        arrLineLayout.push({
                            numLine: lineIndex + 1,
                            length: lineColumns,
                            lastCharPos: documentPos
                        })
                    }
                }

                arrLineLayout.forEach(layout => {
                    if (layout.length < maxLineLength) {
                        editBuilder.insert(layout.lastCharPos, ' '.repeat(maxLineLength - layout.length));
                    }
                })

            });

        }).then(() => { });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
