var ExDispatcher = {
    table: {},
    register: function (names, cmd) {
        for (var i = 0; i < names.length; i++) this.table[names[i]] = cmd;
    },
    execute: function (input) {
        var c = ExParser.parse(input);
        if (!c) {
            SakuraContext.error("Invalid Ex command: " + input);
            return;
        }
        var impl = this.table[c.name];
        if (!impl) {
            SakuraContext.error("Not an editor command: " + c.name);
            return;
        }
        try {
            impl.execute(c);
        } catch (e) {
            SakuraContext.error(c.raw + "\n\n" + (e.message || e));
        }
    },
};
var ExCommandPalette = {
    history: [],
    run: function () {
        var last = this.history.length
            ? this.history[this.history.length - 1]
            : ":";
        var input = Editor.InputBox("Vim Ex command", "Command", last);
        if (input == null) return;
        input = input.replace(/^\s+|\s+$/g, "");
        if (!input) return;
        this.history.push(input);
        if (this.history.length > 100) this.history.shift();
        ExDispatcher.execute(input);
    },
};
