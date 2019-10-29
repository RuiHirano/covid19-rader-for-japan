import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Scene, Router, Tabs, Drawer, Actions, ActionConst } from 'react-native-router-flux'
import appColor from './../theme/color'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Calendar from './../../page/Calendar/container/CalendarPager'
import History from './../../page/History/container/HistoryPager'
import Statistics from './../../page/Statistics/container/StatisticsPager'
import Graph from './../../page/Graph/container/GraphPager'
import SignIn from '../../page/Sign/container/SignInContainer'
import SignUp from '../../page/Sign/container/SignUpContainer'
import Settings from './../../page/Settings/container/SettingsPage'
import Help from './../../page/Help/container/HelpPage'
import Inquiry from './../../page/Inquiry/container/InquiryPage'
import Information from './../../page/Information/container/InformationPage'
import Welcome from './../../page/Welcome/container/WelcomeContainer'
import UserDrawer from './components/UserDrawer'
import Profile from '../../page/Profile/container/ProfilePage'
import Account from './../../page/Account/container/AccountPage'
import About from './../../page/About/container/AboutPage'
import Privacypolicy from './../../page/About/container/Privacypolicy'
import TermOfService from './../../page/About/container/TermOfService'
import HomePage from './../../page/About/container/HomePage'
import Notification from './../../page/Notification/container/NotificationPage'
import Language from './../../page/Language/container/LanguagePage'
import InputNameForm from './../../page/Profile/container/InputNameFormPage'
import InputStatusMessageForm from './../../page/Profile/container/InputStatusFormPage'
import UpdateEmail from './../../page/Account/container/UpdateEmailPage'
import UpdatePassword from './../../page/Account/container/UpdatePasswordPage'
import DeleteAccount from './../../page/Account/container/DeleteAccountPage'
import ImportFromTM from './../../page/Settings/container/ImportFromTMPage'
import Search from './../../page/Search/container/SearchPage'
import InputSearch from './../../page/Search/container/InputSearchPage'
import StockEntryForm from './../../page/EntryForm/container/StockEntryFormPage'
import FXEntryForm from './../../page/EntryForm/container/FXEntryFormPage'
import Record from './../../page/Record/container/RecordContainer'
import ContentsSetting from '../../page/ContentsSetting/container/ContentsSettingPage'
import InitialInvestmentForm from '../../page/ContentsSetting/container/InitialInvestmentForm'
import BankruptcyReductionRateForm from '../../page/ContentsSetting/container/BankruptcyReductionRateForm'
import AllowableLossRateForm from '../../page/ContentsSetting/container/AllowableLossRateForm'
import TradingCurrencyForm from '../../page/ContentsSetting/container/TradingCurrencyForm'
import TradingIssuesForm from '../../page/ContentsSetting/container/TradingIssuesForm'
import i18n from './../i18n/index'
import AdmobBanner from '../../common/component/index'
import { withTheme } from 'react-native-paper'

const styles = {
    tabIconContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIconStyle: {
        width: 24,
        height: 24,
        fontSize: 24,
    },
    menuIconStyle: {
        width: 24,
        height: 24,
        fontSize: 24,
        color: appColor.on_primary,
    },
    navBar: {
        backgroundColor: appColor.primary,
    },
    navBarTitle: {
        color: appColor.on_primary,
    },
    barButtonTextStyle: {
        color: appColor.on_primary,
    },
    barButtonIconStyle: {
        color: appColor.on_primary,
    },
    tabLabelStyle: {
        color: appColor.primary,
    },
    tabStyle: {
        color: appColor.primary,
    },
}

const TabBarIcon = props => (
    <View style={styles.tabIconContainerStyle}>
        <Icon
            name={props.iconName}
            color={props.focused ? 'blue' : 'grey'}
            style={styles.tabIconStyle}
        />
    </View>
)

const RouterComponent = props => {
    const {userStatus, userPlan} = props
    const { colors } = props.theme

    return (
        <Router
            navigationBarStyle={{
                ...styles.navBar,
                backgroundColor: colors.primary,
            }}
            titleStyle={styles.navBarTitle}
            barButtonTextStyle={styles.barButtonTextStyle}
            barButtonIconStyle={styles.barButtonIconStyle}
            navBarButtonColor={{ color: appColor.on_primary }}
        >
            <Scene
                key="main" // 親はcomponentを持たない
                hideNavBar
            >
            
                <Drawer
                    key="drawer"
                    drawerIcon={() => (
                        <Icon
                            name="menu"
                            //color={style}
                            style={styles.menuIconStyle}
                        />
                    )} 
                    drawerWidth={300}
                    contentComponent={UserDrawer} 
                >
                    <Tabs
                        key="tabs"
                        swipeEnabled={true}
                        animationEnabled={true}
                        //initial={userStatus === "SIGNIN"}
                        rightTitle={userPlan === "FREE" ? '': 'Search'}
                        onRight={() => userPlan === "FREE" ? {}: Actions.Search()}
                    >
                        <Scene
                            key="Calendar"
                            component={Calendar}
                            title={i18n.t('ro_calendar')}
                            iconName="calendar"
                            type="material"
                            icon={TabBarIcon}
                        />
                        <Scene
                            key="History"
                            component={History}
                            title={i18n.t('ro_history')}
                            iconName="history"
                            type="material-community"
                            icon={TabBarIcon}
                        />
                        <Scene
                            key="Statistics"
                            component={Statistics}
                            title={i18n.t('ro_statistics')}
                            iconName="calculator"
                            type="ionicon"
                            icon={TabBarIcon}
                        />
                        <Scene
                            key="Graph"
                            component={Graph}
                            title={i18n.t('ro_graph')}
                            iconName="chart-bar"
                            type="material-community"
                            icon={TabBarIcon}
                        />
                    </Tabs>
                </Drawer>
            
                <Scene
                    key="SignIn"
                    component={SignIn}
                    title={i18n.t('ro_sign_in')}
                    initial={userStatus !== "SIGNIN"}
                    hideNavBar={true}
                    type={ActionConst.RESET}
                />
                <Scene
                    key="SignUp"
                    component={SignUp}
                    title={i18n.t('ro_sign_up')}
                    hideNavBar={true}
                    type={ActionConst.RESET}
                />
                
                <Scene
                    key="Welcome"
                    component={Welcome}
                    title={i18n.t('ro_welcome')}
                    hideNavBar={true}
                    type={ActionConst.RESET}
                />
            
                <Scene
                    key="Settings"
                    component={Settings}
                    title={i18n.t('ro_settings')}
                    hideNavBar={false}
                />
                <Scene
                    key="ImportFromTM"
                    component={ImportFromTM}
                    title={i18n.t('ro_import_from_tm')}
                    hideNavBar={false}
                />
                <Scene
                    key="Help"
                    component={Help}
                    title={i18n.t('ro_help')}
                    hideNavBar={false}
                />
                <Scene
                    key="Inquiry"
                    component={Inquiry}
                    title={i18n.t('ro_inquiry')}
                    hideNavBar={false}
                />
                <Scene
                    key="Information"
                    component={Information}
                    title={i18n.t('ro_information')}
                    hideNavBar={false}
                />
                
                
                <Scene
                    key="Profile"
                    component={Profile}
                    title={i18n.t('ro_profile')}
                    hideNavBar={false}
                />
                <Scene
                    key="Account"
                    component={Account}
                    title={i18n.t('ro_account')}
                    hideNavBar={false}
                />
                <Scene
                    key="Content"
                    component={ContentsSetting}
                    title={i18n.t('ro_content')}
                    hideNavBar={false}
                />
                <Scene
                    key="InitialInvestmentForm"
                    component={InitialInvestmentForm}
                    title={i18n.t('ro_initial_investment')}
                    hideNavBar={false}
                />

                <Scene
                    key="BankruptcyReductionRateForm"
                    component={BankruptcyReductionRateForm}
                    title={i18n.t('ro_bankruptcy_reduction_rate')}
                    hideNavBar={false}
                />

                <Scene
                    key="AllowableLossRateForm"
                    component={AllowableLossRateForm}
                    title={i18n.t('ro_allowable_loss_rate')}
                    hideNavBar={false}
                />
                <Scene
                    key="TradingCurrency"
                    component={TradingCurrencyForm}
                    title={i18n.t('ro_trading_currency')}
                    hideNavBar={false}
                />
                <Scene
                    key="TradingIssues"
                    component={TradingIssuesForm}
                    title={i18n.t('ro_trading_issues')}
                    hideNavBar={false}
                />
                <Scene
                    key="Notification"
                    component={Notification}
                    title={i18n.t('ro_notification')}
                    hideNavBar={false}
                />
                <Scene
                    key="Language"
                    component={Language}
                    title={i18n.t('ro_language')}
                    hideNavBar={false}
                />
                <Scene
                    key="About"
                    component={About}
                    title={i18n.t('ro_about')}
                    hideNavBar={false}
                />
                <Scene
                    key="InputStatusMessageForm"
                    component={InputStatusMessageForm}
                    title={i18n.t('ro_status_form')}
                    hideNavBar={false}
                />
                <Scene
                    key="InputNameForm"
                    component={InputNameForm}
                    title={i18n.t('ro_name_form')}
                    hideNavBar={false}
                />
                <Scene
                    key="UpdatePassword"
                    component={UpdatePassword}
                    title={i18n.t('ro_update_password')}
                    hideNavBar={false}
                />
                <Scene
                    key="UpdateEmail"
                    component={UpdateEmail}
                    title={i18n.t('ro_update_email')}
                    hideNavBar={false}
                />
                <Scene
                    key="DeleteAccount"
                    component={DeleteAccount}
                    title={i18n.t('ro_delete_account')}
                    hideNavBar={false}
                />
                <Scene
                    key="PrivacyPolicy"
                    component={Privacypolicy}
                    title={i18n.t('ro_privacy_policy')}
                    hideNavBar={false}
                />
                <Scene
                    key="TermOfService"
                    component={TermOfService}
                    title={i18n.t('ro_term_of_service')}
                    hideNavBar={false}
                />
                <Scene
                    key="HomePage"
                    component={HomePage}
                    title={i18n.t('ro_homepage')}
                    hideNavBar={false}
                />
                <Scene
                    key="StockEntryForm"
                    component={StockEntryForm}
                    title={i18n.t('ro_stock_entry_form')}
                    hideNavBar={false}
                    back={true}
                />
                <Scene
                    key="FXEntryForm"
                    component={FXEntryForm}
                    title={i18n.t('ro_fx_entry_form')}
                    hideNavBar={false}
                    back={true}
                />
                <Scene
                    key="Record"
                    component={Record}
                    title={i18n.t('ro_record')}
                    hideNavBar={false}
                    back={true}
                />

                <Scene
                    key="Search"
                    component={Search}
                    title={i18n.t('ro_search')}
                    hideNavBar={false}
                    back={true}
                />
                <Scene
                    key="InputSearch"
                    component={InputSearch}
                    title={i18n.t('ro_input_search')}
                    hideNavBar={false}
                    back={true}
                />
            </Scene>
        </Router>
    )
}

function mapStateToProps(state) {
    return {
        userStatus: state.userModule.userStatus,
        userPlan: state.userModule.userData.userPlan,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isSignInRequest(value) {
            dispatch(isSignInRequest(value))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme(RouterComponent))