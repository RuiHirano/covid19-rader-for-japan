import React from "react";
import imgPath from "../../app/assets/app_icon.png";
import SignLayout from "../../layouts/sign";
import SignUpForm from "./templetes/signup-form";
import { Home as HomeLayout } from "../../layouts";

interface Props {
}

const SignUp: React.FC<Props> = props => {

    return (
        <HomeLayout>
            <SignLayout imgPath={imgPath}>
                <SignUpForm />
            </SignLayout>
        </HomeLayout>
    );
};

export default SignUp;
