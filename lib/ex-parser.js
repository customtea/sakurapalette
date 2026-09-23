var ExParser = {
    parse: function (input) {
        var s = this.trim(input);
        if (s.charAt(0) == ":") s = this.trim(s.substring(1));
        if (!s) return null;
        if (s.charAt(0) == "/") {
            var e = this.findUnescaped(s, "/", 1);
            if (e == s.length - 1)
                return {
                    name: "search",
                    range: "",
                    pattern: s.substring(1, e),
                    raw: input,
                };
        }
        var r = this.readRange(s),
            rest = r.rest;
        if (rest === "")
            return r.range
                ? { name: "range", range: r.range, args: "", raw: input }
                : null;
        if (rest.charAt(0) == "s") {
            var sub = this.parseSubstitute(rest);
            if (sub) {
                sub.range = r.range;
                sub.raw = input;
                return sub;
            }
        }
        var m = rest.match(/^([A-Za-z]+)(!)(?:\s+(.*))?$/);
        if (m)
            return {
                name: m[1].toLowerCase(),
                bang: true,
                range: r.range,
                args: m[3] || "",
                raw: input,
            };
        m = rest.match(/^([A-Za-z]+)(?:\s+(.*))?$/);
        if (m)
            return {
                name: m[1].toLowerCase(),
                bang: false,
                range: r.range,
                args: m[2] || "",
                raw: input,
            };
        return null;
    },
    readRange: function (s) {
        var a = this.readAddress(s, 0);
        if (!a) return { range: "", rest: s };
        var p = a.next,
            range = a.value;
        if (s.charAt(p) == "," || s.charAt(p) == ";") {
            var b = this.readAddress(s, p + 1);
            if (!b) return { range: range, rest: s.substring(p) };
            range += s.charAt(p) + b.value;
            p = b.next;
        }
        return { range: range, rest: s.substring(p) };
    },
    readAddress: function (s, p) {
        if (s.charAt(p) == "%") return { value: "%", next: p + 1 };
        if (s.charAt(p) == ".") return { value: ".", next: p + 1 };
        if (s.charAt(p) == "$") return { value: "$", next: p + 1 };
        if (s.substr(p, 2) == "'<" || s.substr(p, 2) == "'>")
            return { value: s.substr(p, 2), next: p + 2 };
        if (s.charAt(p) == "/") {
            var e = this.findUnescaped(s, "/", p + 1);
            if (e > p) return { value: s.substring(p, e + 1), next: e + 1 };
        }
        var m = s.substring(p).match(/^\d+/);
        return m ? { value: m[0], next: p + m[0].length } : null;
    },
    parseSubstitute: function (s) {
        if (s.length < 2 || s.charAt(0) != "s") return null;
        var d = s.charAt(1),
            p = 2,
            a = this.readDelimited(s, p, d);
        if (!a) return null;
        p = a.next;
        var b = this.readDelimited(s, p, d);
        if (!b) return null;
        p = b.next;
        var f = s.substring(p);
        if (!/^[gicmnp#]*$/.test(f)) return null;
        return {
            name: "substitute",
            pattern: a.value,
            replacement: b.value,
            flags: f,
        };
    },
    readDelimited: function (s, start, d) {
        var v = "",
            esc = false;
        for (var i = start; i < s.length; i++) {
            var c = s.charAt(i);
            if (esc) {
                v += "\\" + c;
                esc = false;
                continue;
            }
            if (c == "\\") {
                esc = true;
                continue;
            }
            if (c == d) return { value: v, next: i + 1 };
            v += c;
        }
        return null;
    },
    findUnescaped: function (s, ch, start) {
        var e = false;
        for (var i = start; i < s.length; i++) {
            if (e) {
                e = false;
                continue;
            }
            if (s.charAt(i) == "\\") {
                e = true;
                continue;
            }
            if (s.charAt(i) == ch) return i;
        }
        return -1;
    },
    trim: function (s) {
        return s.replace(/^\s+|\s+$/g, "");
    },
};
