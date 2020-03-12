import React from "react";
import imgPath from "../../app/assets/app_icon.png";
import SignLayout from "../../layouts/sign";
import SignUpForm from "./molecules/singnup-form";

interface Props {
}

const SignUp: React.FC<Props> = props => {

    return (
        <SignLayout imgPath={imgPath}>
            <SignUpForm/>
        </SignLayout>
    );
};

export default SignUp;
