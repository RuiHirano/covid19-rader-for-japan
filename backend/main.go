package main

import (
	"fmt"

	"handler"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	fmt.Printf("Starting...")

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.GET("/file/patient", handler.SendFile()) // notebookファイル取得

	e.Start(":5000")

}
