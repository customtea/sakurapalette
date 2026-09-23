# Sakura Editor Vim Ex Command Palette 0.2.0

Vim の `:` コマンドを基本形にしたサクラエディタ用 WSH/JScript プラグインです。

## 主なコマンド

```text
:version
:ver
:help
:commands
:pwd
:echo hello
:w
:q
:wq
:x
:u
:undo
:redo
:10
:10,20p
:%p
:10,20d
:%d
:s/foo/bar/
:s/foo/bar/g
:%s/foo/bar/g
:10,20s/foo/bar/g
:/ERROR/
```

`:version` はサクラエディタの「バージョン情報」コマンドを呼び出します。サクラエディタのマクロ仕様には `About()` が用意されています。

## 分離構造

- `command-palette.js` — 入力UIのみ
- `lib/ex-parser.js` — Ex構文解析
- `lib/ex-dispatcher.js` — コマンド名から実装へのディスパッチ
- `lib/sakura-context.js` — Sakura APIアダプタ
- `commands/*.js` — コマンド実装

新しいExコマンドは `commands/` に追加し、`ExDispatcher.register()` するだけで拡張できます。

## Vim互換について

Vim完全互換ではありません。現在は基本的なExコマンド、範囲指定、`:s`、`:version` などを対象にしています。

未実装の主なもの:

- `:g` / `:v`
- `:normal`
- `:set`
- `:map`
- `:'<,'>`
- 検索アドレス `/pattern/`
- `:e file` / `:w file`
- `:read`
- `|` によるコマンド連結
- Vimの高度な`:s`フラグ

## インストール

サクラエディタの「共通設定 → プラグイン → ZIPプラグインを導入」から本ZIPを指定してください。公式ヘルプでは、導入後にプラグインを有効化し、新しいエディタウィンドウから反映する手順になっています。
