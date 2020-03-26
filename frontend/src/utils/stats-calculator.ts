import { Period, Patient, Prefecture, PatientsByDate, PatientsNumByPref, PatientsByPref } from "../types"
import { prefectures } from "../data/prefecture"

export class StatsCalculator {

    constructor() {

    }

    /* 都道府県別のある期間毎の感染者数を計算 */
    calcPatientsByDate(patients: Patient[], period: Period) {
        const patientsObj: { [date: string]: Patient[] } = {}  // [{"3/1": [Patient1, Patient2]}, {"3/2": [Patient3, ...]}, ...]
        patients.forEach((patient) => {
            const dateStr: string = patient.PublicationDate.format("M/D")
            if (dateStr !== null) {     // 欠損値を除去
                if (patientsObj[dateStr] === undefined) {
                    patientsObj[dateStr] = []
                }
                patientsObj[dateStr].push(patient)
            }

        })
        // 配列に変換
        let patientsByDate: PatientsByDate[] = Object.entries(patientsObj).map(([key, value]) => ({ date: key, patients: value })) // [{date: "3/1", patients: [Patient1, Patient2]}, {date: "3/2", patients: [Patient3, ...]}, ...]
        // 日付順にソート
        patientsByDate = sortPatientsByDate(patientsByDate)


        return patientsByDate
    }

    /* 都道府県別のある期間毎の感染者数を計算 */
    // return: [{ pref: '北海道', 'patients': [] },{ pref: '東京都', 'patients': [patient1] },{ pref: '愛知県', 'patients': [patient2] },...]
    calcPatientsByPrefecture(patients: Patient[]) {
        const patientsObj: { [pref: string]: Patient[] } = createDefaultPatientByPref()  // {"愛知県": [Patient1, Patient2], "東京都": [Patient3, ...], ...}
        patients.forEach((patient) => {
            const prefName = patient.Prefecture.Name
            if (prefName !== null && prefName !== "") {     // 欠損値を除去
                patientsObj[prefName].push(patient)
            }

        })

        // 配列に変換
        let patientsByPref: PatientsByPref[] = Object.entries(patientsObj).map(([key, value]) => ({ pref: key, patients: value })) // [{name: "愛知県", value: [Patient1, Patient2]}, {name: "東京都", value: [Patient3, ...]}, ...]

        return patientsByPref
    }


    /* 都道府県別の感染者数合計を計算 */
    // return: [{ pref: '北海道', 'value': 12 },{ pref: '東京都', 'value': 22 },{ pref: '愛知県', 'value': 2 },...]
    createPatientsNumByPref(patients: Patient[], top: number) {
        let result: PatientsNumByPref[] = []
        const a = this.calcPatientsByPrefecture(patients)

        // 大きい順からtopまでを取得
        const topResult = a.sort(function (pd1: PatientsByPref, pd2: PatientsByPref) {
            if (pd1.patients.length < pd2.patients.length) return 1;
            if (pd1.patients.length > pd2.patients.length) return -1;
            return 0;
        }).slice(0, top);
        topResult.forEach((data, index) => {
            result.push({ pref: data.pref, value: data.patients.length })
        })

        return result
    }


    /* 都道府県別のある期間毎の感染者数を計算 */
    /*createPrefPatientsNumByDate(patients: Patient[], period: Period) {
        let result: { [key: string]: number | string }[] = []  // [{date: "3/2", "愛知県": 0, "東京都": 3}, {date: "3/3", "愛知県": 0, "東京都": 3}]

        // 日付ごとの患者数
        const patientsByDate = this.calcPatientsByDate(patients, period) // [{"3/1": [Patient1, Patient2]}, {"3/2": [Patient3, ...]}, ...]

        // 日付と都道府県毎の患者数
        const byDatePrefObj: { [date: string]: PatientsByPref } = {} // {"3/1": {"愛知県": [Patient1, Patient2], "東京都": [Patient3, ...]}, "3/2": {"愛知県": [Patient1, Patient2], "東京都": [Patient3, ...]}, ...}
        for (let date in patientsByDate) {
            if (byDatePrefObj[date] === undefined) {
                byDatePrefObj[date] = {}
            }
            byDatePrefObj[date] = this.calcPatientsByPrefecture(patientsByDate[date])
        }

        // 患者の配列を患者数に変換
        const numbyDatePrefObj: { [date: string]: { [pref: string]: number } } = {} // {"3/1": {"愛知県": 2, "東京都": 3}, "3/2": {"愛知県": 2, "東京都": 3}, ...}
        for (let date in byDatePrefObj) {
            if (numbyDatePrefObj[date] === undefined) {
                numbyDatePrefObj[date] = {}
            }
            for (let pref in byDatePrefObj[date]) {
                numbyDatePrefObj[date][pref] = byDatePrefObj[date][pref].length // 患者数を代入
            }
        }

        // 配列に変換して日付順にソート
        result = Object.entries(numbyDatePrefObj).map(([key, value]) => ({ date: key, ...value })) // [{date: "3/1", "愛知県": 2, "東京都": 3}, {date: "3/2", "愛知県": 2, "東京都": 3}, ...]

        return result
    }*/



    /* 都道府県別のある期間毎の感染者数を計算 */
    /*calcPatientNumByPrefecture(patients: Patient[], period: Period) {
        const resultObj: any = {}
        patients.forEach((patient) => {
            const dateStr = patient.PublicationDate.toISOString()
            if (dateStr !== null) {
                const prefName = patient.Prefecture.Name
                if (resultObj[dateStr] === undefined) {
                    resultObj[dateStr] = createDefaultPatientNumByPref()
                }
                resultObj[dateStr][prefName] = resultObj[dateStr][prefName] === undefined ? 0 : resultObj[dateStr][prefName] + 1
            }

        })
        // 日付順にソート
        const result = sortObjectArray(createObjectArray(resultObj, "date"))

        return result
    }

    calcTotalData(data: any[], prefs: string[]) {
        const newData: any[] = []
        let totalData: any = createDefaultPatientNumByPref()
        data.forEach((subdata) => {
            const test: any = {}
            prefs.forEach((prefName: string) => {
                test[prefName] = subdata[prefName] + totalData[prefName]
                totalData[prefName] = subdata[prefName] + totalData[prefName]
            })
            newData.push({ date: subdata.date, '愛知県': subdata.愛知県 + totalData.愛知県, '東京都': subdata.東京都 + totalData.東京都, '北海道': subdata.北海道 + totalData.北海道 })
            totalData = { date: subdata.date, '愛知県': subdata.愛知県 + totalData.愛知県, '東京都': subdata.東京都 + totalData.東京都, '北海道': subdata.北海道 + totalData.北海道 }
        })
        console.log("newdata: ", newData)
        return newData
    }*/
}



/////////////////////////////////////////////////
//////////           Util                   /////
////////////////////////////////////////////////

/* dateをKeyとしたobjectを連想配列に変換する */
/* {"3/2": {a: "", b: ""}, "3/3": {a: "", b: ""}}  => [{date: "3/2", a: "", b: ""}, {date: "3/3", a: "", b: ""}] */
export const createObjectArray = (obj: object, keyName: string) => {
    const result = Object.entries(obj).map(([key, value]) => ({ [keyName]: key, ...value }))
    return result
}


export const sortObjectArray = (objArr: object[]) => {
    const newObjArr = objArr.sort(function (p1: any, p2: any) {
        if (p1.date < p2.date) return -1;
        if (p1.date > p2.date) return 1;
        return 0;
    });
    return newObjArr
}

const createDefaultPatientNumByPref = () => {
    const result: any = {}
    prefectures.forEach((pref: Prefecture) => {
        result[pref.Name] = 0
    })
    return result
}

const createDefaultPatientsByPref = () => {
    const result: any = {}
    prefectures.forEach((pref: Prefecture) => {
        result[pref.Name] = []
    })
    return result
}

const createDefaultPatientsByDate = () => {
    const result: any = {}
    prefectures.forEach((pref: Prefecture) => {
        result[pref.Name] = []
    })
    return result
}

const createDefaultPatientByPref = () => {
    const result: { [s: string]: [] } = {}
    prefectures.forEach((pref: Prefecture) => {
        result[pref.Name] = []
    })
    return result
}


export const sortPatientsByDate = (pd: PatientsByDate[]) => {
    const newObjArr = pd.sort(function (pd1: PatientsByDate, pd2: PatientsByDate) {
        if (pd1.date < pd2.date) return -1;
        if (pd1.date > pd2.date) return 1;
        return 0;
    });
    return newObjArr
}