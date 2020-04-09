# Covid19 Rader for Japan
日本の新型コロナに関する情報をわかりやすく可視化した最新情報サイトです。
<img src="https://user-images.githubusercontent.com/43264434/78895987-b781fd80-7aaa-11ea-874b-9c49d801e693.png" width=800>

# 必要な言語、ツール等
go/yarn/node.js

# 開発方法
## ローカルで開発する場合

1. frontendを起動する
```
yarn install
yarn start
```
2. http://localhost:3000 を検索

## Dockerで開発する場合

1. frontendのimageをbuildする

```
docker image build -t covid19-rader-for-japan/frontend:latest .
docker container run --rm -it covid19-rader-for-japan/frontend:latest
```

2. http://localhost:3000 を検索


# 貢献方法
## ステージング・本番環境への反映

`master` ブランチがアップデートされると、自動的に 本番サイト https://covid19-rader-for-japan.com/ が更新されます。

`staging` ブランチがアップデートされると、自動的に ステージングサイト https://covid19-rader-for-japan.com/ が更新されます。

`development` ブランチがアップデートされると、自動的に 開発用サイト https://covid19-rader-for-japan.com/ が更新されます。

## ブランチルール

development, dev-hotfix 以外は Pull Request は禁止です。
Pull Request を送る際の branch は、以下のネーミングルールでお願いします。

機能追加系： feature/#{ISSUE_ID}-#{branch_title_name}  
ホットフィックス系: hotfix/#{ISSUE_ID}-#{branch_title_name}

## 基本的なブランチ
| 目的 | ブランチ | 確認URL | 備考 |
| ---- | -------- | ---- | ---- |
| 開発 | development | https://dev-covid19-rader-for-japan.netlify.com/ | base branch。基本はこちらに Pull Requestを送ってください |
| ステージング | staging | https://stg-covid19-rader-for-japan.netlify.com/ | 本番前の最終確認用。管理者以外の Pull Request は禁止です |
| 本番 | master | https://covid19-rader-for-japan.com/ | 管理者以外の Pull Request は禁止です |


# Contributer一覧
| [inductor](https://github.com/inductor) | [mattn](https://github.com/mattn) | [Yoshiteru Nagata](https://github.com/nagata-yoshiteru) |
|:---|:---:|---:|
<img src="https://avatars3.githubusercontent.com/u/20236173?s=400&u=d8dda91e4bc2bdc7736f607b36fa53c9e82e08db&v=4" width=100> |<img src="https://avatars3.githubusercontent.com/u/10111?s=400&u=52c03ac58f0027d43f6708fcbc3c2913f195439c&v=4" width=100> |<img src="https://avatars0.githubusercontent.com/u/38305549?s=400&v=4" width=100> |
