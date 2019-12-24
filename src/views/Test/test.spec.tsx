import * as React from "react";
import {
    cleanup,
    fireEvent,
    getByLabelText,
    getByTestId,
    act,
    render
} from "@testing-library/react";
import Test from "./Test";

afterEach(cleanup);

describe("スクリーンショットテスト", () => {
    it("Snapshot of <Test />", () => {
        const { asFragment } = render(<Test />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("機能テスト", () => {
    it("ButtonをおすとCountが増える", () => {
        const { getByText } = render(<Test />);
        const button = getByText("Button");
        const text = getByText("0");
        expect(text.textContent).toBe("0");
        fireEvent.click(button);
        expect(text.textContent).toBe("1");
    });

    it("TextField", () => {
        const { getByText } = render(<Test />);
        const container = document.body;
        const textField = getByTestId(container, "standard");
        expect(textField.textContent).toBe("");
        textField.innerHTML = "test";
        fireEvent.input(textField);
        expect(textField.textContent).toBe("test");
    });
});
