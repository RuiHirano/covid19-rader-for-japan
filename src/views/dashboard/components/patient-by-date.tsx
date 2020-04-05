import React, { useEffect, useState, useRef } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
} from "@material-ui/core";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Bar, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/module";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    chartContainer: {
        height: 400,
        position: "relative"
    },
    actions: {
        justifyContent: "flex-end"
    }
}));

/* 日付別の感染者数合計を計算 */
// return: [{ pref: '北海道', 'value': 12 },{ pref: '東京都', 'value': 22 },{ pref: '愛知県', 'value': 2 },...]
/*const createData = (patients: Patient[], period: Period) => {
    const stats = new StatsCalculator()
    let result: PatientsNumByDate[] = []
    const a = stats.calcPatientsByDate(patients, period)

    // 日付ごとにソート
    const numResult = a.sort(function (pd1: PatientsByDate, pd2: PatientsByDate) {
        if (pd1.date < pd2.date) return -1;
        if (pd1.date > pd2.date) return 1;
        return 0;
    });
    numResult.forEach((data) => {
        result.push({ date: data.date, value: data.patients.length })
    })

    return result
}*/

const mockItems: any[] = [
    { "date": "2/3", "愛知県": 4, "大阪府": 5, "東京都": 12, "北海道": 12 },
    { "date": "2/4", "愛知県": 8, "大阪府": 6, "東京都": 22, "北海道": 22 },
    { "date": "2/5", "愛知県": 12, "大阪府": 12, "東京都": 25, "北海道": 33 },
    { "date": "2/6", "愛知県": 15, "大阪府": 21, "東京都": 27, "北海道": 46 },
    { "date": "2/7", "愛知県": 16, "大阪府": 25, "東京都": 37, "北海道": 52 },
    { "date": "2/8", "愛知県": 17, "大阪府": 27, "東京都": 38, "北海道": 53 },
    { "date": "2/9", "愛知県": 21, "大阪府": 27, "東京都": 49, "北海道": 57 },
    { "date": "2/10", "愛知県": 23, "大阪府": 28, "東京都": 67, "北海道": 58 },
    { "date": "2/11", "愛知県": 34, "大阪府": 35, "東京都": 93, "北海道": 63 },
    { "date": "2/12", "愛知県": 35, "大阪府": 37, "東京都": 125, "北海道": 65 },
    { "date": "2/13", "愛知県": 36, "大阪府": 38, "東京都": 152, "北海道": 68 },
    { "date": "2/14", "愛知県": 37, "大阪府": 53, "東京都": 268, "北海道": 73 },
    { "date": "2/15", "愛知県": 37, "大阪府": 57, "東京都": 457, "北海道": 74 },
    { "date": "2/16", "愛知県": 38, "大阪府": 64, "東京都": 567, "北海道": 79 },
]

interface Props {
}

const PatientsByDateView: React.FC<Props> = props => {


    const patients = useSelector((state: ReduxState) => state.Data)


    return (
        <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader
                title="日別罹患者数推移"
            />
            <Divider />
            <CardContent style={{ height: 400, width: "100%" }}>
                <ResponsiveContainer width="95%">
                    <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                        data={mockItems} //ここにArray型のデータを指定
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}  //marginを指定
                    >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip /> //hoverした時に各パラメーターの詳細を見れるように設定
                        <Legend />  // 凡例を表示(図の【売上】【総売上】)
                        <CartesianGrid //グラフのグリッドを指定
                            stroke="#f5f5f5" //グリッド線の色を指定
                        />
                        <Bar //面積を表すグラフ
                            dataKey="愛知県" //Array型のデータの、Y軸に表示したい値のキーを指定
                            label={false}
                            stroke="#00aced" ////グラフの線の色を指定
                            stackId="a"
                            fillOpacity={1}  ////グラフの中身の薄さを指定
                            fill="rgba(0, 172, 237, 0.4)"  //グラフの色を指定
                        />
                        <Bar //面積を表すグラフ
                            dataKey="東京都" //Array型のデータの、Y軸に表示したい値のキーを指定
                            label={false}
                            stroke="#00aced" ////グラフの線の色を指定
                            stackId="a"
                            fillOpacity={1}  ////グラフの中身の薄さを指定
                            fill="rgba(150, 2, 237, 0.4)"  //グラフの色を指定
                        />
                        <Bar //面積を表すグラフ
                            dataKey="大阪府" //Array型のデータの、Y軸に表示したい値のキーを指定
                            label={false}
                            stroke="#00aced" ////グラフの線の色を指定
                            stackId="a"
                            fillOpacity={1}  ////グラフの中身の薄さを指定
                            fill="rgba(146, 72, 27, 0.4)"  //グラフの色を指定
                        />
                        <Bar //面積を表すグラフ
                            dataKey="北海道" //Array型のデータの、Y軸に表示したい値のキーを指定
                            label={false}
                            stroke="#00aced" ////グラフの線の色を指定
                            stackId="a"
                            fillOpacity={1}  ////グラフの中身の薄さを指定
                            fill="rgba(20, 2, 7, 0.4)"  //グラフの色を指定
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </CardContent>
            <Divider />
            {/*<CardActions className={classes.actions}>
                <Button color="primary" size="small" variant="text">
                    Overview <ArrowRightIcon />
                </Button>
            </CardActions>*/}
        </Card>
    );
};

export default PatientsByDateView;
