// General editor commands.

var EditorCommand = {
    execute: function (cmd) {
        switch (cmd.name) {
            case "w":
            case "write":
            case "save":
                Context.save();
                return;

            case "u":
            case "undo":
                Context.undo();
                return;

            case "redo":
                Context.redo();
                return;

            case "q":
            case "quit":
                Context.close();
                return;

            case "search":
                Context.search(cmd.pattern);
                return;

            case "help":
            case "?":
                this.help();
                return;
        }

        throw new Error("Unknown editor command: " + cmd.name);
    },

    help: function () {
        Editor.MessageBox(
            "Command Palette\n\n" +
            "sed:\n" +
            "  s/old/new/g     全件置換\n" +
            "  s/old/new/      1件置換\n\n" +
            "ed風:\n" +
            "  .p              現在行\n" +
            "  10p             10行目を選択\n" +
            "  10,20p          10～20行を選択\n" +
            "  10d             10行目を削除\n" +
            "  10,20d          10～20行を削除\n" +
            "  %p              全文選択\n" +
            "  %d              全文削除\n\n" +
            "editor:\n" +
            "  w / save        保存\n" +
            "  u / undo        Undo\n" +
            "  redo            Redo\n" +
            "  q / quit        閉じる\n" +
            "  /pattern/       正規表現検索"
        );
    }
};

CommandDispatcher.register(
    ["w", "write", "save", "u", "undo", "redo", "q", "quit", "help", "?"],
    EditorCommand
);
