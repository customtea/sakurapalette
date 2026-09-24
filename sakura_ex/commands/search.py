from ..context import SakuraContext


class Search:
    def execute(self, command):
        SakuraContext.search(command.pattern)


def register(dispatcher):
    dispatcher.register(["search"], Search())
