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

const PasswordTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

interface Props {
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
    values: {
        email: string;
        password: string;
        name: string;
        passwordConfirm: string;
        policy: boolean;
    };
    handleChange: FormikHandlers["handleChange"];
    handleBlur: FormikHandlers["handleBlur"];
}

const PasswordField: React.FC<Props> = props => {
    const { errors, touched, values, handleChange, handleBlur } = props;

    return (
        <PasswordTextField
            error={errors.password && touched.password ? true : false}
            fullWidth
            helperText={errors.password && touched.password ? errors.password : null}
            label="Password"
            name="Password"
            onChange={handleChange("password")}
            type="password"
            value={values.password}
            variant="outlined"
            onBlur={handleBlur("password")}
        />
    );
};

export default PasswordField;
