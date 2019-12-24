import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Content as ContentTypes,
    LoadingState,
    User
} from "../../../../types/types";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from "@material-ui/core";
import { Formik, yupToFormErrors, FormikValues } from "formik";
import * as Yup from "yup";
import { withRouter, match } from "react-router";
import * as H from "history";
import { userActions } from "../../../../redux/saga/User/userSaga";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../../../common/hooks/useLoading";
import { AppState } from "../../../../redux/module/rootModule";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const ContentContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const content = useSelector(
        (state: AppState) => state.User.Setting.Content
    );
    const handleUpdateContent = (values: FormikValues) => {
        dispatch(userActions.updateContentAction({ content: content }));
    };

    const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_PASSWORD
    );
    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return (
        <Content handleUpdateContent={handleUpdateContent} content={content} />
    );
};

export default withRouter(ContentContainer);

// Presentational

interface Props {
    handleUpdateContent: (values: FormikValues) => void;
    content: ContentTypes;
}

export const Content: React.FC<Props> = props => {
    const {
        InitialInvestment: initialInvestment,
        AllowableLossRate: allowableLossRate,
        BankruptcyReductionRate: bankruptcyReductionRate,
        Currencies: currencies,
        Stocks: stocks
    } = props.content;
    const classes = useStyles();

    const states = [
        {
            value: "alabama",
            label: "Alabama"
        },
        {
            value: "new-york",
            label: "New York"
        },
        {
            value: "san-francisco",
            label: "San Francisco"
        }
    ];

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{
                    initialInvestment: 0,
                    allowableLossRate: 0,
                    bankruptReductionRate: 0
                }}
                onSubmit={values => console.log("debug6 ", values)}
                validationSchema={Yup.object().shape({
                    initialInvestment: Yup.number().required(
                        "i18n.t('su_required_name')"
                    ),
                    allowableLossRate: Yup.number().required(
                        "i18n.t('su_required_name')"
                    ),
                    bankruptReductionRate: Yup.number().required(
                        "i18n.t('su_required_name')"
                    )
                })}
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
                            subheader="The information can be edited"
                            title="Content"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        error={
                                            errors.initialInvestment &&
                                            touched.initialInvestment
                                                ? true
                                                : false
                                        }
                                        fullWidth
                                        helperText={
                                            errors.initialInvestment &&
                                            touched.initialInvestment
                                                ? errors.initialInvestment
                                                : null
                                        }
                                        label="initialInvestment"
                                        name="initialInvestment"
                                        onChange={handleChange(
                                            "initialInvestment"
                                        )}
                                        type="text"
                                        value={values.initialInvestment}
                                        variant="outlined"
                                        onBlur={handleBlur("initialInvestment")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        error={
                                            errors.allowableLossRate &&
                                            touched.allowableLossRate
                                                ? true
                                                : false
                                        }
                                        fullWidth
                                        helperText={
                                            errors.allowableLossRate &&
                                            touched.allowableLossRate
                                                ? errors.allowableLossRate
                                                : null
                                        }
                                        label="allowableLossRate"
                                        name="allowableLossRate"
                                        onChange={handleChange(
                                            "allowableLossRate"
                                        )}
                                        type="text"
                                        value={values.allowableLossRate}
                                        variant="outlined"
                                        onBlur={handleBlur("allowableLossRate")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        error={
                                            errors.bankruptReductionRate &&
                                            touched.bankruptReductionRate
                                                ? true
                                                : false
                                        }
                                        fullWidth
                                        helperText={
                                            errors.bankruptReductionRate &&
                                            touched.bankruptReductionRate
                                                ? errors.bankruptReductionRate
                                                : null
                                        }
                                        label="bankruptReductionRate"
                                        name="bankruptReductionRate"
                                        onChange={handleChange(
                                            "bankruptReductionRate"
                                        )}
                                        type="text"
                                        value={values.bankruptReductionRate}
                                        variant="outlined"
                                        onBlur={handleBlur(
                                            "bankruptReductionRate"
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => handleSubmit()}
                            >
                                Save details
                            </Button>
                        </CardActions>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    textField: {
        marginTop: theme.spacing(2)
    }
}));
