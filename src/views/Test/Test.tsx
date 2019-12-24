import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100%"
    }
}));

interface Props {}

const Test: React.FC<Props> = props => {
    const classes = useStyles();

    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");

    const handleClick = () => {
        console.log("click");
        setCount(count + 1);
    };

    return (
        <div className={classes.root}>
            <TextField
                label="Stand"
                inputProps={{
                    "data-testid": "standard"
                }}
                margin="normal"
                type="textarea"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <Typography>{count}</Typography>
            <Button onClick={() => handleClick()}>Button</Button>
        </div>
    );
};

export default Test;
