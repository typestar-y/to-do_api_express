# Sample To-Do List App API by Express

Express.js による TODO リストのサンプル API アプリケーション

# 1. 機能

## 1-1. タスク作成

![01_create_10](https://user-images.githubusercontent.com/51914044/154656280-2a7cd03e-d5ea-4790-b037-0383e5133694.gif)

### 概要

- 以下項目をもつタスクを作成する
  - 名前
  - 期日
  - ステータス
    - `ToDo` 固定

### リクエスト

#### メソッド・パス

POST `/tasks`

#### ヘッダー

- `Content-Type: application/json`

#### ボディ

```json
{
  "name": "タスクの名前",
  "due": "2022-02-17T12:00:00.000Z"
}
```

### その他

- 必須/形式エラーの場合は HTTP ステータスコード `400` のレスポンスが返却される

## 1-2. タスクの取得

![02_search_10](https://user-images.githubusercontent.com/51914044/154665791-d6a37c47-4481-4439-a2af-b3963e675ef1.gif)

### 概要

- 保存されたすべてのタスクを取得する

### リクエスト

#### メソッド・パス

GET `/tasks`

#### ヘッダー

なし

#### ボディ

なし

## 1-3. タスクの更新

![03_update_10](https://user-images.githubusercontent.com/51914044/154665992-90ad00c5-a1f7-4606-a8c7-60f9db2fa4d2.gif)

### 概要

- 既存のタスクを更新する。以下項目が変更可能
  - 名前
  - 期日
  - ステータス

### リクエスト

#### メソッド・パス

PUT `/tasks/:taskId`

#### ヘッダー

- `Content-Type: application/json`

#### ボディ

```json
{
  "name": "更新後タスク名",
  "due": "2022-02-17T12:00:00.000Z",
  "status": "Doing"
}
```

### その他

- ステータスは `Todo` / `Doing` / `Done` の 3 種類のみ指定可能
- 必須/形式エラーの場合は HTTP ステータスコード `400` のレスポンスが返却される
- 対象のタスクがない場合は HTTP ステータスコード `404` のレスポンスが返却される

## 1-4. タスクの削除

![04_delete_10](https://user-images.githubusercontent.com/51914044/154666199-9dbb0b67-167a-4aea-b60e-9c993e0877d2.gif)

### 概要

- 既存のタスクを削除する

### リクエスト

#### メソッド・パス

DELETE `/tasks/:taskId`

#### ヘッダー

なし

#### ボディ

なし

### その他

- ステータスは `Todo` / `Doing` / `Done` の 3 種類のみ指定可能
- 必須/形式エラーの場合は HTTP ステータスコード `400` のレスポンスが返却される
- 対象のタスクがない場合は HTTP ステータスコード `404` のレスポンスが返却される

# 2. 構成

## 2-1. ディレクトリ

```text
└── src
    ├── controller : 簡易的なHTTPリクエストのバリデーションチェック、HTTP・ビジネスレイヤー間のデータ受け渡し
    ├── error : ビジネスレイヤーにおけるエラー
    ├── service : ビジネスレイヤーにおけるユースケース(ドメイン駆動設計における Application Service)
    ├── entity : 永続化対象となるドメイン
    ├── value-object : 永続化対象とならないドメイン
    └── repository : entity の永続化および再生成
```
