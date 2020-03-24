package types

type Patient struct {
	ID                 string
	PatientNo          string
	Residence          string
	Age                uint64
	Sex                Sex
	Occupation         string
	Prefecture         *Prefecture
	ActionHistory      string // 行動歴
	SymptomHistory     string // 症状・経過
	FeverDate          string // 発熱観察日
	ConsultationDate   string // 受診日
	PublicationDate    string // 公表日
	RecoveryDate       string // 回復日
	OverseasTravelFlag bool   // 海外渡航フラグ
	OverseasTravelName string // 渡航先
	CloseContact       string // 濃厚接触者情報
	Source             string // 情報源
}

type Sex uint64

const (
	Sex_MALE   Sex = 0
	Sex_FEMALE Sex = 1
)

type Prefecture struct {
	ID        string
	Name      string
	Longitude float64
	Latitude  float64
}
