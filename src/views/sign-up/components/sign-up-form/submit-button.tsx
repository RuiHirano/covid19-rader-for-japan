import React from "react";
import { Button } from "@material-ui/core";
import { FormikHandlers } from "formik";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";

const SignUpButton = styled(Button)({
    margin: theme.spacing(2, 0)
});

interface Props {
    handleSubmit: FormikHandlers["handleSubmit"];
    values: {
        email: string;
        password: string;
        name: string;
        passwordConfirm: string;
        policy: boolean;
    };
}

const SubmitButton: React.FC<Props> = props => {
    const { handleSubmit, values } = props;

    return (
        <SignUpButton
            color="primary"
            disabled={!values.policy}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => handleSubmit()}
        >
            Sign up now
        </SignUpButton>
    );
};

export default SubmitButton;
