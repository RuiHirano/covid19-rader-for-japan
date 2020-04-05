import { Sex } from "../types"
import { prefectures } from "../data/prefecture"
import moment from "moment"
import axios from "axios"
/*var aws = require('aws-sdk')
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
aws.config.update({
	region: 'ap-northeast-1',
	credentials: new aws.Credentials(accessKeyId, secretAccessKey)
});
var s3 = new aws.S3();*/

export class API {
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
		console.log("request to ", this.baseURL)
		return axios(
			{
				url: url,
				method: 'get',
				baseURL: this.baseURL,
				params: params,
			}
		);
	}

	async getPatientsData() {

		return this.get({
			url: '/api/v1/patients',
		});
	}

	async getStatsData() {

		return this.get({
			url: '/api/v1/stats',
		});
	}

	async getPrefsData() {

		return this.get({
			url: '/api/v1/prefectures',
		});
	}


	/*async getPatients() {
		var params = {
			Bucket: "covid19.dataset",
			Key: 'patient-dataset.csv'
		};
		const data = await s3.getObject(params, function (err: any, data: any) { return data }).promise();

		const patients: Patient[] = []
		const str = new TextDecoder().decode(data.Body)
		var tmp = str.replace("\n", "").split("\r"); // 改行を区切り文字として行を要素とした配列を生成
		tmp.forEach((tmpstr: string, index: number) => {
			const tmp2 = tmpstr.replace("\n", "").split(",")
			if (tmp2.length === 25 && index !== 0) {
				patients.push({
					ID: tmp2[0],
					Residence: tmp2[13],
					Age: tmp2[16].indexOf("代") != -1 ? parseInt(tmp2[16].split("代")[0]) : -1,
					Sex: tmp2[17] === "男性" ? Sex.MALE : Sex.FEMALE,
					Occupation: tmp2[18],
					Prefecture: {
						ID: tmp2[1],
						Name: tmp2[10],
						Latitude: parseFloat(tmp2[11]),
						Longitude: parseFloat(tmp2[12]),
					},
					ActionHistory: tmp2[4],
					SymptomHistory: tmp2[3],
					FeverDate: moment(tmp2[5]),
					ConsultationDate: moment(tmp2[6]),
					PublicationDate: moment(tmp2[7]),
					RecoveryDate: moment(tmp2[8]),
					OverseasTravelFlag: tmp2[19] === "1" ? true : false,
					OverseasTravelName: tmp2[20],
					CloseContact: tmp2[23],
					Source: tmp2[24],
				})
			}
		})
		return patients
	}*/

}

