import { Moment } from "moment"
import { number } from "yup"

export interface Data {
    StatsData: StatData[],
    PrefsData: PrefData[],
    PatientsData: PatientData[]
}

export interface PrefData {
    Id: number,
    NameJa: string,
    NameEn: string,
    Regions: string,
    Latitude: number,
    Longitude: number,
}

export interface TotalData {
    Date: number,
    Pcr: number,
    Positive: number,
    Symptom: number,
    Symptomless: number,
    SymtomConfirming: number,
    Hospitalize: number,
    Mild: number,
    Severe: number,
    Confirming: number,
    Waiting: number,
    Discharge: number,
    Death: number,
    Deaths: number
}

export interface StatData {
    Date: string,
    Prefecture: string,
    Cases: number,
    TotalCases: number,
    Hospitals: number,
    TotalHospitals: number,
    Discharges: number,
    TotalDischarges: number,
    Deaths: number,
    TotalDeaths: number,
    SexData: SexData,
    TotalSexData: SexData,
    AgeData: AgeData,
    TotalAgeData: AgeData,
}

export interface SexData {
    Female: number,
    Male: number,
    Unknown: number,
}

export interface AgeData {
    Age10: number,
    Age20: number,
    Age30: number,
    Age40: number,
    Age50: number,
    Age60: number,
    Age70: number,
    Age80: number,
    Age90: number,
    Unknown: number,
}

export interface PatientData {
    ID: string,
    Date: string,
    Prefecture: string,
    Residence: string,
    Age: string,
    Sex: string,
    Attribute: string,
    PrefectureNumber: string,
    TravelOrContact: string,
    Detail: string,
    Src: string,
    Onset: string,
    Symptom: string,
    DeathOrDischageDate: string,
    Comment1: string,
    Comment2: string,
    Outcome: string,
    OutcomeSrc: string,
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
    Patients: PatientData[]
    PatientsNum: number
    TotalPatientsNum: number
}

export enum Period {
    DATE = "DATE",
    WEEK = "WEEK",
    MONTH = "MONTH",
    YEAR = "YEAR"
}

//export type PatientsByDate = { [date: string]: PatientData[] }
export type PatientsByDate = { date: string, patients: PatientData[] }
export type PatientsNumByDate = { date: string, value: number }
export type PatientsByPref = { pref: string, patients: PatientData[] }
export type PatientsNumByPref = { pref: string, value: number }


// {"3/1": {"愛知県": [Patient1, Patient2, ...], "東京都": [Patient1, Patient2, ...]}, "3/2": {}, ...}
export type DatePatientsObjectByPref = { [s: string]: { [s: string]: PatientData[] } }

// [{date: "3/1", "愛知県": [Patient1, Patient2, ...], "東京都": [Patient1, Patient2, ...]}, {date: "3/2", ...}]
export type DatePatientsArrayByPref = { [a: string]: PatientData[] }[]

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