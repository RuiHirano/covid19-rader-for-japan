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

const NameTextField = styled(TextField)({
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

const NameField: React.FC<Props> = props => {
    const { errors, touched, values, handleChange, handleBlur } = props;

    return (
        <NameTextField
            error={errors.name && touched.name ? true : false}
            fullWidth
            helperText={errors.name && touched.name ? errors.name : null}
            label="Name"
            name="Name"
            onChange={handleChange("name")}
            type="name"
            value={values.name}
            variant="outlined"
            onBlur={handleBlur("name")}
        />
    );
};

export default NameField;
