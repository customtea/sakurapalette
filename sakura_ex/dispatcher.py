from .parser import parse


class Dispatcher:
    def __init__(self):
        self._commands = {}

    def register(self, names, command):
        for name in names:
            self._commands[name] = command

    def dispatch(self, source):
        command = parse(source)
        if command is None:
            raise ValueError("Ex commandを解釈できません: {}".format(source))
        implementation = self._commands.get(command.name)
        if implementation is None:
            raise ValueError("Not an editor command: {}".format(command.name))
        return implementation.execute(command)
