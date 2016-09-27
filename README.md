# EQUALIZE extension for Visual Studio Code

Append spaces on blocks of lines to make them the same size.

-----------------------------------------------------------------------------------------------------------

## Features

Given one or more groups of selected lines, this command would find out the length of the longest one and append spaces to the other lines, giving them all the same number of characters.

This is intended to make column/rectangle selections and operations more friendly.

-----------------------------------------------------------------------------------------------------------

## How to Use

* Select some lines and hit `ctrl+alt+l`.

* Alternatively, open the command pallete with `ctrl+shift+p` and type **equalize**.

-----------------------------------------------------------------------------------------------------------

![equalizing lines](https://cdn.rawgit.com/mycelo1/vsc-equalize/master/images/capture1.gif)

-----------------------------------------------------------------------------------------------------------

## Extension Settings

By default the command **'extension.equalize'** is assigned to `ctrl+alt+l`

-----------------------------------------------------------------------------------------------------------

## Source

[https://github.com/mycelo1/vsc-equalize/issues](https://github.com/mycelo1/vsc-equalize/issues)

-----------------------------------------------------------------------------------------------------------

## Support, issues and bug reports

[Create an issue](https://github.com/mycelo1/vsc-equalize/issues)

-----------------------------------------------------------------------------------------------------------

## Release Notes

### 1.0.0

Initial release.

### 1.0.1

* Fixed screenshots
* Added Github repository

### 1.1.0

* Support for tab character

### 1.1.1

* Added screen capture to README
* New extension icon

### 1.1.2

* Ignore the last line if not fully selected
