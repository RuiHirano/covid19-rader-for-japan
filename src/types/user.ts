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
				id: "thumbnail",
				status: ImageStatus.NONE,
				url: "",
				size: 0
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