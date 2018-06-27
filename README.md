# Wide Wiki - Wide: internet dictionary environment

Node.js(Express)で動作するWikiシステムです。公開すれば誰でも閲覧、編集するWikiが利用できます。

## 実行するには？
- Node.js 8.x LTS で開発しています。

実行する際は Node.js が必要になります。

このリポジトリをダウンロードしたら、ディレクトリの中で

```
npm install
npm start
```

と実行して、 `localhost:3000` とアクセスするとWikiのトップページが表示されます。`content` ディレクトリの `index.md` が参照されます。

## 現在実装できてない機能
- 検索機能(見た目だけは実装しています)
- markdownのサポート
  - 複数行のソースコード
  - 番号付きリスト
- ユーザー認証機能
- テーマ機能(ユーザーが自由に差し替え出来る箇所とコアの箇所を明確に切り離したい)