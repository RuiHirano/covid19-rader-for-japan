import React from "react";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";
import { TextField } from "@material-ui/core";
import {
    FormikErrors,
    FormikValues,
    FormikTouched,
    FormikHandlers
} from "formik";

const EmailTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

interface Props {
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
    values: {
        email: string;
        password: string;
    };
    handleChange: FormikHandlers["handleChange"];
    handleBlur: FormikHandlers["handleBlur"];
}

const EmailField: React.FC<Props> = props => {
    const { errors, touched, values, handleChange, handleBlur } = props;

    return (
        <EmailTextField
            error={errors.email && touched.email ? true : false}
            fullWidth
            helperText={errors.email && touched.email ? errors.email : null}
            label="Email"
            name="Email"
            onChange={handleChange("email")}
            type="text"
            value={values.email}
            variant="outlined"
            onBlur={handleBlur("email")}
        />
    );
};

export default EmailField;
