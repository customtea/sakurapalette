// Small ed-like command set.
// Supported:
//   .p       current line
//   10p      line 10
//   10,20p  select lines 10-20
//   10d      delete line 10
//   10,20d  delete lines 10-20
//   %p       select all
//   %d       delete all

var EdCommand = {
    execute: function (cmd) {
        var range = this.resolveRange(cmd.address);

        if (cmd.name == "p" || cmd.name == "print") {
            this.printRange(range.start, range.end);
            return;
        }

        if (cmd.name == "d" || cmd.name == "delete") {
            this.deleteRange(range.start, range.end);
            return;
        }

        throw new Error("Unsupported ed command: " + cmd.name);
    },

    resolveAddress: function (s) {
        s = Parser.trim(s);

        if (s == "." || s == "") return Context.currentLine();
        if (s == "$") return Context.lineCount();
        if (s == "%") return 1;

        if (s.charAt(0) == "/") {
            // Search addresses are intentionally not yet destructive.
            throw new Error("検索アドレスはこの版では未対応です。");
        }

        var n = parseInt(s, 10);
        if (isNaN(n) || n < 1) {
            throw new Error("Invalid address: " + s);
        }
        return n;
    },

    resolveRange: function (address) {
        address = Parser.trim(address);

        if (address == "%") {
            return { start: 1, end: Context.lineCount() };
        }

        var parts = address.split(",");
        if (parts.length == 1) {
            var n = this.resolveAddress(parts[0]);
            return { start: n, end: n };
        }

        if (parts.length == 2) {
            return {
                start: this.resolveAddress(parts[0]),
                end: this.resolveAddress(parts[1])
            };
        }

        throw new Error("Invalid address: " + address);
    },

    gotoLine: function (line) {
        if (line < 1) line = 1;
        if (line > Context.lineCount()) line = Context.lineCount();
        Editor.GoLine(line);
    },

    printRange: function (start, end) {
        if (start > end) {
            var t = start; start = end; end = t;
        }

        this.gotoLine(start);
        Editor.GoLineTop(0);
        Editor.BeginSelect();

        for (var i = start; i < end; i++) {
            Editor.Down_Sel(0);
        }

        Editor.GoLineEnd_Sel(0);
        Context.redraw();
    },

    deleteRange: function (start, end) {
        if (start > end) {
            var t = start; start = end; end = t;
        }

        this.gotoLine(start);
        Editor.GoLineTop(0);
        Editor.BeginSelect();

        for (var i = start; i < end; i++) {
            Editor.Down_Sel(0);
        }

        Editor.GoLineEnd_Sel(0);
        Editor.Delete();
        Context.redraw();
    }
};

CommandDispatcher.register(["p", "print", "d", "delete"], EdCommand);
