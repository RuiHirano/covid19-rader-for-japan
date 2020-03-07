import React from "react";


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
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Profile, User } from "../../../../types";
import { useUpdateUserInfo } from "../../../../redux/hooks/useUser";
import { ReduxState } from "../../../../redux/module";

// Container
interface ContainerProps {}
const AccountDetailContainer: React.FC<ContainerProps> = props => {
    const {} = props;
    const dispatch = useDispatch();
    const {updateUserInfo, status} = useUpdateUserInfo()
    const user: User = useSelector((state: ReduxState) => state.User);
    
    const handleUpdateProfile = (values: FormikValues) => {
        const profile = values.profile;
        user.Setting.Plan = profile;
        updateUserInfo(user)
    };

    let profile: Profile = user.Profile;

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

    return (
        <Card>
            <Formik
                initialValues={{ profile: profile }}
                onSubmit={values => handleUpdateProfile(values)}
                validationSchema={Yup.object().shape({
                    //name: Yup.string().required("i18n.t('su_required_name')")
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
                                        /*error={
                                            errors.name && touched.name
                                                ? true
                                                : false
                                        }*/
                                        fullWidth
                                        /*helperText={
                                            errors.profile.Name && touched.profile.Name
                                                ? errors.profile.Name
                                                : null
                                        }*/
                                        label="Name"
                                        name="Name"
                                        onChange={event => {
                                            values.profile.Name =
                                                event.target.value;
                                            setFieldValue(
                                                "profile",
                                                values.profile
                                            );
                                        }}
                                        type="text"
                                        value={values.profile.Name}
                                        variant="outlined"
                                        onBlur={handleBlur(values.profile.Name)}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        /*helperText={
                                            "please specify the Status Message"
                                        }*/
                                        label="Status"
                                        name="Status"
                                        onChange={event => {
                                            values.profile.Message =
                                                event.target.value;
                                            setFieldValue(
                                                "profile",
                                                values.profile
                                            );
                                        }}
                                        type="text"
                                        value={values.profile.Message}
                                        variant="outlined"
                                        onBlur={handleBlur(
                                            values.profile.Message
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
    root: {}
}));
