"""Only module that knows SakuraEditor's Python API names."""

import SakuraEditor


class SakuraContext:
    @staticmethod
    def input_box(title, prompt, default=""):
        # Sakura 2.4.3 Python binding follows the macro-function names.
        # Keep this call isolated so an API naming difference only affects this file.
        return SakuraEditor.InputBox(title, prompt, default)

    @staticmethod
    def message(text):
        return SakuraEditor.MessageBox(text)

    @staticmethod
    def about():
        return SakuraEditor.About()

    @staticmethod
    def command_list():
        return SakuraEditor.CommandList()

    @staticmethod
    def filename():
        return SakuraEditor.ExpandParameter("$F")

    @staticmethod
    def current_line():
        return int(SakuraEditor.ExpandParameter("$y"))

    @staticmethod
    def line_count():
        return int(SakuraEditor.ExpandParameter("$L"))

    @staticmethod
    def goto_line(line):
        return SakuraEditor.GoLine(line)

    @staticmethod
    def save():
        return SakuraEditor.FileSave()

    @staticmethod
    def close():
        return SakuraEditor.FileClose()

    @staticmethod
    def undo():
        return SakuraEditor.Undo()

    @staticmethod
    def redo():
        return SakuraEditor.Redo()

    @staticmethod
    def search(pattern):
        return SakuraEditor.SearchNext(pattern)

    @staticmethod
    def replace(pattern, replacement):
        return SakuraEditor.Replace(pattern, replacement)

    @staticmethod
    def replace_all(pattern, replacement):
        return SakuraEditor.ReplaceAll(pattern, replacement)

    @staticmethod
    def execute_editor_command(command):
        return SakuraEditor.ExecCommand(command)
