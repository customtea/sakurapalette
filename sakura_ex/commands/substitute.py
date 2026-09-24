from ..context import SakuraContext


class Substitute:
    def execute(self, command):
        if command.range_text == "%":
            SakuraContext.replace_all(command.pattern, command.replacement)
        else:
            SakuraContext.replace(command.pattern, command.replacement)


def register(dispatcher):
    dispatcher.register(["substitute"], Substitute())
