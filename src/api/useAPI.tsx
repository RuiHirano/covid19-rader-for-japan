
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { patientActions } from "../redux/module/patient";
import { PatientData, Sex, PrefData, TotalData, StatData } from "../types";
import { API } from "."
import { Status } from "../types/app";
import { dataActions } from '../redux/module/data';
import { ReduxState } from '../redux/module';

const getBackendAddress = () => {
    let backendAddress = 'http://localhost:5000'
    if (process.env.REACT_APP_BACKEND_ADDRESS) {
        backendAddress = process.env.REACT_APP_BACKEND_ADDRESS
    }
    return backendAddress
}

/////////////////////////////////////////////////
//////////          Get Data             /////
////////////////////////////////////////////////

export const useGetData = () => {
    const [status, setStatus] = useState<Status>({ Progress: 0, Log: "", Error: "", Loading: false })
    const dispatch = useDispatch()
    const backendAddress = getBackendAddress()
    const data = useSelector((state: ReduxState) => state.Data)
    const api = new API(backendAddress)

    const getData = useCallback(async () => {
        try {
            // Loading開始
            setStatus({ ...status, Loading: true })

            // get patients
            const ps_response = await api.getPatientsData()
            const ps_dataJson = ps_response.data
            let patientsData: PatientData[] = convertJsonToPatients(ps_dataJson)
            data.PatientsData = patientsData

            // get prefs
            const pr_response = await api.getPrefsData()
            const pr_dataJson = pr_response.data
            let prefsData: PrefData[] = convertJsonToPrefs(pr_dataJson)
            data.PrefsData = prefsData

            // get stats
            const to_response = await api.getStatsData()
            const to_dataJson = to_response.data
            let statsData: StatData[] = convertJsonToStats(to_dataJson)
            data.StatsData = statsData


            // userInfoをstore
            dispatch(dataActions.updateData(data))

            // Loading終了
            setStatus({ ...status, Loading: false, Progress: 100 })

        } catch (err) {
            console.log("error: ", err)
            setStatus({ ...status, Error: err })
        }

    }, [status])
    return { "getData": getData, "status": status }
}

const convertJsonToPatients = (patientsJson: any) => {
    const patients: PatientData[] = []
    patientsJson.forEach((pjson: any, index: number) => {
        const patient: PatientData = {
            ID: pjson.id,
            Date: pjson.date,
            Prefecture: pjson.prefecture,
            Residence: pjson.residence,
            Age: pjson.age,
            Sex: pjson.sex,
            Attribute: pjson.attribute,
            PrefectureNumber: pjson.prefecture_number,
            TravelOrContact: pjson.travel_or_contact,
            Detail: pjson.detail,
            Src: pjson.src,
            Onset: pjson.onset,
            Symptom: pjson.symptom,
            DeathOrDischageDate: pjson.death_or_discharge_date,
            Comment1: pjson.comment1,
            Comment2: pjson.comment2,
            Outcome: pjson.outcome,
            OutcomeSrc: pjson.outcome_src,
        }
        patients.push(patient)
    });

    return patients
}

const convertJsonToPrefs = (prefsJson: any) => {
    const prefs: PrefData[] = []
    prefsJson.forEach((pjson: any, index: number) => {
        const pref: PrefData = {
            Id: pjson.id,
            NameJa: pjson.name_ja,
            NameEn: pjson.name_en,
            Latitude: pjson.latitude,
            Longitude: pjson.longitude,
            Regions: pjson.regions,
        }
        prefs.push(pref)
    });

    return prefs
}

const convertJsonToStats = (statsJson: any) => {
    const stats: StatData[] = []
    statsJson.forEach((sjson: any, index: number) => {
        const stat: StatData = {
            Date: sjson.date,
            Prefecture: sjson.prefecture,
            Cases: sjson.cases,
            TotalCases: sjson.total_cases,
            Hospitals: sjson.hospitals,
            TotalHospitals: sjson.total_hospitals,
            Discharges: sjson.discharges,
            TotalDischarges: sjson.total_discharges,
            Deaths: sjson.deaths,
            TotalDeaths: sjson.total_deaths,
            SexData: sjson.sex_data,
            TotalSexData: sjson.total_sex_data,
            AgeData: sjson.age_data,
            TotalAgeData: sjson.total_age_data,
        }
        stats.push(stat)
    });



    return stats
}