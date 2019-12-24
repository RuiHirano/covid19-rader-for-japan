import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
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
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../../../../redux/saga/User/userSaga";
import { LoadingState, Profile } from "../../../../types";
import { useLoading } from "../../../../common/hooks/useLoading";
import { AppState } from "../../../../redux/module/rootModule";

// Container
interface ContainerProps {}
const AccountDetailContainer: React.FC<ContainerProps> = props => {
    const {} = props;
    const dispatch = useDispatch();
    let profile = useSelector((state: AppState) => state.User.Profile);
    const handleUpdateProfile = (values: FormikValues) => {
        profile.Name = values.name;
        profile.Message = values.status;

        dispatch(userActions.updateProfileAction({ profile: profile }));
    };

    const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_PROFILE
    );
    useEffect(() => {
        if (isFinishLoading) {
            //history.push("/dashboard");
        }
    }, [isLoading]);

    return (
        <AccountDetail
            handleUpdateProfile={handleUpdateProfile}
            profile={profile}
        />
    );
};

export default withRouter(AccountDetailContainer);

interface Props {
    handleUpdateProfile: (values: FormikValues) => void;
    profile: Profile;
}

export const AccountDetail: React.FC<Props> = props => {
    const { handleUpdateProfile, profile } = props;
    console.log("profile: ", profile.Name);

    return (
        <Card>
            <Formik
                initialValues={{ status: profile.Message, name: profile.Name }}
                onSubmit={values => handleUpdateProfile(values)}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required("i18n.t('su_required_name')")
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
                            title="Profile"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        error={
                                            errors.name && touched.name
                                                ? true
                                                : false
                                        }
                                        fullWidth
                                        helperText={
                                            errors.name && touched.name
                                                ? errors.name
                                                : null
                                        }
                                        label="Name"
                                        name="Name"
                                        onChange={handleChange("name")}
                                        type="text"
                                        value={values.name}
                                        variant="outlined"
                                        onBlur={handleBlur("name")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        helperText={
                                            "please specify the Status Message"
                                        }
                                        label="Status"
                                        name="Status"
                                        onChange={handleChange("status")}
                                        type="text"
                                        value={values.status}
                                        variant="outlined"
                                        onBlur={handleBlur("status")}
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
    root: {}
}));
