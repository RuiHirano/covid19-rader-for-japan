import React from "react";
import { withRouter } from "react-router-dom";
import imgPath from "../../app/assets/app_icon.png";
import SignLayout from "../../layouts/sign";
import SignInForm from "./templetes/signin-form";
import { Home as HomeLayout } from "../../layouts";


const SignIn: React.FC = props => {

    return (
        <HomeLayout>
            <SignLayout imgPath={imgPath}>
                <SignInForm />
            </SignLayout>
        </HomeLayout>
    );
};

export default SignIn;
