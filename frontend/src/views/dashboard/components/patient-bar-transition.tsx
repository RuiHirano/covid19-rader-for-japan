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
import { Patient } from "../../../types";

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

const mockData = [
    { date: '3/1', '北海道': 12, '東京都': 3, '愛知県': 6 },
    { date: '3/2', '北海道': 15, '東京都': 3, '愛知県': 11 },
    { date: '3/3', '北海道': 4, '東京都': 4, '愛知県': 14 },
    { date: '3/4', '北海道': 6, '東京都': 6, '愛知県': 2 },
    { date: '3/5', '北海道': 8, '東京都': 3, '愛知県': 5 },
    { date: '3/6', '北海道': 3, '東京都': 5, '愛知県': 13 },
    { date: '3/7', '北海道': 14, '東京都': 5, '愛知県': 10 },
    { date: '3/8', '北海道': 24, '東京都': 7, '愛知県': 9 },
    { date: '3/9', '北海道': 32, '東京都': 8, '愛知県': 3 },
    { date: '3/10', '北海道': 12, '東京都': 2, '愛知県': 6 },
    { date: '3/11', '北海道': 15, '東京都': 4, '愛知県': 8 },
    { date: '3/12', '北海道': 14, '東京都': 6, '愛知県': 16 },
    { date: '3/13', '北海道': 12, '東京都': 8, '愛知県': 2 },
]

const createData = (patients: Patient[]) => {
    const newData: any[] = []
    let totalData = { date: '3/1', '愛知県': 0, '東京都': 0, '北海道': 0 }
    mockData.forEach((data) => {
        newData.push({ date: data.date, '愛知県': data.愛知県 + totalData.愛知県, '東京都': data.東京都 + totalData.東京都, '北海道': data.北海道 + totalData.北海道 })
        totalData = { date: data.date, '愛知県': data.愛知県 + totalData.愛知県, '東京都': data.東京都 + totalData.東京都, '北海道': data.北海道 + totalData.北海道 }
    })
    console.log("newdata: ", newData)
    return newData
}

interface Props {
}

const PatientsBarTransition: React.FC<Props> = props => {

    const classes = useStyles();

    const patients = useSelector((state: ReduxState) => state.Patients)
    const [data, setData] = useState(createData(patients))

    return (
        <Card>
            <CardHeader
                //action={
                //    <Button size="small" variant="text">
                //        Last 7 days <ArrowDropDownIcon />
                //    </Button>
                //}
                title="Total Patients Transition(Bar)"
            />
            <Divider />
            <CardContent>
                <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                    width={600}  //グラフ全体の幅を指定
                    height={280}  //グラフ全体の高さを指定
                    data={data} //ここにArray型のデータを指定
                    margin={{ top: 20, right: 60, bottom: 0, left: 0 }}  //marginを指定
                >
                    <XAxis
                        dataKey="date"  //Array型のデータの、X軸に表示したい値のキーを指定
                    />
                    <YAxis />
                    <Tooltip /> //hoverした時に各パラメーターの詳細を見れるように設定
                    <Legend />  // 凡例を表示(図の【売上】【総売上】)
                    <CartesianGrid //グラフのグリッドを指定
                        stroke="#f5f5f5" //グリッド線の色を指定
                    />
                    <Bar //面積を表すグラフ
                        dataKey="北海道" //Array型のデータの、Y軸に表示したい値のキーを指定
                        stroke="#00aced" ////グラフの線の色を指定
                        stackId="a"
                        fillOpacity={1}  ////グラフの中身の薄さを指定
                        fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
                    />
                    <Bar //棒グラフ
                        dataKey="東京都"　//Array型のデータの、Y軸に表示したい値のキーを指定
                        stroke="#2250A2" ////レーダーの線の色を指定 
                        stackId="a"
                        fillOpacity={1}  //レーダーの中身の色の薄さを指定
                        fill="rgba(34, 80, 162, 0.2)" ////レーダーの中身の色を指定
                    />
                    <Bar //棒グラフ
                        dataKey="愛知県"　//Array型のデータの、Y軸に表示したい値のキーを指定
                        stroke="#22A0A2" ////レーダーの線の色を指定 
                        stackId="a"
                        fillOpacity={1}  //レーダーの中身の色の薄さを指定
                        fill="rgba(34, 120, 120, 0.2)" ////レーダーの中身の色を指定
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

export default PatientsBarTransition;
