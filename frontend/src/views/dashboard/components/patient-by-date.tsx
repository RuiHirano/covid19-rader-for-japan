import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, ComposedChart, Bar, Area } from "recharts";
import moment from "moment";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/module";
import { createDeflateRaw } from "zlib";
import { Patient, Period, PatientsByDate, PatientsNumByDate } from "../../../types";
import { createObjectArray, StatsCalculator } from "../../../utils/stats-calculator";

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
const createData = (patients: Patient[], period: Period) => {
    const stats = new StatsCalculator()
    let result: PatientsNumByDate[] = []
    console.log("result: ", result)
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
}

interface Props {
}

const PatientsByDateView: React.FC<Props> = props => {

    const classes = useStyles();

    const patients = useSelector((state: ReduxState) => state.Patients)
    const stats = new StatsCalculator()
    //const [data, setData] = useState(createData(stats.calcPatientNumByPrefecture(patients, Period.DATE)))
    const [data, setData] = useState(createData(patients, Period.DATE))
    //const [data, setData] = useState(mockData)

    console.log("data", data)

    return (
        <Card>
            <CardHeader
                //action={
                //    <Button size="small" variant="text">
                //        Last 7 days <ArrowDropDownIcon />
                //    </Button>
                //}
                title="日別罹患者数推移"
            />
            <Divider />
            <CardContent>
                <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                    width={600}  //グラフ全体の幅を指定
                    height={280}  //グラフ全体の高さを指定
                    data={data} //ここにArray型のデータを指定
                    margin={{ top: 20, right: 60, bottom: 0, left: 0 }}  //marginを指定
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip /> //hoverした時に各パラメーターの詳細を見れるように設定
                    <Legend />  // 凡例を表示(図の【売上】【総売上】)
                    <CartesianGrid //グラフのグリッドを指定
                        stroke="#f5f5f5" //グリッド線の色を指定
                    />
                    <Bar //面積を表すグラフ
                        dataKey="value" //Array型のデータの、Y軸に表示したい値のキーを指定
                        label={false}
                        stroke="#00aced" ////グラフの線の色を指定
                        stackId="a"
                        fillOpacity={1}  ////グラフの中身の薄さを指定
                        fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
                    />
                </ComposedChart>


            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <Button color="primary" size="small" variant="text">
                    Overview <ArrowRightIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

export default PatientsByDateView;
