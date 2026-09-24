from ..context import SakuraContext


class Version:
    def execute(self, command):
        SakuraContext.about()


class Help:
    def execute(self, command):
        SakuraContext.message(
            "Sakura Ex Command Palette\n\n"
            ":version  :help  :commands  :pwd\n"
            ":echo TEXT\n"
            ":w  :q  :wq  :x  :u  :redo\n"
            ":10  :10,20p  :10,20d  :%d\n"
            ":s/foo/bar/  :s/foo/bar/g  :%s/foo/bar/g\n"
            ":/pattern/\n"
        )


class Commands:
    def execute(self, command):
        SakuraContext.command_list()


class Pwd:
    def execute(self, command):
        SakuraContext.message(SakuraContext.filename())


class Echo:
    def execute(self, command):
        SakuraContext.message(command.args)


def register(dispatcher):
    dispatcher.register(["version", "ver"], Version())
    dispatcher.register(["help", "h"], Help())
    dispatcher.register(["commands"], Commands())
    dispatcher.register(["pwd"], Pwd())
    dispatcher.register(["echo"], Echo())
