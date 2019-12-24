import * as React from "react";
import renderer from "react-test-renderer";
import { configure, shallow, mount } from "enzyme";
import { Button, TextField, Input } from "@material-ui/core";
import CalendarView from "../Calendar";
import { Details } from "../components";
import DetailCard from "../components/Details/DetailCard";
import { Statistics } from "../../Report/components";
import { items } from "./itemData";
import Calendar from "react-calendar/dist/entry.nostyle";
import moment from "moment";
import { Item } from "../../../types";

describe("スクリーンショットテスト", () => {
    it("Snapshot of <DetailCard />", () => {
        const item: Item = items[0];
        const detailCard = shallow(
            <DetailCard item={item} toEdit={jest.fn()} toDetail={jest.fn()} />
        );
        expect(detailCard).toMatchSnapshot();
    });
    it("Snapshot of <Details />", () => {
        const details = shallow(<Details date={moment()} items={items} />);
        expect(details).toMatchSnapshot();
    });
    it("Snapshot of <Statistics />", () => {
        const statistics = shallow(<Statistics />);
        expect(statistics).toMatchSnapshot();
    });
});

describe("機能テスト", () => {
    //const calendarView = shallow(<CalendarView items={items} />);
    it("カレンダー内のセルを押すとトレードリストが変わる", () => {});
    it("カレンダーの日付が初期値では現在の日付となる", () => {
        //calendarView.instance().setDate(new Date());
    });
    it.todo(
        "モックデータがカレンダーへ反映される"
    ); /*, () => {
        const wrapper = shallow(<CalendarView items={items} />);
        console.log(wrapper.instance().getTileContent());

        expect("calenderText").toEqual("expectedValue");
    });*/
    it.todo("カレンダーの次へ、前へを押すと統計が変化する");
    it.todo("カレンダーの次へ、前へを押すとリストが変化する");
    it.todo("リストの編集ボタンを押すと編集画面へ遷移する");
    it.todo("リストのリストボタンを押すと詳細画面へ遷移する");
});
