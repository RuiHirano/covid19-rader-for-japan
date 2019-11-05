import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { Email } from "./Email";
import { AppState, ActionTypes } from "../../../../redux/configureStore";

function mapStateToProps(state: AppState) {
    const content = state.User.Setting.Content;
    return {
        initialInvestment: content.InitialInvestment,
        allowableLossRate: content.AllowableLossRate,
        bankruptcyReductionRate: content.BankruptcyReductionRate,
        currencies: content.Currencies,
        stocks: content.Stocks
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        //onClock: () => dispatch()
    };
}

const EmailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Email);

export default EmailContainer;
