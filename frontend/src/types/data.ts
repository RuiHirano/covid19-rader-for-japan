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
    FEMALE = "FEMALE",
    MALE = "MALE"
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