import * as React from "react";
import { Button, Divider, Typography, CardMedia, colors, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

interface Props {
    title: string
    description: string
    buttonText: string
    handleClick: () => void
}

const HeaderPaper: React.FC<Props> = (props) => {
    const { title, description, buttonText, handleClick } = props
    return (
        <Paper style={{ width: 500, height: 300, margin: 20, padding: 20, position: "relative" }}>
            <Typography style={{ fontSize: 30, color: colors.grey[800], textAlign: "center", margin: 20 }}>{title}</Typography>
            <Typography style={{ color: colors.grey[800], textAlign: "center" }}>{description}</Typography>
            <div style={{ bottom: 0, position: "absolute", width: "90%", textAlign: "center" }}>
                <Button onClick={() => handleClick()} style={{ backgroundColor: theme.palette.primary.main, color: "white", margin: 20, width: 200, height: 60 }}>{buttonText}</Button>
            </div>
        </Paper >
    );
};

export default HeaderPaper;
