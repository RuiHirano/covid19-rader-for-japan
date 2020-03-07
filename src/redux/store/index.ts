import { createStore, applyMiddleware } from 'redux'
import rootModule from '../module'
import logger from 'redux-logger'
//import createSagaMiddleware from 'redux-saga'
//import rootSaga from '../saga'
import {
	persistReducer,
	persistStore,
	createTransform,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AppActions } from '../module/app'
import { App, Item, User, Profile, Setting, BankAccount, Content, Notification, Loading, Error, State } from '../../types'
import { ItemActions } from '../module/item'
import { UserActions } from '../module/user'

export default function configureStore() {
	// localstorageのstateに型付けする
	const dateTransform = createTransform(null, (outboundState: any) => {
		console.log("out: ", outboundState)
		if (outboundState.items !== undefined) {
			var items: Item[] = []
			const preItems = outboundState.items
			preItems.forEach((item: any) => {
				const preItem: Item = new Item()
				preItem.ID = item.ID
				preItem.MarketType = item.MarketType
				preItem.StartDate = item.StartDate
				preItem.EndDate = item.EndDate
				preItem.TradeType = item.TradeType
				preItem.Pair = item.Pair
				preItem.Lot = item.Lot
				preItem.EntryRate = item.EntryRate
				preItem.LossCutRate = item.LossCutRate
				preItem.SettleRate = item.SettleRate
				preItem.Profit = item.Profit
				preItem.BeforeComment = item.BeforeComment
				preItem.AfterComment = item.AfterComment
				preItem.Tags = item.Tags
				preItem.Images = item.Images
				preItem.UpdatedAt = item.UpdatedAt
				preItem.CreatedAt = item.CreatedAt

				items.push(preItem)
			});
			return items
		} else if (outboundState.ID !== undefined) {
			const preUser = outboundState
			var user: User = new User()
			user.ID = preUser.ID
			user.Profile = {
				Name: preUser.Profile.Name,
				Age: preUser.Profile.Age,
				Message: preUser.Profile.Message,
				Sex: preUser.Profile.Sex,
				Thumbnail: preUser.Profile.Thumbnail,
			} as Profile

			const bankAccount: BankAccount = {
				AccountNumber: preUser.Setting.BankAccount.AccountNumber,
			}
			const notification: Notification = {
				Email: preUser.Setting.Notification.Email,
				Push: preUser.Setting.Notification.Push,
			}
			const content: Content = {
				InitialInvestment: preUser.Setting.Content.InitialInvestment,
				AllowableLossRate: preUser.Setting.Content.AllowableLossRate,
				BankruptcyReductionRate: preUser.Setting.Content.BankruptcyReductionRate,
				Currencies: preUser.Setting.Content.Currencies,
				Stocks: preUser.Setting.Content.Stocks,
				SearchTags: preUser.Setting.Content.SearchTags,
			}
			user.Setting = <Setting>{
				Email: preUser.Setting.Email,
				BankAccount: bankAccount,
				Language: preUser.Setting.Language,
				Notification: notification,
				Content: content,
				Plan: preUser.Setting.Plan,
				Device: preUser.Setting.Device,
			}
			console.log("user: ", user)
			return user
		} else if (outboundState.Loading != undefined) {
			const preApp = outboundState
			var app: App = {
				Loading: <Loading>{
					IsLoading: preApp.Loading.IsLoading,
					LoadingState: preApp.Loading.LoadingState,
				},
				Error: <Error>{
					IsError: preApp.Error.IsError,
					Status: preApp.Error.Status,
				},
				State: <State>{
					IsSignIn: preApp.State.IsSignIn,
					SearchTags: preApp.State.SearchTags,
					IsMatchPassword: preApp.State.IsMatchPassword,
				}
			}
			console.log("app: ", app)
			return app
		}
	})

	// 永続化の設定
	const persistConfig = {
		key: 'root2', // Storageに保存されるキー名を指定する
		storage, // 保存先としてlocalStorageがここで設定される
		transforms: [dateTransform],
		//whitelist: ['userStatus'] // Stateは`todos`のみStorageに保存する
		// blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
	}

	//const sagaMiddleware = createSagaMiddleware()
	const persistedReducer = persistReducer(persistConfig, rootModule)

	const store = createStore(
		persistedReducer,
		applyMiddleware(logger)
	)

	//sagaMiddleware.run(rootSaga)

	const persistor = persistStore(store)
	//persistor.purge()
	return { store, persistor }
}

export interface ActionTypes {
	AppActions: AppActions,
	ItemActions: ItemActions,
	UserActions: UserActions
}
