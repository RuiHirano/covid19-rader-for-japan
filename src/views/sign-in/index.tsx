import React from "react";
import { withRouter } from "react-router-dom";
import imgPath from "../../app/assets/app_icon.png";
import SignLayout from "../../layouts/sign";
import SignInForm from "./molecules/singnin-form";


const SignIn: React.FC = props => {

    return (
        <SignLayout imgPath={imgPath}>
            <SignInForm/>
        </SignLayout>

    );
};

export default SignIn;
