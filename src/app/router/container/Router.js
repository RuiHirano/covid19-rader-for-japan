import { connect } from 'react-redux'
import Router from '../index'
import { signOutRequest } from '../../../redux/saga/Sign'

function mapStateToProps(state) {
    return {
        userStatus: state.userModule.userStatus,
        userPlan: state.userModule.userPlan,
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
)(Router)
