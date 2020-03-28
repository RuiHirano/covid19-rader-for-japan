
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { patientActions } from "../redux/module/patient";
import { Patient, Sex } from "../types";
import { API } from "../api"
import { Status } from "../types/app";
import moment from 'moment';
import { prefectures } from './prefecture';


const mockPatients: Patient[] = [
    {
        ID: "0",
        Residence: "北海道",
        Age: 20,
        Sex: Sex.FEMALE,
        Occupation: "医者",
        Prefecture: prefectures[0],
        ActionHistory: "", // 行動歴
        SymptomHistory: "",	// 症状・経過
        FeverDate: moment(),  // 発熱観察日 
        ConsultationDate: moment(), // 受診日
        PublicationDate: moment(), // 公表日
        RecoveryDate: moment(),  // 回復日
        OverseasTravelFlag: true, // 海外渡航フラグ
        OverseasTravelName: "China",  // 渡航先
        CloseContact: "", // 濃厚接触者情報
        Source: "http://"  // 情報源
    },
    {
        ID: "1",
        Residence: "愛知県",
        Age: 20,
        Sex: Sex.FEMALE,
        Occupation: "医者",
        Prefecture: prefectures[0],
        ActionHistory: "", // 行動歴
        SymptomHistory: "",	// 症状・経過
        FeverDate: moment(),  // 発熱観察日 
        ConsultationDate: moment(), // 受診日
        PublicationDate: moment(), // 公表日
        RecoveryDate: moment(),  // 回復日
        OverseasTravelFlag: true, // 海外渡航フラグ
        OverseasTravelName: "China",  // 渡航先
        CloseContact: "", // 濃厚接触者情報
        Source: "http://"  // 情報源
    },
    {
        ID: "2",
        Residence: "東京都",
        Age: 20,
        Sex: Sex.FEMALE,
        Occupation: "医者",
        Prefecture: prefectures[0],
        ActionHistory: "", // 行動歴
        SymptomHistory: "",	// 症状・経過
        FeverDate: moment(),  // 発熱観察日 
        ConsultationDate: moment(), // 受診日
        PublicationDate: moment(), // 公表日
        RecoveryDate: moment(),  // 回復日
        OverseasTravelFlag: true, // 海外渡航フラグ
        OverseasTravelName: "China",  // 渡航先
        CloseContact: "", // 濃厚接触者情報
        Source: "http://"  // 情報源
    },
]


/////////////////////////////////////////////////
//////////          Get Patient             /////
////////////////////////////////////////////////

const backendAddress = process.env.BACKEND_ADDRESS ? process.env.BACKEND_ADDRESS : 'http://localhost:8080'

export const useGetPatients = () => {
    const [status, setStatus] = useState<Status>({ Progress: 0, Log: "", Error: "", Loading: false })
    const dispatch = useDispatch()
    console.log("backend address: ", backendAddress)
    const api = new API(backendAddress)

    const getPatients = useCallback(async () => {
        try {
            // Loading開始
            setStatus({ ...status, Loading: true })

            // get patients
            const patientsInfoJson = await api.getPatients()
            let patientsInfo: Patient[] = convertJsonToPatients(patientsInfoJson)

            //awsTest()
            patientsInfo = removeMissingValues(patientsInfo)

            // userInfoをstore
            dispatch(patientActions.updatePatientInfo(patientsInfo))

            // Loading終了
            setStatus({ ...status, Loading: false, Progress: 100 })

        } catch (err) {
            console.log("error: ", err)
            setStatus({ ...status, Error: err })
        }

    }, [status])
    return { "getPatients": getPatients, "status": status }
}


/////////////////////////////////////////////////
//////////              Util               /////
////////////////////////////////////////////////

const removeMissingValues = (patients: Patient[]) => {
    const result: Patient[] = []
    let removeCount = 0
    patients.forEach((patient) => {
        // 都道府県名が間違っているものを省く
        // 2019年以下を省く
        const prefName = patient.Prefecture.Name
        const date = patient.PublicationDate
        if (date.isSameOrAfter('2020-1-1', 'year') && isExistPref(prefName)) {
            result.push(patient)
        } else {
            removeCount++
        }
    })
    console.log("Missing Value Num: ", removeCount)

    return result
}

const isExistPref = (prefName: string) => {
    return prefectures.map((pref) => {
        if (prefName === pref.Name) {
            return true
        }
    })
}

const convertJsonToPatients = (patientsJson: any) => {
    const patients: Patient[] = []
    patientsJson.data.forEach((pjson: any, index: number) => {
        const patient: Patient = {
            ID: pjson.ID,
            Residence: pjson.Residence,
            Age: pjson.Age,
            Sex: pjson.Sex === 0 ? Sex.MALE : Sex.FEMALE,
            Occupation: pjson.Occupation,
            Prefecture: {
                ID: pjson.Prefecture.ID,
                Name: pjson.Prefecture.Name,
                Longitude: pjson.Prefecture.Longitude,
                Latitude: pjson.Prefecture.Latitude,
            },
            ActionHistory: pjson.ActionHistory,
            SymptomHistory: pjson.SymptomHistory,
            FeverDate: moment(pjson.FeverDate, 'YYYY/MM/DD'),
            ConsultationDate: moment(pjson.ConsultationDate, 'YYYY/MM/DD'),
            PublicationDate: moment(pjson.PublicationDate, 'YYYY/MM/DD'),
            RecoveryDate: moment(pjson.RecoveryDate, 'YYYY/MM/DD'),
            OverseasTravelFlag: pjson.OverseasTravelFlag,
            OverseasTravelName: pjson.OverseasTravelName,
            CloseContact: pjson.CloseContact,
            Source: pjson.Source,
        }
        patients.push(patient)
    });

    return patients
}