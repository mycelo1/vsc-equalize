# EQUALIZE extension for Visual Studio Code

Append spaces on blocks of lines to make them the same size.

---

## Features

Given one or more groups of selected lines, this command would find out the length of the longest one and append spaces to the other lines, giving them all the same number of characters.

This is intended to make column/rectangle selections and operations more friendly.

---

## How to Use

* **EQUALIZE** -- Select lines and hit `ctrl+alt+l`. All selected lines would become the same length by adding spaces on the right.

* **UNEQUALIZE** -- Select equalized lines and hit `ctrl+alt+u`. Exceeding spaces on the right of the lines will be trimmed.

---

![equalizing lines](https://cdn.rawgit.com/mycelo1/vsc-equalize/master/images/capture1.gif)

---

## Extension Settings

**Feature** | **Command** | **Shortcut Key**
--- | --- | :---:
**EQUALIZE** | *extension.equalize* | `ctrl+alt+l`
**UNEQUALIZE** | *extension.unequalize* | `ctrl+alt+u`
| |

---

## Source

[https://github.com/mycelo1/vsc-equalize](https://github.com/mycelo1/vsc-equalize)

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

### 1.2.0

* Added **UNEQUALIZE** command
