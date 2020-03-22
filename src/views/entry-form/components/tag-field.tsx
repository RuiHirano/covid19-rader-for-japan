import React from "react";
import { TextField, Typography, Divider, Grid, colors, RadioGroup, FormControlLabel, Radio, Button } from "@material-ui/core";
import FormLabel from "./form-label";
import { TradeType } from "../../../types";
import { KeyboardDatePicker } from "@material-ui/pickers";

interface Props {
    title: string
    description: string
    required?: boolean
}


const TagField: React.FC<Props> = props => {
    const { title, description, required } = props

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    return (
        <div>
            <TextField
                label="タグ名"
                name="tag"
                variant={"outlined"}
            />
            <Button
                onClick={() => {
                    console.log("click: ")
                    //setSearchTags([...searchTags, "test"])
                }}
                variant={"contained"}
                style={{ margin: 5 }}
            >Add Tag</Button>
        </div>
    );
};

export default TagField;
