import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { AccountDetails } from "./AccountDetails";
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

const AccountDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountDetails);

export default AccountDetailsContainer;
