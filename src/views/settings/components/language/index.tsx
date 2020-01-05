import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
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
import { useDispatch, useSelector } from "react-redux";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useLoading } from "../../../../common/hooks/useLoading";
import {
    LoadingState,
    Language as LanguageType,
    User
} from "../../../../types";
import { userActions } from "../../../../redux/saga/user";
import { AppState } from "../../../../redux/module";

export const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: "flex",
        flexDirection: "column"
    }
}));

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const LanguageContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const handleUpdateLanguage = (values: FormikValues) => {
        const language = values.language;
        user.Setting.Language = language;
        dispatch(userActions.updateUserAction({ user: user,
			loadingStatus: LoadingState.UPDATE_LANGUAGE}));
    };

    const callback = (nowLoading: boolean, finishLoading: boolean) => {
        if (nowLoading) {
            console.log("loading now");
        } else if (finishLoading) {
            console.log("finish loading");
            //history.push("/home");
        }
    };

    useLoading(LoadingState.UPDATE_LANGUAGE, callback);

    const user: User = useSelector((state: AppState) => state.User);
    const language: LanguageType = user.Setting.Language;

    return (
        <Language
            handleUpdateLanguage={handleUpdateLanguage}
            language={language}
        />
    );
};

export default withRouter(LanguageContainer);

// Presentational
interface Props {
    handleUpdateLanguage: (values: FormikValues) => void;
    language: LanguageType;
}

export const Language: React.FC<Props> = props => {
    const { handleUpdateLanguage, language } = props;

    const classes = useStyles();

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{
                    language: language
                }}
                onSubmit={values => handleUpdateLanguage(values)}
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
                            title="Language"
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
                                        Language
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.language ==
                                                        LanguageType.en || false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "language",
                                                        LanguageType.en
                                                    )
                                                }
                                            />
                                        }
                                        label="English"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.language ==
                                                        LanguageType.ja || false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "language",
                                                        LanguageType.ja
                                                    )
                                                }
                                            />
                                        }
                                        label="Japanese"
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

//export default Language;
