import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Paper,
    Typography,
    colors,
    Link,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Button,
    Divider,
    Tooltip,
} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';


interface Props {
}

const Warning: React.FC<Props> = props => {
    const { } = props

    return (
        <Paper style={{ padding: 10 }}>
            <Typography style={{ color: colors.grey[900] }}>これらのデータは開発者が独自に収集したものであり、実際の値と一致しているとは限らないので注意してください。<Tooltip title="準備中" ><Link>詳細はこちら</Link></Tooltip></Typography>

            <Divider />
            <div style={{ marginTop: 10, display: "flex" }}>
                <Button
                    variant="outlined"
                    style={{ backgroundColor: colors.grey[200], marginRight: 10 }}
                    href={"https://github.com/RuiHirano/covid19-rader-for-japan"}
                >
                    <GitHubIcon />
                    <Typography style={{ marginLeft: 10 }}>GitHub</Typography>
                </Button>
                <Tooltip title="準備中" >
                    <Button
                        variant="outlined"
                        style={{ backgroundColor: colors.grey[200], marginRight: 10 }}
                        onClick={() => { }}
                    >
                        <TwitterIcon />
                        <Typography style={{ marginLeft: 10 }}>Twitter</Typography>
                    </Button>
                </Tooltip>
                <Tooltip title="準備中" >
                    <Button
                        variant="outlined"
                        style={{ backgroundColor: colors.grey[200] }}
                        onClick={() => { }}
                    >
                        <Typography style={{ marginLeft: 10 }}>Qiita</Typography>
                    </Button>
                </Tooltip>
            </div>
        </Paper>

    );
};

export default Warning;
