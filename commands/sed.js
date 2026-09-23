// sed command implementation.
// Supported form:
//   s/old/new/g
//   s/old/new/
// Delimiter may be any single character, e.g. s#old#new#g

var SedCommand = {
    execute: function (cmd) {
        var regex = cmd.flags.indexOf("i") >= 0 || cmd.flags.indexOf("m") >= 0;

        if (cmd.flags.indexOf("g") >= 0) {
            Context.replaceAll(cmd.pattern, cmd.replacement, true);
        } else {
            Context.replaceFirst(cmd.pattern, cmd.replacement, true);
        }
    }
};

CommandDispatcher.register(["s"], SedCommand);
