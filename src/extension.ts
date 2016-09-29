'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const commandEqualize = vscode.commands.registerTextEditorCommand('extension.equalize', (textEditor, edit) => {
        doEqualize(textEditor, edit);
    });

    const commandUnequalize = vscode.commands.registerTextEditorCommand('extension.unequalize', (textEditor, edit) => {
        doUnequalize(textEditor, edit);
    });

    context.subscriptions.push(commandEqualize);
    context.subscriptions.push(commandUnequalize);
}

export function deactivate() {
}

function doEqualize(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {

    const document = textEditor.document;
    const tabSize = Number(textEditor.options.tabSize);

    textEditor.edit(editBuilder => {

        textEditor.selections.forEach(selection => {

            let maxLineLength = -1;
            const arrLineLayout: { numLine: number, length: number, lastCharPos: vscode.Position }[] = [];

            for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; lineIndex++) {

                const lineAt = document.lineAt(lineIndex);
                const lineText = lineAt.text;
                const charactersInLine = lineAt.range.end.character - lineAt.range.start.character;
                const documentPos = lineAt.range.end;

                if ((lineIndex < selection.end.line) || (lineAt.range.end.isBeforeOrEqual(selection.end) && (charactersInLine > 0))) {

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
    });
}

function doUnequalize(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {

    const document = textEditor.document;
    const tabSize = Number(textEditor.options.tabSize);

    textEditor.edit(editBuilder => {

        textEditor.selections.forEach(selection => {

            const arrLineLayout: { numLine: number, length: number, lastCharPos: vscode.Position }[] = [];

            for (let lineIndex = selection.end.line; lineIndex >= selection.start.line; lineIndex--) {

                const lineAt = document.lineAt(lineIndex);
                const lineText = lineAt.text;
                const charactersInLine = lineAt.range.end.character - lineAt.range.start.character;
                const documentPos = lineAt.range.end;

                if (charactersInLine > 0) {

                    if ((lineIndex < selection.end.line) || lineAt.range.end.isBeforeOrEqual(selection.end)) {

                        const lastSpaceSeg = lineAt.text.search(/\s*$/);

                        if (lastSpaceSeg == 0) {

                            editBuilder.delete(lineAt.range);
                        }
                        else if (lastSpaceSeg > 0) {

                            editBuilder.delete(new vscode.Range(lineAt.range.start.translate(0, lastSpaceSeg), lineAt.range.end));
                        }
                    }
                }
            }
        });
    });
}
