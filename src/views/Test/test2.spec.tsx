import * as React from "react";
import {
    cleanup,
    fireEvent,
    getByLabelText,
    getByTestId
} from "@testing-library/react";
import { configure, shallow, mount } from "enzyme";
import { render } from "@testing-library/react";
import Test from "./Test";
import { Button, TextField, Typography } from "@material-ui/core";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

describe("スクリーンショットテスト", () => {
    it("Snapshot of <Test />", () => {
        const { asFragment } = render(<Test />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("機能テスト", () => {
    let shallow: any;
    let mount: any;
    beforeEach(() => {
        shallow = createShallow();
        mount = createMount();
    });

    it("ButtonをおすとCountが増える", () => {
        const wrapper = shallow(<Test />);
        const button = wrapper.find(Button);
        const text = wrapper.find(Typography);
        console.log("wrapper ", wrapper.debug());
        console.log("button ", button.debug());
        console.log("text ", text.debug());
        expect(text.text()).toBe("0");
        button
            .at(0)
            .props()
            .onClick();
        expect(text.text()).toBe("1");
    });

    it("TextField", () => {
        let wrapper: any;
        act(() => {
            wrapper = shallow(<Test />);
        });
        let textField = wrapper.find(TextField);
        console.log("debug", textField.debug());

        textField.simulate("change", { target: { value: "test" } });
        /*textField
            .at(0)
            .props()
            .onChange({ target: { value: "test" } });*/
        wrapper.update();
        console.log("debug2", textField.debug());
        expect(textField.text()).toBe("test");
    });
});
