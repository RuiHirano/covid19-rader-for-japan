import React from "react";
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
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { withRouter, match } from "react-router";
import * as H from "history";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const PlanContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    /*const dispatch = useDispatch();

    const { isLoading, isFinishLoading } = useLoading(
        LoadingState.DELETE_ACCOUNT
    );
    useEffect(() => {
        if (isFinishLoading) {
            history.push("/home");
        }
    }, [isLoading]);*/

    return <Plan />;
};

export default withRouter(PlanContainer);


// presentational
const Plan: React.FC = props => {
    //const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{
                    plan: "free"
                }}
                onSubmit={values => console.log("debug6 ", values)}
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
                                                    values.plan == "free" ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "plan",
                                                        "free"
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
                                                    values.plan == "standard" ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "plan",
                                                        "standard"
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
                                                    values.plan == "premium" ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "plan",
                                                        "premium"
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
