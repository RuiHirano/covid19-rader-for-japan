# Covid19 Rader for Japan
日本の新型コロナに関する情報をわかりやすく可視化した最新情報サイトです。

## 貢献のお願い

### グラフ作成
1. 本サイトではグラフ可視化ライブラリとしてRechartsを用いています。グラフ作成をしていただける方は以下のDocumentを参考にしてください。
#### Recharts
- [Document](http://recharts.org/en-US/)
- [Github](https://github.com/recharts/recharts)

2. グラフはviews/dashboard/components内にファイルを作成しコンポーネントを作成してください。

3. 複数箇所で使用されうるデータの処理はsrc/utils/stats-calcurator.tsxの`StatsCalculator`クラスに、単一のグラフでしか使用されない(頻度が低い)データ処理は/views/dashboard/components/のコンポーネント内に定義してください。
- patient-by-pref.tsx, patient-by-date.tsxを参考にしてみてください。

4. views/dashboard/index.tsx内で作成したcomponentをimportし<Grid></Grid>内に記述すれば表示されると思います。

```/javascript
<MainLayout title="Dashboard">
    <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <PatientsByDateView />   // このように記述
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <PatientsByPrefView />　　// このように記述
        </Grid>
    </Grid>
</MainLayout>

```

### 地図の機能拡張

### その他機能拡張
1. 罹患者最新情報テーブル
2. 新型コロナに関する研究・新薬情報


## ライセンス
本ソフトウェアは、[MITライセンス]()の元提供されています。

## 開発者向け情報
### 必要な言語、ツール等
go/npm or yarn/node.js

### ローカルで開発する場合

1. backendを起動する
```
cd backend
go build main.go
./main.go
```

2. frontendを起動する
```
cd frontend
yarn install
yarn start
```

### Dockerで開発する場合

1. frontendのimageをbuildする

```
cd frontend
docker image build -t covid19-rader-for-japan/frontend:latest .
```

2. backendのimageをbuildする 

```
cd backend
docker image build -t covid19-rader-for-japan/backend:latest .
```

3. docker-composeコマンドで起動

```
docker-compose up -d
```

4. http://localhost:3000 を検索


### 本番環境/その他の判定

`process.env.GENERATE_ENV` の値が、本番の場合は`'production'`に、それ以外の場合は `'development'` になっています。  
テスト環境のみで実行したい処理がある場合はこちらの値をご利用ください。

### ステージング・本番環境への反映

`master` ブランチがアップデートされると、自動的に `production` ブランチにHTML類がbuildされます。そして、本番サイト https://covid19-rader-for-japan.com/ が更新されます。

`staging` ブランチがアップデートされると、自動的に `gh-pages` ブランチにHTML類がbuildされます。そして、ステージングサイト https://covid19-rader-for-japan.com/ が更新されます。

`development` ブランチがアップデートされると、自動的に `dev-pages` ブランチにHTML類がbuildされます。そして、開発用サイト https://covid19-rader-for-japan.com/ が更新されます。

### ブランチルール

development, dev-hotfix 以外は Pull Request は禁止です。
Pull Request を送る際の branch は、以下のネーミングルールでお願いします。

機能追加系： feature/#{ISSUE_ID}-#{branch_title_name}  
ホットフィックス系: hotfix/#{ISSUE_ID}-#{branch_title_name}

#### 基本的なブランチ
| 目的 | ブランチ | 確認URL | 備考 |
| ---- | -------- | ---- | ---- |
| 開発 | development | https://dev-covid19-rader-for-japan.netlify.com/ | base branch。基本はこちらに Pull Requestを送ってください |
| ステージング | staging | https://stg-covid19-rader-for-japan.netlify.com/ | 本番前の最終確認用。管理者以外の Pull Request は禁止です |
| 本番 | master | https://covid19-rader-for-japan.com/ | 管理者以外の Pull Request は禁止です |



