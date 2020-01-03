import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";
import { Link, Checkbox, Typography } from "@material-ui/core";
import { FormikHelpers, FormikValues } from "formik";

const PolicyCheckbox = styled(Checkbox)({
    marginLeft: "-14px"
});

const PolicyConteiner = styled("div")({
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center"
});

interface Props {
    setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
    values: {
        email: string;
        password: string;
        name: string;
        passwordConfirm: string;
        policy: boolean;
    };
}

const PolicyField: React.FC<Props> = props => {
    const { setFieldValue, values } = props;

    return (
        <PolicyConteiner>
            <PolicyCheckbox
                checked={values.policy || false}
                color="primary"
                name="policy"
                onChange={() => setFieldValue("policy", !values.policy)}
            />
            <Typography color="textSecondary" variant="body1">
                I have read the{" "}
                <Link
                    color="primary"
                    component={RouterLink}
                    to="#"
                    underline="always"
                    variant="h6"
                >
                    Terms and Conditions
                </Link>
            </Typography>
        </PolicyConteiner>
    );
};

export default PolicyField;
