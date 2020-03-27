package main

import (
	"fmt"

	"handler"
	"log"
	"os"

	"github.com/carlescere/scheduler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var ()

func init() {
	fetchFile()
}

func fetchFileSceduler() {
	scheduler.Every().Day().At("06:00").Run(fetchFile)
}

func fetchFile() {
	// file取得
	fmt.Printf("hello")
	// csv
}

func main() {
	fmt.Printf("Starting...")

	go fetchFileSceduler()

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
