import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
    Typography,
    Button
} from "@material-ui/core";
import { Formik, yupToFormErrors, FormikValues } from "formik";
import * as Yup from "yup";
import { withRouter, match } from "react-router";
import * as H from "history";
import { AppState } from "../../../../redux/module/rootModule";
import { useSelector, useDispatch } from "react-redux";
import { LoadingState, Plan as PlanType, User } from "../../../../types";
import { useLoading } from "../../../../common/hooks/useLoading";
import { userActions } from "../../../../redux/saga/User/userSaga";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const PlanContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
	const dispatch = useDispatch();
	const handleUpdatePlan = (values: FormikValues) => {
		const plan = values.plan
		user.Setting.Plan = plan
        dispatch(
            userActions.updateUserAction({ user: user })
        );
    };

    const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_USER
    );
    useEffect(() => {
        if (isFinishLoading) {
            //history.push("/home");
        }
	}, [isLoading]);
	
	const user: User = useSelector(
        (state: AppState) => state.User
	);
	const plan: PlanType = user.Setting.Plan

    return <Plan plan={plan} handleUpdatePlan={handleUpdatePlan}/>;
};

export default withRouter(PlanContainer);

export interface Props{
	plan: PlanType;
	handleUpdatePlan: (values: FormikValues) => void;
}

// presentational
const Plan: React.FC<Props> = props => {
    const { plan, handleUpdatePlan } = props;

    const classes = useStyles();

    return (
        <Card
        >
            <Formik
                initialValues={{
                    plan: plan
                }}
                onSubmit={values => handleUpdatePlan(values)}
                validationSchema={Yup.object().shape({})}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <div>
                        <CardHeader
                            subheader="Manage the notifications"
                            title="Plan"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={6} wrap="wrap">
                                <Grid
                                    className={classes.item}
                                    item
                                    md={4}
                                    sm={6}
                                    xs={12}
                                >
                                    <Typography gutterBottom variant="h6">
                                        Plan
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.plan === PlanType.FREE ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "plan",
                                                        PlanType.FREE
                                                    )
                                                }
                                            />
                                        }
                                        label="Free"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.plan === PlanType.STANDARD ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "plan",
                                                        PlanType.STANDARD
                                                    )
                                                }
                                            />
                                        }
                                        label="Standard"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.plan === PlanType.PREMIUM ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "plan",
                                                        PlanType.PREMIUM
                                                    )
                                                }
                                            />
                                        }
                                        label="Premium"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => handleSubmit()}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

export const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: "flex",
        flexDirection: "column"
    }
}));
//export default Language;
