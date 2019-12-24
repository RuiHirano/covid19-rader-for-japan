
export interface Notification {
	Email: boolean,
	Push: boolean,
}

export interface Profile {
	Name: string,
	Age: number,
	Sex: Sex,
	Message: string,
	Thumbnail: string
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

export interface Content {
	InitialInvestment: number,
	AllowableLossRate: number,
	BankruptcyReductionRate: number,
	Currencies: {
		Pair: string,
		Color: string,
	}[],
	Stocks: {
		Pair: string,
		Color: string,
	}[],
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

export interface User {
	ID: string,
	Profile: Profile,
	Setting: Setting,
}

//export interface Items {
//    Items: Item[]
//}

export interface Item {
	ID: string,
	MarketType: MarketType,
	StartDate: string,
	EndDate: string,
	TradeType: TradeType,
	Pair: string,
	Lot: number
	EntryRate: number
	LossCutRate: number
	SettleRate: number
	Profit: number
	BeforeComment: string,
	AfterComment: string,
	Tags: string[],
	Images: Image[],
	UpdatedAt: string,
	CreatedAt: string,
}

export enum MarketType {
	FX,
	STOCK,
}

export enum PeriodType {
	DAY,
	MONTH,
	YEAR,
	ALL,
}

export enum TradeType {
	BUY,
	SELL,
	RECORD,
	WITHDRAWAL,
	DEPOSIT,
}

export interface Image {
	url: string,
	size: number,
}


//////// App ///////
export interface App {
	Loading: Loading,
	Error: Error,
	State: State,
}

export interface State {
	IsSignIn: boolean,
	SearchTags: string[],
	IsMatchPassword: boolean,
}

export interface Error {
	IsError: boolean,
	Status: string,
}

export interface Loading {
	IsLoading: boolean,
	LoadingState: LoadingState,
}

export enum LoadingState {
	NONE,
	UPDATE_EMAIL,
	UPDATE_PASSWORD,
	DELETE_ACCOUNT,
	UPDATE_PROFILE,
	UPDATE_SETTING,
	UPDATE_CONTENT,
	UPDATE_BANK_ACCOUNT,
	UPDATE_NOTIFICATION,
	UPDATE_LANGUAGE,
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	CREATE_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
}

export interface Statistics {
	InitialInvestment: number,
	ProfitBefore: number,
	TotalAssets: number,
	NumDepWith: number,
	AmountDepWith: number,
	TotalProfitAndLoss: number,
	TotalProfit: number,
	TotalLoss: number,
	WinRate: number,
	NumTrade: number,
	NumWin: number,
	NumLose: number,
	ProfitRatio: number,
	ProfitAve: number,
	LossAve: number,
}
