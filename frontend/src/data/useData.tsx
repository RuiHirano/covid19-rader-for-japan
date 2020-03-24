
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { patientActions } from "../redux/module/patient";
import { Patient } from "../types";
import { GoogleSheetsAPI } from "../api"
import { Status } from "../types/app";

/////////////////////////////////////////////////
//////////          Get Patient             /////
////////////////////////////////////////////////

export const useGetPatients = () => {
    const [status, setStatus] = useState<Status>({ Progress: 0, Log: "", Error: "", Loading: false })
    const dispatch = useDispatch()
    const api = new GoogleSheetsAPI()

    const getPatients = useCallback(async () => {
        try {
            // Loading開始
            setStatus({ ...status, Loading: true })

            // get patients
            const patientsInfoJson = await api.getPatients()
            const patientsInfo: Patient[] = convertJsonToPatients(patientsInfoJson)

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

const convertJsonToPatients = (patientsJson: any) => {
    const patients: Patient[] = []
    patientsJson.data.forEach((pjson: any, index: number) => {
        const patient: Patient = {
            ID: pjson.ID,
            Residence: pjson.Residence,
            Age: pjson.Age,
            Sex: pjson.Sex,
            Occupation: pjson.Occupation,
            Prefecture: {
                ID: pjson.Prefecture.ID,
                Name: pjson.Prefecture.Name,
                Longitude: pjson.Prefecture.Longitude,
                Latitude: pjson.Prefecture.Latitude,
            },
            ActionHistory: pjson.ActionHistory,
            SymptomHistory: pjson.SymptomHistory,
            FeverDate: pjson.FeverDate,
            ConsultationDate: pjson.ConsultationDate,
            PublicationDate: pjson.PublicationDate,
            RecoveryDate: pjson.RecoveryDate,
            OverseasTravelFlag: pjson.OverseasTravelFlag,
            OverseasTravelName: pjson.OverseasTravelName,
            CloseContact: pjson.CloseContact,
            Source: pjson.Source,
        }
        patients.push(patient)
    });

    return patients
}