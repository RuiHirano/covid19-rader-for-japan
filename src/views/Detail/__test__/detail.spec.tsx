import * as React from "react";
import renderer from "react-test-renderer";
import { configure, shallow, mount } from "enzyme";
import { DateBar, Content } from "../components";
import { mockItems } from "../../../common/mockData";
import { Item } from "../../../types";
import Detail from "../Detail";
import moment from "moment";

describe("スクリーンショットテスト", () => {
    const items: Item[] = mockItems;
    const item: Item = items[0];

    it("Snapshot of <DateBar/>", () => {
        const dateBar = shallow(
            <DateBar
                date={moment(item.StartDate)}
                toPrev={jest.fn()}
                toNext={jest.fn()}
            />
        );
        expect(dateBar).toMatchSnapshot();
    });

    it("Snapshot of <Detail/>", () => {
        const item: Item = mockItems[0];
        const detail = shallow(<Detail items={items} />);
        expect(detail).toMatchSnapshot();
    });

    it("Snapshot of <Item/>", () => {
        const item: Item = mockItems[0];
        const content = shallow(<Content items={items} />);
        expect(content).toMatchSnapshot();
    });
});

describe("機能テスト", () => {
    it.todo("次へボタンを押すと次のデータが表示される");
    it.todo("モックデータが正しく表示される");
    it.todo("任意の日付の全トレードが表示される");
    it.todo("編集ボタンを押すと編集画面へ遷移する");
});
