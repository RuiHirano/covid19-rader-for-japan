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
import { PatientsNumByPref, PatientsByPref, PrefData, StatData } from "../../../types";

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


type DataByPref = { pref: string, deaths: number, cases: number }
/* 都道府県別の感染者数合計を計算 */
// return: [{ pref: '北海道', 'value': 12 },{ pref: '東京都', 'value': 22 },{ pref: '愛知県', 'value': 2 },...]
const createData = (statsData: StatData[], top: number) => {
    let result: DataByPref[] = []
    const lastDate = statsData[statsData.length - 1].Date

    statsData.forEach((statData) => {
        if (statData.Date === lastDate) {
            const dateData: DataByPref = {
                pref: statData.Prefecture,
                deaths: statData.TotalDeaths,
                cases: statData.TotalCases
            }
            result.push(dateData)
        }
    })

    // 大きい順からtopまでを取得
    const topResult = result.sort(function (res1: DataByPref, res2: DataByPref) {
        if (res1.deaths + res1.cases < res2.deaths + res2.cases) return 1;
        if (res1.deaths + res1.cases > res2.deaths + res2.cases) return -1;
        return 0;
    }).slice(0, top);

    console.log("topResult", topResult)
    return topResult
}

interface Props {
}

const PatientsByPrefView: React.FC<Props> = props => {


    const statsData = useSelector((state: ReduxState) => state.Data.StatsData)
    console.log("data: ", statsData)
    const top = 20 // 上位20個
    const data = createData(statsData, top)
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
                    width={500}  //グラフ全体の幅を指定
                    height={380}  //グラフ全体の高さを指定
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
                        dataKey="cases" //Array型のデータの、Y軸に表示したい値のキーを指定
                        label={false}
                        stroke="#00aced" ////グラフの線の色を指定
                        stackId="a"
                        fillOpacity={1}  ////グラフの中身の薄さを指定
                        fill="rgba(0, 172, 237, 0.5)"  //グラフの色を指定
                    />
                    <Bar //面積を表すグラフ
                        dataKey="deaths" //Array型のデータの、Y軸に表示したい値のキーを指定
                        label={false}
                        stroke="#00aced" ////グラフの線の色を指定
                        stackId="a"
                        fillOpacity={1}  ////グラフの中身の薄さを指定
                        fill="rgba(253, 12, 7, 0.5)"  //グラフの色を指定
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
