from ..context import SakuraContext


class Write:
    def execute(self, command):
        SakuraContext.save()


class Quit:
    def execute(self, command):
        if command.bang:
            SakuraContext.execute_editor_command("FileClose")
        else:
            SakuraContext.close()


class WriteQuit:
    def execute(self, command):
        SakuraContext.save()
        SakuraContext.close()


class Undo:
    def execute(self, command):
        SakuraContext.undo()


class Redo:
    def execute(self, command):
        SakuraContext.redo()


def register(dispatcher):
    dispatcher.register(["w", "write"], Write())
    dispatcher.register(["q", "quit"], Quit())
    dispatcher.register(["wq", "x"], WriteQuit())
    dispatcher.register(["u", "undo"], Undo())
    dispatcher.register(["redo"], Redo())
