import React from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Alert,
    Image,
} from 'react-native'
import { Button, Header, ListItem, Divider } from 'react-native-elements'
import { Actions, ActionConst } from 'react-native-router-flux'
import { signOutRequest } from '../../../redux/saga/Sign'
import i18n from './../../i18n/index'
import appColor from '../../theme/color'

const list = {
    settings: {
        name: i18n.t('dr_settings'),
        iconName: 'settings',
        type: 'material',
    },
    help: {
        name: i18n.t('dr_help'),
        iconName: 'help',
        type: 'material',
    },
    inquiry: {
        name: i18n.t('dr_inquiry'),
        iconName: 'email',
        type: 'material',
    },
    information: {
        name: i18n.t('dr_information'),
        iconName: 'megaphone',
        type: 'entypo',
    },
    about: {
        name: i18n.t('dr_about'),
        iconName: 'information',
        type: 'material-community',
    },
    sign: {
        name: i18n.t('dr_sign_out'),
        iconName: 'sign-out',
        type: 'font-awesome',
    },
}

class Drawer extends React.Component {
    constructor(props) {
        super(props)
        this.signOut = this.signOut.bind(this)
    }

    signOut() {
        Alert.alert(
            i18n.t('dr_sign_out_alart_title'),
            '',
            [
                {
                    text: i18n.t('dr_cancel'),
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: i18n.t('dr_ok'),
                    onPress: () => {
                        this.props.signOutRequest()
                        //Actions.SignIn({ type: ActionConst.RESET })
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        )
    }

    componentDidUpdate(prevProps, prevState){
        const prevIsLoading = prevProps.appState.isLoading
        const {isLoading, loadingStatus, error, errorMessage} = this.props.appState
        if (prevIsLoading == true && isLoading == false) { 
            if (loadingStatus === "SIGN_OUT"){
                if(error){
                    console.log("error signout")
                }else{
                    Actions.SignIn({ type: ActionConst.RESET })
                }
            }
        }
    }

    checkPlan() {
        switch (this.props.userPlan) {
            case 'FREE':
                return i18n.t('dr_free_plan')
            case 'STANDARD':
                return i18n.t('dr_standard_plan')
            case 'PREMIUM':
                return i18n.t('dr_premium_plan')
        }
    }

    render() {
        const { userName, userIcon } = this.props
        return (
            <View>
                <Header
                    centerComponent={{
                        text: i18n.t('dr_menu'),
                        style: { color: appColor.on_primary },
                    }}
                    containerStyle={{ backgroundColor: appColor.primary }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                />
                {/*userIcon === '' ? 

						<ListItem
							key='avator'
							leftIcon={{ name: 'account-circle' }}
							title={userName}
							subtitle={this.checkPlan()}
							style={{paddingTop: 10, paddingBottom: 10}}
							onPress={Actions.Profile}
						/>:
						
						<ListItem
						key='avator'
						leftAvatar={{ source: { uri: userIcon} }}
						title={userName}
						subtitle={this.checkPlan()}
						style={{paddingTop: 10, paddingBottom: 10}}
						onPress={Actions.Profile}
     />*/}
     {userIcon === ''?
                <ListItem
                    key="avator"
                    //leftAvatar={{ source: { uri: userIcon } }}
                    leftIcon={{ name: 'user-circle-o', type: 'font-awesome',}}
                    title={userName}
                    subtitle={this.checkPlan()}
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                    onPress={Actions.Profile}
                />:
                <ListItem
                key="avator"
                leftAvatar={{ source: { uri: userIcon } }}
                //leftIcon={{ name: 'user-circle-o', type: 'font-awesome',}}
                title={userName}
                subtitle={this.checkPlan()}
                style={{ paddingTop: 10, paddingBottom: 10 }}
                onPress={Actions.Profile}
            />}

                <Divider />

                <ListItem
                    key="settings"
                    leftIcon={{
                        name: list.settings.iconName,
                        type: list.settings.type,
                    }}
                    title={list.settings.name}
                    onPress={Actions.Settings}
                />
                <ListItem
                    key="help"
                    leftIcon={{
                        name: list.help.iconName,
                        type: list.help.type,
                    }}
                    title={list.help.name}
                    onPress={Actions.Help}
                />
                <ListItem
                    key="inquiry"
                    leftIcon={{
                        name: list.inquiry.iconName,
                        type: list.inquiry.type,
                    }}
                    title={list.inquiry.name}
                    onPress={Actions.Inquiry}
                />
                <ListItem
                    key="information"
                    leftIcon={{
                        name: list.information.iconName,
                        type: list.information.type,
                    }}
                    title={list.information.name}
                    //badge={{ value: 3, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                    onPress={Actions.Information}
                    //subtitle={l.subtitle}
                />
                <ListItem
                    key="about"
                    leftIcon={{
                        name: list.about.iconName,
                        type: list.about.type,
                    }}
                    title={list.about.name}
                    onPress={Actions.About}
                />
                <ListItem
                    key="sign"
                    leftIcon={{
                        name: list.sign.iconName,
                        type: list.sign.type,
                    }}
                    title={list.sign.name}
                    onPress={this.signOut}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        userStatus: state.userModule.userStatus,
        userName: state.userModule.userData.userName,
        userPlan: state.userModule.userData.userPlan,
        userIcon: state.userModule.userData.icon,
		appState: state.appModule,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOutRequest(value) {
            dispatch(signOutRequest(value))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)
