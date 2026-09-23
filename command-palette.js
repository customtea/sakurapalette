(function () {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var macroPath = Editor.ExpandParameter("$M");
    var base = fso.GetParentFolderName(macroPath);
    load(base + "\\lib\\sakura-context.js");
    load(base + "\\lib\\ex-parser.js");
    load(base + "\\lib\\ex-dispatcher.js");
    load(base + "\\commands\\core.js");
    load(base + "\\commands\\substitute.js");
    load(base + "\\commands\\file.js");
    load(base + "\\commands\\range.js");
    ExCommandPalette.run();
    function load(path) {
        var ts = fso.OpenTextFile(path, 1, false, -1);
        var source = ts.ReadAll(); ts.Close(); eval(source);
    }
})();
