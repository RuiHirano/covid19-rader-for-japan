import { Patient, Sex } from "../types"
import { prefectures } from "../data/prefecture"
import moment from "moment"
import axios from "axios"

export class GoogleSheetsAPI {
	private baseURL: string

	constructor(url: string = 'http://localhost:5000') {
		this.baseURL = url;
	}

	getBaseURL() {
		return this.baseURL;
	}

	setBaseURL(val: string) {
		this.baseURL = val;
	}

	async get({
		url = "",
		params = {},
	}) {
		return axios(
			{
				url: url,
				method: 'get',
				baseURL: this.baseURL,
				params: params,
			}
		);
	}

	async getPatients() {

		return this.get({
			url: '/file/patient',
		});
	}



}


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
