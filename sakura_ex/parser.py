"""Parser for a practical Vim/Ex subset."""

from dataclasses import dataclass
import re


@dataclass
class Command:
    name: str
    range_text: str = ""
    args: str = ""
    bang: bool = False
    pattern: str = ""
    replacement: str = ""
    flags: str = ""
    raw: str = ""


def parse(source: str):
    raw = source
    s = source.strip()
    if s.startswith(":"):
        s = s[1:].lstrip()
    if not s:
        return None

    # /pattern/ as a convenient Ex search command.
    if s.startswith("/"):
        end = _find_unescaped(s, "/", 1)
        if end == len(s) - 1:
            return Command("search", pattern=s[1:end], raw=raw)

    range_text, rest = _read_range(s)
    if not rest:
        return Command("range", range_text=range_text, raw=raw) if range_text else None

    if rest.startswith("s") and len(rest) >= 2:
        sub = _parse_substitute(rest)
        if sub:
            sub.range_text = range_text
            sub.raw = raw
            return sub

    m = re.fullmatch(r"([A-Za-z]+)(!?)(?:\s+(.*))?", rest, re.S)
    if not m:
        return None
    return Command(
        name=m.group(1).lower(),
        bang=bool(m.group(2)),
        range_text=range_text,
        args=m.group(3) or "",
        raw=raw,
    )


def _read_range(s):
    first = _read_address(s, 0)
    if not first:
        return "", s
    pos = first[1]
    if pos < len(s) and s[pos] in ",;":
        second = _read_address(s, pos + 1)
        if second:
            return s[:second[1]], s[second[1]:]
    return s[:pos], s[pos:]


def _read_address(s, pos):
    if pos >= len(s):
        return None
    if s[pos] in "%.$":
        return s[pos], pos + 1
    if s.startswith("'<", pos) or s.startswith("'>", pos):
        return s[pos:pos + 2], pos + 2
    m = re.match(r"\d+", s[pos:])
    if m:
        end = pos + len(m.group(0))
        return s[pos:end], end
    if s[pos] == "/":
        end = _find_unescaped(s, "/", pos + 1)
        if end >= 0:
            return s[pos:end + 1], end + 1
    return None


def _parse_substitute(s):
    delim = s[1]
    a = _read_delimited(s, 2, delim)
    if not a:
        return None
    b = _read_delimited(s, a[1], delim)
    if not b:
        return None
    flags = s[b[1]:]
    if not re.fullmatch(r"[gicmnp#]*", flags):
        return None
    return Command("substitute", pattern=a[0], replacement=b[0], flags=flags)


def _read_delimited(s, start, delim):
    out = []
    i = start
    while i < len(s):
        ch = s[i]
        if ch == "\\":
            if i + 1 >= len(s):
                return None
            out.append(ch)
            out.append(s[i + 1])
            i += 2
            continue
        if ch == delim:
            return "".join(out), i + 1
        out.append(ch)
        i += 1
    return None


def _find_unescaped(s, target, start):
    escaped = False
    for i in range(start, len(s)):
        if escaped:
            escaped = False
        elif s[i] == "\\":
            escaped = True
        elif s[i] == target:
            return i
    return -1
