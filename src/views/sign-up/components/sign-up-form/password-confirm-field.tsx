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

const PasswordConfirmTextField = styled(TextField)({
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

const PasswordConfirmField: React.FC<Props> = props => {
    const { errors, touched, values, handleChange, handleBlur } = props;

    return (
        <PasswordConfirmTextField
            error={
                errors.passwordConfirm && touched.passwordConfirm ? true : false
            }
            fullWidth
            helperText={
                errors.passwordConfirm && touched.passwordConfirm
                    ? errors.passwordConfirm
                    : null
            }
            label="Confirm Password"
            name="Confirm Password"
            onChange={handleChange("passwordConfirm")}
            type="password"
            value={values.passwordConfirm}
            variant="outlined"
            onBlur={handleBlur("passwordConfirm")}
        />
    );
};

export default PasswordConfirmField;
