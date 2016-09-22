'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerTextEditorCommand('extension.equalize', (textEditor, edit) => {

        const document = textEditor.document;

        textEditor.edit(editBuilder => {

            textEditor.selections.forEach(selection => {

                let maxLineLength = -1;
                const arrLineLayout: { numLine: number, length: number, lastCharPos: vscode.Position }[] = [];

                for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; lineIndex++) {

                    const charactersInLine = document.lineAt(lineIndex).range.end.character - document.lineAt(lineIndex).range.start.character;
                    const documentPos = document.lineAt(lineIndex).range.end;

                    if ((charactersInLine > 0) || (lineIndex < selection.end.line)) {

                        if (charactersInLine > maxLineLength) {
                            maxLineLength = charactersInLine;
                        }

                        arrLineLayout.push({
                            numLine: lineIndex + 1,
                            length: charactersInLine,
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
