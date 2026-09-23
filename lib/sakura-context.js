var SakuraContext = {
    error: function (s) { Editor.MessageBox(s); },
    info: function (s) { Editor.MessageBox(s); },
    about: function () { Editor.About(); },
    redraw: function () { Editor.ReDraw(0); },
    currentLine: function () { return parseInt(Editor.ExpandParameter("$y"), 10); },
    lineCount: function () { return parseInt(Editor.ExpandParameter("$L"), 10); },
    currentFile: function () { return Editor.ExpandParameter("$F"); },

    gotoLine: function (n) {
        Editor.GoLine(n);
        this.redraw();
    },
    selectLines: function (a, b) {
        if (a > b) {
        var t = a;
        a = b;
        b = t;
        }
        Editor.MoveCursor(a, 1, 0);
        Editor.GoLineTop(0);
        if (b > a) Editor.MoveCursor(b, 1, 1);
        Editor.GoLineEnd_Sel(0);
        this.redraw();
    },
    deleteLines: function (a, b) {
        this.selectLines(a, b);
        Editor.Delete();
        this.redraw();
    },
    replaceRange: function (a, b, p, r, f) {
        this.selectLines(a, b);
        Editor.ReplaceAll(p, r, 0x94);
        Editor.CancelMode();
        this.redraw();
    },
    replaceFile: function (p, r, f) {
        Editor.ReplaceAll(p, r, 0x14);
        this.redraw();
    },
    save: function () { Editor.FileSave(); },
    close: function () { Editor.FileClose(); },
    saveAndClose: function () { Editor.FileSave(); Editor.FileClose(); },
    undo: function () { Editor.Undo(); this.redraw(); },
    redo: function () { Editor.Redo(); this.redraw(); },
    searchNext: function (p) {
        Editor.SearchNext(p, 0x14);
        this.redraw();
    },
    commandList: function () {
        Editor.CommandList();
    },
};
