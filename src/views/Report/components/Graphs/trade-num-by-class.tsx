import React from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Divider,
    Typography,
    createStyles
} from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import { ChartData } from "chart.js";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import RefreshIcon from "@material-ui/icons/Refresh";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import { TradeTypeRatio } from "../../../../types";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%"
    },
    chartContainer: {
        position: "relative",
        height: "300px"
    },
    stats: {
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "center"
    },
    device: {
        textAlign: "center",
        padding: theme.spacing(1)
    },
    deviceIcon: {
        //color: theme.palette.icon
        //color: theme.palette.background
    }
}));

const createData = (tradeNumByClassData: TradeTypeRatio, theme: Theme) => {
    const labels: string[] = [];
    const values: number[] = [];
    const data: ChartData = {
        labels: ["Buy", "Sell"],
        datasets: [
            {
                label: "this",
                data: [tradeNumByClassData.BUY, tradeNumByClassData.SELL],
                backgroundColor: [
                    theme.palette.primary.main,
                    theme.palette.error.main,
                    //theme.palette.warning.main
                    theme.palette.error.main
                ],
                borderWidth: 8,
                //borderColor: theme.palette.white,
                //hoverBorderColor: theme.palette.white
                borderColor: theme.palette.common.white,
                hoverBorderColor: theme.palette.common.white
            }
        ]
    };

    return data;
};

interface Props {
    tradeNumByClassData: TradeTypeRatio;
}

const TradeNumByClass: React.FC<Props> = props => {
    const { tradeNumByClassData } = props;

    const classes = useStyles();
    const theme = useTheme();

    const data = createData(tradeNumByClassData, theme);

    const options: object = {
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
            borderWidth: 1,
            borderColor: theme.palette.divider,
            //backgroundColor: theme.palette.white,
            backgroundColor: theme.palette.background,
            titleFontColor: theme.palette.text.primary,
            bodyFontColor: theme.palette.text.secondary,
            footerFontColor: theme.palette.text.secondary
        }
    };

    const devices = [
        {
            title: "USD/JPY",
            value: "63",
            icon: <LaptopMacIcon />,
            color: theme.palette.primary.main
        },
        {
            title: "GBP/USD",
            value: "15",
            icon: <TabletMacIcon />,
            color: theme.palette.error.main
        },
        {
            title: "EUR/USD",
            value: "23",
            icon: <PhoneIphoneIcon />,
            //color: theme.palette.warning.main
            color: theme.palette.error.main
        }
    ];

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <CardHeader
                action={
                    <IconButton size="small">
                        <RefreshIcon />
                    </IconButton>
                }
                title="TradeNum By Class"
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Doughnut data={data} options={options} />
                </div>
                <div className={classes.stats}>
                    {devices.map(device => (
                        <div className={classes.device} key={device.title}>
                            <span className={classes.deviceIcon}>
                                {device.icon}
                            </span>
                            <Typography variant="body1">
                                {device.title}
                            </Typography>
                            <Typography
                                style={{ color: device.color }}
                                variant="h5"
                            >
                                {device.value}%
                            </Typography>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TradeNumByClass;
