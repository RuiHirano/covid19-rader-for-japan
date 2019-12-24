import * as React from "react";
import renderer from "react-test-renderer";
import { configure, shallow, mount } from "enzyme";
import { Calculator } from "./../Calculator";
import { items, novemberItems, novemberStatistics } from "./itemData";
import { PeriodType } from "../../../types";
import moment from "moment";
import { CalendarCalculator } from "../CalendarStats";

describe("機能テスト", () => {
    const cal = new CalendarCalculator(
        items,
        PeriodType.MONTH,
        moment([2019, 10, 15]),
        0
    );
    it("特定の範囲(11月)のTradeDataを取得する", () => {
        expect(cal.getPeriodItems()).toEqual(novemberItems);
    });
    it("特定の範囲(11月)の統計データを取得する", () => {
        expect(cal.getStatistics()).toEqual(novemberStatistics);
    });
});
