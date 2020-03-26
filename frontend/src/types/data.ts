import { Moment } from "moment"

export interface Patient {
    ID: string,
    Residence: string,
    Age: number,
    Sex: Sex,
    Occupation: string,
    Prefecture: Prefecture,
    ActionHistory: string, // 行動歴
    SymptomHistory: string,	// 症状・経過
    FeverDate: Moment,  // 発熱観察日 
    ConsultationDate: Moment, // 受診日
    PublicationDate: Moment, // 公表日
    RecoveryDate: Moment,  // 回復日
    OverseasTravelFlag: boolean // 海外渡航フラグ
    OverseasTravelName: string  // 渡航先
    CloseContact: string, // 濃厚接触者情報
    Source: string  // 情報源
}

export enum Sex {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface Prefecture {
    ID: string,
    Name: string,
    Longitude: number,
    Latitude: number,
}

export interface DateData {
    Patients: Patient[]
    PatientsNum: number
    TotalPatientsNum: number
}

export enum Period {
    DATE = "DATE",
    WEEK = "WEEK",
    MONTH = "MONTH",
    YEAR = "YEAR"
}

//export type PatientsByDate = { [date: string]: Patient[] }
export type PatientsByDate = { date: string, patients: Patient[] }
export type PatientsNumByDate = { date: string, value: number }
export type PatientsByPref = { pref: string, patients: Patient[] }
export type PatientsNumByPref = { pref: string, value: number }


// {"3/1": {"愛知県": [Patient1, Patient2, ...], "東京都": [Patient1, Patient2, ...]}, "3/2": {}, ...}
export type DatePatientsObjectByPref = { [s: string]: { [s: string]: Patient[] } }

// [{date: "3/1", "愛知県": [Patient1, Patient2, ...], "東京都": [Patient1, Patient2, ...]}, {date: "3/2", ...}]
export type DatePatientsArrayByPref = { [a: string]: Patient[] }[]

export enum PrefName {
    北海道 = "北海道",
    青森県 = "青森県",
    岩手県 = "岩手県",
    宮城県 = "宮城県",
    秋田県 = "秋田県",
    山形県 = "山形県",
    福島県 = "福島県",
    茨城県 = "茨城県",
    栃木県 = "栃木県",
    群馬県 = "群馬県",
    埼玉県 = "埼玉県",
    千葉県 = "千葉県",
    東京都 = "東京都",
    神奈川県 = "神奈川県",
    新潟県 = "新潟県",
    富山県 = "富山県",
    石川県 = "石川県",
    福井県 = "福井県",
    山梨県 = "山梨県",
    長野県 = "長野県",
    岐阜県 = "岐阜県",
    静岡県 = "静岡県",
    愛知県 = "愛知県",
    三重県 = "三重県",
    滋賀県 = "滋賀県",
    京都府 = "京都府",
    大阪府 = "大阪府",
    兵庫県 = "兵庫県",
    奈良県 = "奈良県",
    和歌山県 = "和歌山県",
    鳥取県 = "鳥取県",
    島根県 = "島根県",
    岡山県 = "岡山県",
    広島県 = "広島県",
    山口県 = "山口県",
    徳島県 = "徳島県",
    香川県 = "香川県",
    愛媛県 = "愛媛県",
    高知県 = "高知県",
    福岡県 = "福岡県",
    佐賀県 = "佐賀県",
    長崎県 = "長崎県",
    熊本県 = "熊本県",
    大分県 = "大分県",
    宮崎県 = "宮崎県",
    鹿児島県 = "鹿児島県",
    沖縄県 = "沖縄県",
}