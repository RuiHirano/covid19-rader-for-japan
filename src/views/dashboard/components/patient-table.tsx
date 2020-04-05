import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

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


const mockItems: any[] = [
    { "都道府県": "東京都", "新規": 1240, "感染者数": 30, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "愛知県", "新規": 210, "感染者数": 230, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "大阪", "新規": 10, "感染者数": 20, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "北海道", "新規": 420, "感染者数": 10, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "東京都", "新規": 1240, "感染者数": 30, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "愛知県", "新規": 210, "感染者数": 230, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "大阪", "新規": 10, "感染者数": 20, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "北海道", "新規": 420, "感染者数": 10, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "東京都", "新規": 1240, "感染者数": 30, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "愛知県", "新規": 210, "感染者数": 230, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "大阪", "新規": 10, "感染者数": 20, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "北海道", "新規": 420, "感染者数": 10, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "東京都", "新規": 1240, "感染者数": 30, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "愛知県", "新規": 210, "感染者数": 230, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "大阪", "新規": 10, "感染者数": 20, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "北海道", "新規": 420, "感染者数": 10, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "東京都", "新規": 1240, "感染者数": 30, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "愛知県", "新規": 210, "感染者数": 230, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "大阪", "新規": 10, "感染者数": 20, "新規感染": 0, "新規退院": 0, "死亡": 0 },
    { "都道府県": "北海道", "新規": 420, "感染者数": 10, "新規感染": 0, "新規退院": 0, "死亡": 0 },
]

const PatientTable: React.FC<Props> = props => {

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
                data={mockItems}
                columns={columns}
                options={options}
            />
        </div>
    )
};

export default PatientTable;
