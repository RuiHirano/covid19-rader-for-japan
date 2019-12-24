import { Profile, Setting, User, Sex, Language, Plan, Device, BankAccount, Content, Notification } from "./types"
import uuid from "uuid"

export class ProfileClass {
	Name: string
	Age: number
	Sex: Sex
	Message: string
	Thumbnail: string
	constructor() {
		this.Name = ""
		this.Age = 0
		this.Message = ""
		this.Sex = Sex.MALE
		this.Thumbnail = ""
	}

	getProfile() {
		return <Profile>{
			Name: this.Name,
			Age: this.Age,
			Sex: this.Sex,
			Message: this.Message,
			Thumbnail: this.Thumbnail,
		}
	}
}

export class BankAccountClass {
	AccountNumber: string
	constructor() {
		this.AccountNumber = ""
	}

	getBankAccount() {
		return <BankAccount>{
			AccountNumber: this.AccountNumber,
		}
	}
}

export class NotificationClass {
	Email: boolean
	Push: boolean
	constructor() {
		this.Email = true
		this.Push = true
	}

	getNotification() {
		return <Notification>{
			Email: this.Email,
			Push: this.Push,
		}
	}
}

export class ContentClass {
	InitialInvestment: number
	AllowableLossRate: number
	BankruptcyReductionRate: number
	Currencies: {
		Pair: string,
		Color: string,
	}[]
	Stocks: {
		Pair: string,
		Color: string,
	}[]
	SearchTags: string[]

	constructor() {
		this.InitialInvestment = 0
		this.AllowableLossRate = 0
		this.BankruptcyReductionRate = 0
		this.Currencies = []
		this.Stocks = []
		this.SearchTags = []
	}

	getContent() {
		return <Content>{
			InitialInvestment: this.InitialInvestment,
			AllowableLossRate: this.AllowableLossRate,
			BankruptcyReductionRate: this.BankruptcyReductionRate,
			Currencies: this.Currencies,
			Stocks: this.Stocks,
			SearchTags: this.SearchTags,
		}
	}
}

export class SettingClass {
	Email: string
	BankAccount: BankAccount
	Language: Language
	Notification: Notification
	Content: Content
	Plan: Plan
	Device: Device

	constructor() {
		this.Email = ""
		this.BankAccount = new BankAccountClass().getBankAccount()
		this.Language = Language.ja
		this.Notification = new NotificationClass().getNotification()
		this.Content = new ContentClass().getContent()
		this.Plan = Plan.FREE
		this.Device = Device.PC
	}

	getSetting() {
		return <Setting>{
			Email: this.Email,
			BankAccount: this.BankAccount,
			Language: this.Language,
			Notification: this.Notification,
			Content: this.Content,
			Plan: this.Plan,
			Device: this.Device,
		}
	}
}

export class UserClass {
	ID: string
	Profile: Profile
	Setting: Setting

	constructor() {
		this.ID = uuid()
		this.Profile = new ProfileClass().getProfile()
		this.Setting = new SettingClass().getSetting()
	}

	getUser(): User {
		const user: User = {
			ID: this.ID,
			Profile: this.Profile,
			Setting: this.Setting,
		}
		return user
	}

	setUser(user: User) {
		this.ID = user.ID
		this.Profile = user.Profile
		this.Setting = user.Setting
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