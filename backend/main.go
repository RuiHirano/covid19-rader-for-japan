package main

import (
	//"context"

	"bytes"
	"encoding/json"
	"fmt"

	"io/ioutil"

	"handler"
	"log"
	"os"
	"types"

	//"cloud.google.com/go/storage"

	"net/http"

	"github.com/carlescere/scheduler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
//BUCKET_NAME = os.Getenv("BUCKET_NAME")
//OBJECT_PATH = os.Getenv("OBJECT_PATH")
)

func init() {
	fetchData()
}

func fetchDataSceduler() {
	scheduler.Every(10).Seconds().Run(fetchData)
}

func fetchData() {
	// file取得
	fmt.Printf("post to calculator server...\n")

	// csv データ取得
	patients := handler.ReadData("./dataset/patient-dataset.csv")

	// pythonサーバへpost
	url := "http://localhost:8888/"
	patientsjson, _ := json.Marshal(patients)
	// request作成
	//var jsonStr = []byte(`{"title":"Buy cheese and bread for breakfast."}`)
	request, error := http.NewRequest("GET", url, bytes.NewBuffer(patientsjson))
	if error != nil {
		log.Fatal(error)
	}
	request.Header.Add("Content-Type", "application/json")
	// 送信
	response, error := http.DefaultClient.Do(request)
	if error != nil {
		log.Fatal(error)
	}
	//defer response.Body.Close()

	// response読み取り
	//fmt.Printf("======Body (use json.Unmarshal)======\n")
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var resPatients []*types.Patient
	err = json.Unmarshal(body, &resPatients)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Printf("res %v\n", resPatients)

	// csv
	/*ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		//return nil, err
		fmt.Printf("error: \n", err)
	}
	defer client.Close()

	r, err := client.Bucket(BUCKET_NAME).Object(OBJECT_PATH).NewReader(ctx)
	if err != nil {
		//return nil, err
		fmt.Printf("error: \n", err)
	}
	defer r.Close()

	b, err := ioutil.ReadAll(r)
	if err != nil {
		panic(err)
	}
	fmt.Printf("file: %v\n", string(b))

	//return b, nil*/

}

func main() {
	fmt.Printf("Starting...")

	go fetchDataSceduler()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.GET("/file/patient", handler.SendFile()) // notebookファイル取得

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}
	e.Start(":" + port)

}
