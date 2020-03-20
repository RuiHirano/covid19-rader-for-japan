import uuid from "uuid"
import { Image, ImageStatus } from "./item"

export interface Notification {
	Email: boolean,
	Push: boolean,
}

export interface Profile {
	Name: string,
	Age: number,
	Sex: Sex,
	Message: string,
	Thumbnail: Image
}

export interface BankAccount {
	AccountNumber: string,
}

export interface Setting {
	Email: string,
	BankAccount: BankAccount,
	Language: Language,
	Notification: Notification,
	Content: Content,
	Plan: Plan,
	Device: Device,
}

export interface PairValues {
	Pair: string,
	Color: string,
}

export interface Content {
	InitialInvestment: number,
	AllowableLossRate: number,
	BankruptcyReductionRate: number,
	Currencies: PairValues[],
	Stocks: PairValues[],
	SearchTags: string[],
}

export enum Sex {
	MALE,
	FEMALE,
}

export enum Device {
	PC,
	SMART_PHONE,
}

export enum Plan {
	FREE,
	STANDARD,
	PREMIUM,
}

export enum Language {
	ja,
	en,
}

export class User {
	ID: string
	Profile: Profile
	Setting: Setting

	constructor() {
		this.ID = uuid()
		this.Profile = <Profile>{
			Name: "",
			Age: 0,
			Message: "",
			Sex: Sex.MALE,
			Thumbnail: <Image>{
				ID: "thumbnail",
				Base64: "",
				Status: ImageStatus.NONE,
				Url: "",
				Size: 0
			},
		}
		this.Setting = <Setting>{
			Email: "",
			BankAccount: <BankAccount>{
				AccountNumber: "",
			},
			Language: Language.ja,
			Notification: <Notification>{
				Email: true,
				Push: true,
			},
			Content: <Content>{
				InitialInvestment: 0,
				AllowableLossRate: 0,
				BankruptcyReductionRate: 0,
				Currencies: [],
				Stocks: [],
				SearchTags: [],
			},
			Plan: Plan.FREE,
			Device: Device.PC,
		}
	}

	setJson(userData: User) {
		//const user_: User = JSON.parse(userData)
		this.ID = userData.ID
		this.Profile = <Profile>{
			Name: userData.Profile.Name,
			Age: userData.Profile.Age,
			Message: userData.Profile.Message,
			Sex: userData.Profile.Sex,
			Thumbnail: <Image>{
				ID: userData.Profile.Thumbnail.ID,
				Base64: userData.Profile.Thumbnail.Base64,
				Status: userData.Profile.Thumbnail.Status,
				Url: userData.Profile.Thumbnail.Url,
				Size: userData.Profile.Thumbnail.Size
			},
		}
		this.Setting = <Setting>{
			Email: userData.Setting.Email,
			BankAccount: <BankAccount>{
				AccountNumber: userData.Setting.BankAccount.AccountNumber,
			},
			Language: Language.ja,
			Notification: <Notification>{
				Email: userData.Setting.Notification.Email,
				Push: userData.Setting.Notification.Push,
			},
			Content: <Content>{
				InitialInvestment: userData.Setting.Content.InitialInvestment,
				AllowableLossRate: userData.Setting.Content.AllowableLossRate,
				BankruptcyReductionRate: userData.Setting.Content.BankruptcyReductionRate,
				Currencies: userData.Setting.Content.Currencies,
				Stocks: userData.Setting.Content.Stocks,
				SearchTags: userData.Setting.Content.SearchTags,
			},
			Plan: userData.Setting.Plan,
			Device: userData.Setting.Device,
		}
	}



	setID(id: User["ID"]) {
		this.ID = id
	}

	setProfile(profile: User["Profile"]) {
		this.Profile = profile
	}

	setSetting(setting: User["Setting"]) {
		this.Setting = setting
	}
}