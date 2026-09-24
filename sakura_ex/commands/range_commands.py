from ..context import SakuraContext
from ..range import resolve


class RangeCommand:
    def execute(self, command):
        start, _, _ = resolve(command.range_text)
        SakuraContext.goto_line(start)


class PrintCommand:
    def execute(self, command):
        start, _, _ = resolve(command.range_text)
        SakuraContext.goto_line(start)


class DeleteCommand:
    def execute(self, command):
        start, end, whole = resolve(command.range_text)
        # Use Sakura's native command dispatcher for deletion. This keeps
        # command implementation independent of selection API details.
        if whole:
            SakuraContext.execute_editor_command("SelectAll")
            SakuraContext.execute_editor_command("Delete")
        else:
            SakuraContext.goto_line(start)
            if start == end:
                SakuraContext.execute_editor_command("DeleteLine")
            else:
                raise NotImplementedError(
                    "複数行削除はSakura APIの選択操作を確認してから有効化します。"
                )


def register(dispatcher):
    dispatcher.register(["range"], RangeCommand())
    dispatcher.register(["p", "print", "list"], PrintCommand())
    dispatcher.register(["d", "delete"], DeleteCommand())
