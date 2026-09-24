from .context import SakuraContext


def resolve(text):
    if not text:
        n = SakuraContext.current_line()
        return n, n, False
    if text == "%":
        return 1, SakuraContext.line_count(), True
    parts = text.split(",", 1)
    start = resolve_address(parts[0])
    end = start if len(parts) == 1 else resolve_address(parts[1])
    return start, end, False


def resolve_address(address):
    if address == ".":
        return SakuraContext.current_line()
    if address == "$":
        return SakuraContext.line_count()
    if address.isdigit():
        return int(address)
    raise ValueError("未対応のExアドレス: {}".format(address))
