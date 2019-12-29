import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Avatar,
    LinearProgress
} from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%"
    },
    content: {
        alignItems: "center",
        display: "flex"
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    progress: {
        marginTop: theme.spacing(3)
    }
}));

interface Props {
    winRate: number;
}

const WinRate: React.FC<Props> = props => {
    const { winRate } = props;

    const classes = useStyles();

    return (
        <Card
        >
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Win Rate
                        </Typography>
                        <Typography variant="h3">{winRate}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <InsertChartIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <LinearProgress
                    className={classes.progress}
                    value={75.5}
                    variant="determinate"
                />
            </CardContent>
        </Card>
    );
};

export default WinRate;
