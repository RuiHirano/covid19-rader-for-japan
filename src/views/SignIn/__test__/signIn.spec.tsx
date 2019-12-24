import * as React from "react";
import renderer from "react-test-renderer";
import { configure, shallow, mount } from "enzyme";
import SignIn from "../SignIn";
import SignInContainer from "../SignInContainer";
import {
    cleanup,
    fireEvent,
    getByLabelText,
    getByTestId,
    act,
    render
} from "@testing-library/react";
import {
    BackButton,
    EmailField,
    PasswordField,
    ImageField,
    SignInForm,
    SocialSignIn,
    SubmitButton,
    Title,
    ToSignUp
} from "../components";
import {
    FormikErrors,
    FormikValues,
    FormikTouched,
    FormikHandlers,
    Formik
} from "formik";
import { Route, Router } from "react-router";
import { createMemoryHistory } from "history";

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

describe("スクリーンショットテスト", () => {
    const handleSignIn = jest.fn();
    const handleBack = jest.fn();
    const handleSubmit = jest.fn();

    const props: Props = {
        errors: {},
        touched: {},
        values: {
            email: "",
            password: ""
        },
        handleChange: jest.fn(),
        handleBlur: jest.fn()
    };

    it("Snapshot of <SignIn />", () => {
        const signIn = shallow(
            <SignIn handleSignIn={handleSignIn} handleBack={handleBack} />
        );
        expect(signIn).toMatchSnapshot();
    });

    it("Snapshot of <SignInContainer />", () => {
        const signInContainer = shallow(<SignInContainer />);
        expect(signInContainer).toMatchSnapshot();
    });

    it("Snapshot of <BackButton />", () => {
        const backButton = shallow(<BackButton handleBack={handleBack} />);
        expect(backButton).toMatchSnapshot();
    });

    it("Snapshot of <EmailField />", () => {
        const emailField = shallow(<EmailField {...props} />);
        expect(emailField).toMatchSnapshot();
    });

    it("Snapshot of <PasswordField />", () => {
        const passwordField = shallow(<PasswordField {...props} />);
        expect(passwordField).toMatchSnapshot();
    });

    it("Snapshot of <ImageField />", () => {
        const imageField = shallow(<ImageField {...props} />);
        expect(imageField).toMatchSnapshot();
    });

    it("Snapshot of <SignInForm />", () => {
        const signInForm = shallow(<SignInForm handleSignIn={handleSignIn} />);
        expect(signInForm).toMatchSnapshot();
    });

    it("Snapshot of <SocialSignIn />", () => {
        const socialSignIn = shallow(<SocialSignIn />);
        expect(socialSignIn).toMatchSnapshot();
    });

    it("Snapshot of <SubmitButton />", () => {
        const submitButton = shallow(
            <SubmitButton handleSubmit={handleSubmit} />
        );
        expect(submitButton).toMatchSnapshot();
    });

    it("Snapshot of <Title />", () => {
        const title = shallow(<Title />);
        expect(title).toMatchSnapshot();
    });

    it("Snapshot of <ToSignUp />", () => {
        const toSignUp = shallow(<ToSignUp />);
        expect(toSignUp).toMatchSnapshot();
    });
});

describe("機能テスト", () => {
    const props: Props = {
        errors: {},
        touched: {},
        values: {
            email: "",
            password: ""
        },
        handleChange: jest.fn(),
        handleBlur: jest.fn()
    };

    it.todo("SignUpを押すとSignUp画面へ遷移");
    it.todo("Emailが正しい表記でない場合、エラーメッセージが表示される");
    it.todo("Emailが空白の場合、空白エラーメッセージが表示される");
    it.todo(
        "Pasdswordが正しい表記(a-z0-9)でない場合、エラーメッセージが表示される"
    );
    it.todo("Pasdswordが8文字以下場合、エラーメッセージが表示される");

    it("Passwordが空白の場合、空白エラーメッセージが表示される", () => {
        const handleSignIn = jest.fn();
        const wrapper = shallow(<SignInForm handleSignIn={handleSignIn} />);
        //const wrapper = shallow(<PasswordField {...props} />);
        const passwordField = wrapper
            .find(Formik)
            .dive()
            .find(PasswordField);
        console.log("test", passwordField.props());
    });

    it("正しい入力でSignUpNowボタンを押すとhandleSignUpに正しい引数が渡される", () => {
        // FIX:
        const values: Props["values"] = {
            email: "test@test.com",
            password: "testtesttest"
        };

        const expectValues: Props["values"] = {
            email: "test@test.com",
            password: "testtesttest"
        };

        const handleSignIn = jest.fn();
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <SignInForm handleSignIn={handleSignIn} />
            </Router>
        );

        const a = getByText("adsf");
        //		wrapper.find(Formik).simulate("change", {
        //            target: { initialValues: { ...values, email: "testtest" } }
        //        });
        //        wrapper.find(Formik).simulate("submit", values);

        expect(handleSignIn.mock.calls).toEqual([[expectValues]]);
    });
    it.todo(
        "正しくない入力でSignUpNowボタンを押すとhandleSignUpに正しい引数が渡されない"
    );
    it.todo("BackButtonを押すとhandleBackButtonが呼ばれる");
    it.todo("LoginFacebookボタンを押すとfacebook関数が呼ばれる");
    it.todo("LoginGoogleボタンを押すとgoogle関数が呼ばれる");
    // state変化
    it.todo("SignInNowを押すとLoading=Trueになりボタンが押せなくなる");
    it.todo("LoadingがTrue->False, StatusがSIGN_INの場合画面遷移する");
});
