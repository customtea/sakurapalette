from .core import register as register_core
from .file import register as register_file
from .range_commands import register as register_range
from .substitute import register as register_substitute
from .search import register as register_search


def register_all(dispatcher):
    register_core(dispatcher)
    register_file(dispatcher)
    register_range(dispatcher)
    register_substitute(dispatcher)
    register_search(dispatcher)
