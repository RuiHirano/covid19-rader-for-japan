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
    TextField,
    Typography,
    Chip
} from "@material-ui/core";
import { Formik, yupToFormErrors, FormikValues } from "formik";
import * as Yup from "yup";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserInfo } from "../../../../redux/hooks/useUser";
import { ReduxState } from "../../../../redux/module";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const ContentContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const { updateUserInfo, status } = useUpdateUserInfo()
    const handleUpdateContent = (values: FormikValues) => {
        const content = values.content;
        user.Setting.Content = content;
        updateUserInfo(user)
    };

    const user: User = useSelector((state: ReduxState) => state.User);
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


    interface ChipData {
        key: number;
        label: string;
    }

    const [chipData, setChipData] = React.useState<ChipData[]>([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);


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
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Typography>Currencies</Typography>
                                        {chipData.map(data => {

                                            return (
                                                <Chip
                                                    key={data.key}
                                                    label={data.label}
                                                    style={{ margin: 3 }}
                                                    onDelete={() => console.log("delete: ", data.label)}
                                                />
                                            );
                                        })}
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Typography>Stocks</Typography>
                                        {chipData.map(data => {

                                            return (
                                                <Chip
                                                    key={data.key}
                                                    label={data.label}
                                                    style={{ margin: 3 }}
                                                    onDelete={() => console.log("delete: ", data.label)}
                                                />
                                            );
                                        })}
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Typography>SearchTags</Typography>
                                        {chipData.map(data => {

                                            return (
                                                <Chip
                                                    key={data.key}
                                                    label={data.label}
                                                    style={{ margin: 3 }}
                                                    onDelete={() => console.log("delete: ", data.label)}
                                                />
                                            );
                                        })}
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
