
export interface Notification {
    Email: boolean,
    Push: boolean,
}

export interface Profile {
	Name: string,
	Age: string,
	Sex: string,
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
        pair: string,
        color: string,
    }[],
    Stocks: {
        pair: string,
        color: string,
    }[],
    SearchTags: string[],
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
	ID: number,
	Profile: Profile,
    Setting: Setting,
}

export interface Items {
    Items: Item[]
}

export interface Item {
    ID: number,
    MarketType: MarketType,
    StartDate: string,
    EndDate: string,
    TradeType: TradeType,
    Pair: string,
    Lot: string,
    EntryRate: string,
    LossCutRate: string,
    SettleRate: string,
    Profit: string,
    BeforeComment: string,
    AfterComment: string,
    Tags: string[],
    Images: Image[],
    UpdatedAt: string,
    CreatedAt: string,
}

export enum MarketType{
    FX,
    STOCK,
}

export enum TradeType{
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
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
}
