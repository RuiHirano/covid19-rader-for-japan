import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Content as ContentTypes } from "../../../../types/domainTypes";
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
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    textField: {
        marginTop: theme.spacing(2)
    }
}));

interface Props {
    initialInvestment: ContentTypes["InitialInvestment"];
    allowableLossRate: ContentTypes["AllowableLossRate"];
    bankruptcyReductionRate: ContentTypes["BankruptcyReductionRate"];
    currencies: ContentTypes["Currencies"];
    stocks: ContentTypes["Stocks"];
}

export const Content: React.FC<Props> = props => {
    //const { className, ...rest } = props;
    const {
        initialInvestment,
        allowableLossRate,
        bankruptcyReductionRate,
        currencies,
        stocks
    } = props;
    const classes = useStyles();

    const [values, setValues] = useState({
        name: "Rui Hirano",
        email: "rui@hirano.com",
        phone: "",
        state: "Tokyo",
        country: "Japan"
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

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

//export default Content;
