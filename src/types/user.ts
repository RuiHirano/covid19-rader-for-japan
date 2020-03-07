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
				Path: "",
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

	setJson(userData: any){
		const user_: User = JSON.parse(userData)
		this.ID = user_.ID
		this.Profile = <Profile>{
			Name: user_.Profile.Name,
			Age: user_.Profile.Age,
			Message: user_.Profile.Message,
			Sex: user_.Profile.Sex,
			Thumbnail: <Image>{
				ID: user_.Profile.Thumbnail.ID,
				Path: user_.Profile.Thumbnail.Path,
				Status: user_.Profile.Thumbnail.Status,
				Url: user_.Profile.Thumbnail.Url,
				Size: user_.Profile.Thumbnail.Size
			},
		}
		this.Setting = <Setting>{
			Email: user_.Setting.Email,
			BankAccount: <BankAccount>{
				AccountNumber: user_.Setting.BankAccount.AccountNumber,
			},
			Language: Language.ja,
			Notification: <Notification>{
				Email: user_.Setting.Notification.Email,
				Push: user_.Setting.Notification.Push,
			},
			Content: <Content>{
				InitialInvestment: user_.Setting.Content.InitialInvestment,
				AllowableLossRate: user_.Setting.Content.AllowableLossRate,
				BankruptcyReductionRate: user_.Setting.Content.BankruptcyReductionRate,
				Currencies:  user_.Setting.Content.Currencies,
				Stocks:  user_.Setting.Content.Stocks,
				SearchTags:  user_.Setting.Content.SearchTags,
			},
			Plan: user_.Setting.Plan,
			Device: user_.Setting.Device,
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