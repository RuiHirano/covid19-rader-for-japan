import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Content as ContentTypes, LoadingState, User } from "../../../../types";
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
import { userActions } from "../../../../redux/saga/user";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../../../common/hooks/useLoading";
import { AppState } from "../../../../redux/module";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const ContentContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const handleUpdateContent = (values: FormikValues) => {
        const content = values.content;
        user.Setting.Content = content;
        dispatch(userActions.updateUserAction({ user: user,
			loadingStatus: LoadingState.UPDATE_CONTENT }));
    };

	const callback = (nowLoading: boolean, finishLoading: boolean) => {
        if (nowLoading) {
            console.log("loading now");
        } else if (finishLoading) {
            console.log("finish loading");
            //history.push("/home");
        }
    };

    useLoading(LoadingState.UPDATE_PASSWORD, callback);

    const user: User = useSelector((state: AppState) => state.User);
    const content: ContentTypes = user.Setting.Content;

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
    const { handleUpdateContent, content } = props;
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

    const validationSchema = {
        initialInvestment: Yup.number().required("i18n.t('su_required_name')"),
        allowableLossRate: Yup.number().required("i18n.t('su_required_name')"),
        bankruptReductionRate: Yup.number().required(
            "i18n.t('su_required_name')"
        )
    };

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
                onSubmit={values => handleUpdateContent(values)}
                validationSchema={Yup.object().shape(validationSchema)}
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
