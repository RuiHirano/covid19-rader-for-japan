import React from "react";
import { TextField, Typography, Divider, Grid, colors, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import FormLabel from "./form-label";
import { TradeType } from "../../../types";
import { KeyboardDatePicker } from "@material-ui/pickers";

interface Props {
    title: string
    description: string
    required?: boolean
}


const DatePickerComponent: React.FC<Props> = props => {
    const { title, description, required } = props

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    return (
        <FormLabel title={title} description={description} required={required}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </FormLabel>
    );
};

export default DatePickerComponent;
