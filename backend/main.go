package main

import (
	//"context"
	"fmt"
	//"io/ioutil"

	"handler"
	"log"
	"os"

	//"cloud.google.com/go/storage"
	"github.com/carlescere/scheduler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	//BUCKET_NAME = os.Getenv("BUCKET_NAME")
	//OBJECT_PATH = os.Getenv("OBJECT_PATH")
	BUCKET_NAME = "covid19-rader-for-japan"
	OBJECT_PATH = "patient_dateset.csv"
)

func init() {
	fetchData()
}

func fetchDataSceduler() {
	scheduler.Every().Day().At("06:00").Run(fetchData)
}

func fetchData() {
	// file取得
	fmt.Printf("hello")

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
