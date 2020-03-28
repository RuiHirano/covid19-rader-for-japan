package handler

import (
	"encoding/json"
	//"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"

	"encoding/csv"
	"types"

	"github.com/labstack/echo"
)

var (
	JsonData []byte
)

// SendFile: ファイルを送信する
func SendFile() echo.HandlerFunc {
	return func(c echo.Context) error {
		patients := ReadData("./dataset/patient-dataset.csv")

		// data整形
		calcDataset(patients)

		patientsjson, _ := json.Marshal(patients)
		//fmt.Printf("data %v", string(patientsjson))
		return c.String(http.StatusOK, string(patientsjson))
	}
}

func ReadData(filepath string) []*types.Patient {
	file, err := os.Open(filepath)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	var line []string
	patients := make([]*types.Patient, 0)
	count := 0
	for {
		line, err = reader.Read()
		if err != nil {
			break
		}
		if count == 0 { // headerを除去
			count += 1
			continue
		}

		//fmt.Println(len(line), line[0], line[1], line[2])
		patient := &types.Patient{
			ID:               line[0],
			PatientNo:        line[2],
			ActionHistory:    line[4],
			SymptomHistory:   line[3],
			FeverDate:        line[5],
			ConsultationDate: line[6],
			PublicationDate:  line[7],
			RecoveryDate:     line[8],
			Prefecture: &types.Prefecture{
				ID:        line[1],
				Name:      line[10],
				Latitude:  strToFloat64(line[11]),
				Longitude: strToFloat64(line[12]),
			},
			Residence:          line[13],
			Age:                convertAge(line[16]),
			Sex:                convertSex(line[17]),
			Occupation:         line[18],
			OverseasTravelFlag: convertFlag(line[19]),
			OverseasTravelName: line[20],
			CloseContact:       line[23],
			Source:             line[24],
		}
		patients = append(patients, patient)
	}
	return patients
}

func calcDataset(patients []*types.Patient) {

}

func convertAge(age string) uint64 {
	ageNum := uint64(999) // Unknown
	if strings.Contains(age, "代") {
		ageNum = numCheck(age)
		//ageNum = 20
	}
	return ageNum
}

func strToFloat64(str string) float64 {
	f, err := strconv.ParseFloat(str, 64)
	if err != nil {
		f = 0
	}
	return f
}

func convertSex(sexStr string) types.Sex {
	switch sexStr {
	case "男性":
		return types.Sex_MALE
	case "女性":
		return types.Sex_FEMALE
	default:
		return types.Sex_MALE
	}
}

func convertFlag(flag string) bool {
	if flag == "1" {
		return true
	}
	return false
}

func numCheck(s string) uint64 {
	n := 0
	for _, r := range s {
		if '0' <= r && r <= '9' {
			n = n*10 + int(r-'0')
		} else {
			break
		}
	}
	return uint64(n)
}
