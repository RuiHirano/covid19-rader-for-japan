# Covid19 Rader for Japan

<img src="https://user-images.githubusercontent.com/43264434/78895987-b781fd80-7aaa-11ea-874b-9c49d801e693.png" width=800>

# Requirements
go/npm or yarn/node.js/python3.x

# How to contribute
## Rule of branch
Please pull-request to development branch only. 
Don't pull-request to master and staging branch.

If you send pull-request, please follow the roles below.
1. function addition: feature/#{ISSUE_ID}-#{branch_title_name}
2. hotfix: hotfix/#{ISSUE_ID}-#{branch_title_name}

## Basic branch
| purpose | branch | check URL | remarks |
| ---- | -------- | ---- | ---- |
| Development | development | https://dev-covid19-rader-for-japan.netlify.com/ | base branch. Basically send a Pull Request here |
| Staging | staging | https://stg-covid19-rader-for-japan.netlify.com/ | For final confirmation before production. Non-admin pull requests are forbidden |
| Production | master | https://covid19-rader-for-japan.com/ | Non-admin pull requests are forbidden |


# How to start

## Local

- run frontend
```
yarn install
yarn start
```

2. visit http://localhost:3000

## for Docker

1. build frontend image

```
docker image build -t covid19-rader-for-japan/frontend:latest .
docker container run --rm -it covid19-rader-for-japan/frontend:latest
```

2. visit http://localhost:3000

# Contributers
| [inductor](https://github.com/inductor) | [mattn](https://github.com/mattn) | [Yoshiteru Nagata](https://github.com/nagata-yoshiteru) |
|:---|:---:|---:|
<img src="https://avatars3.githubusercontent.com/u/20236173?s=400&u=d8dda91e4bc2bdc7736f607b36fa53c9e82e08db&v=4" width=100> |<img src="https://avatars3.githubusercontent.com/u/10111?s=400&u=52c03ac58f0027d43f6708fcbc3c2913f195439c&v=4" width=100> |<img src="https://avatars0.githubusercontent.com/u/38305549?s=400&v=4" width=100> |