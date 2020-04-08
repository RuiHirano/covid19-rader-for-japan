# Covid19 Rader for Japan

## Requirements
go/npm or yarn/node.js/python3.x

## How to start

1. run backend calculator
```
cd backend-calculator
python app.py
```

2. run backend
```
cd backend
go build main.go
./main.go
```

3. run frontend
```
cd frontend
yarn install // or npm install
yarn start  // or npm start
```

4. visit http://localhost:3000

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

3. build backend-calculator image 

```
cd backend
docker image build -t covid19-rader-for-japan/backend-calculator:latest .
```

4. run docker-compose

```
docker-compose up -d
```

4. visit http://localhost:3000


## Contributers
