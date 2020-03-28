import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
} from "@material-ui/core";
import { XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, ComposedChart, Bar, Area } from "recharts";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/module";
import { Patient, PatientsNumByPref, PatientsByPref } from "../../../types";
import { StatsCalculator } from "../../../utils/stats-calculator";

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


/* 都道府県別の感染者数合計を計算 */
// return: [{ pref: '北海道', 'value': 12 },{ pref: '東京都', 'value': 22 },{ pref: '愛知県', 'value': 2 },...]
const createData = (patients: Patient[], top: number) => {
    const stats = new StatsCalculator()
    let result: PatientsNumByPref[] = []
    const a = stats.calcPatientsByPrefecture(patients)

    // 大きい順からtopまでを取得
    const topResult = a.sort(function (pd1: PatientsByPref, pd2: PatientsByPref) {
        if (pd1.patients.length < pd2.patients.length) return 1;
        if (pd1.patients.length > pd2.patients.length) return -1;
        return 0;
    }).slice(0, top);
    topResult.forEach((data) => {
        result.push({ pref: data.pref, value: data.patients.length })
    })

    return result
}

interface Props {
}

const PatientsByPrefView: React.FC<Props> = props => {


    const patients = useSelector((state: ReduxState) => state.Patients)
    console.log("data: ", patients)
    const top = 20 // 上位20個
    const [data, setData] = useState(createData(patients, top))
    //const [data, setData] = useState(mockData)

    return (
        <Card>
            <CardHeader
                //action={
                //    <Button size="small" variant="text">
                //        Last 7 days <ArrowDropDownIcon />
                //    </Button>
                //}
                title={`都道府県別の罹患者数の累計(上位 ${top})`}
            />
            <Divider />
            <CardContent>
                <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                    width={600}  //グラフ全体の幅を指定
                    height={280}  //グラフ全体の高さを指定
                    data={data} //ここにArray型のデータを指定
                    layout="vertical"
                    margin={{ top: 20, right: 60, bottom: 0, left: 0 }}  //marginを指定
                >
                    <XAxis type="number" />
                    <YAxis dataKey="pref" type="category" />
                    <Tooltip />
                    <Legend />
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
            {/*<CardActions className={classes.actions}>
                <Button color="primary" size="small" variant="text">
                    Overview <ArrowRightIcon />
                </Button>
            </CardActions>*/}
        </Card>
    );
};

export default PatientsByPrefView;
