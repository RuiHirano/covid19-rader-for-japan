package cron

import (
	"github.com/carlescere/scheduler"
)

func main() {
	scheduler.Every().Day().At("06:00").Run(getFileFromS3)

}

func getFileFromS3() {
	// file取得

	//
}
