from .context import SakuraContext
from .dispatcher import Dispatcher
from .commands import register_all


def run():
    dispatcher = Dispatcher()
    register_all(dispatcher)

    command = SakuraContext.input_box(
        title="Vim Ex Command",
        prompt="Command",
        default=":"
    )

    if command is None:
        return

    command = command.strip()
    if command:
        dispatcher.dispatch(command)
