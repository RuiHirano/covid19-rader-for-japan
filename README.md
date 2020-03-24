# Covid19 Rader for Japan

## Requirements
go/npm or yarn/node.js

## How to start

1. run backend
```
cd backend
go build main.go
./main.go
```

2. run frontend
```
cd frontend
yarn install // or npm install
yarn start  // or npm start
```

## for Docker

1. build frontend image

```
cd frontend
docker image build -t covid19-rader-for-japan/frontend:latest .
```

2. build backend image 

```
cd backend
docker image build -t covid19-rader-for-japan/backend:latest .
```

3. run docker-compose

```
docker-compose up -d
```

4. visit http://localhost:3000
