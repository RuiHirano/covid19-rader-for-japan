import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { StatData } from "../../../types";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/module";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: "flex-end"
    }
}));

interface Props {
}

/* 日付別の感染者数合計を計算 */
type PrefData = { [s: string]: number | string }
// return: [{ pref: '北海道', 'value': 12 },{ pref: '東京都', 'value': 22 },{ pref: '愛知県', 'value': 2 },...]
const createData = (statsData: StatData[]) => {
    let result: PrefData[] = []

    if (statsData.length > 0) {
        const lastDate = statsData[statsData.length - 1].Date

        statsData.forEach((statData) => {
            if (statData.Date === lastDate) {
                const dateData: PrefData = {
                    "都道府県": statData.Prefecture,
                    "感染者数": statData.TotalCases,
                    "新規感染": statData.Cases,
                    "新規退院": statData.Discharges,
                    "死亡": statData.TotalDeaths,
                }
                result.push(dateData)
            }
        })
    }
    console.log("result2 ", result)
    return result
}

const PatientTable: React.FC<Props> = props => {
    const statsData = useSelector((state: ReduxState) => state.Data.StatsData)
    const data = createData(statsData)
    const columns = ["都道府県", "感染者数", "新規感染", "新規退院", "死亡"];

    const options: MUIDataTableOptions = {
        elevation: 0,
        filterType: 'checkbox',
        selectableRows: 'single',
        responsive: "scrollMaxHeight",
        print: false,
        download: false,
        rowsPerPage: 47,
        customFooter: () => (<div />),
        customToolbarSelect: () => (
            <div>
            </div>
        ),
    };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <MUIDataTable
                title={"罹患者テーブル"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
};

export default PatientTable;
