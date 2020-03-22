import React from "react";
import { TextField, Typography, Divider, Grid, colors, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import FormLabel from "./form-label";
import { TradeType } from "../../../types";

interface ComponentProps {
    title: string
    description: string
    required?: boolean
}

type Props = ComponentProps & TextFieldProps

const RadioButtonComponent: React.FC<Props> = props => {
    const { title, description, required } = props
    return (
        <FormLabel title={title} description={description} required={required}>
            <RadioGroup aria-label="position" name="position" value={TradeType.SELL.toString()} onChange={(e) => console.log("radio: ", e.target.value)} row>
                <FormControlLabel
                    value={TradeType.BUY.toString()}
                    control={<Radio color="primary" />}
                    label="Buy"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={TradeType.SELL.toString()}
                    control={<Radio color="primary" />}
                    label="Sell"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={TradeType.RECORD.toString()}
                    control={<Radio color="primary" />}
                    label="Record"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={TradeType.DEPOSIT.toString()}
                    control={<Radio color="primary" />}
                    label="Deposit"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={TradeType.WITHDRAWAL.toString()}
                    control={<Radio color="primary" />}
                    label="Withdrawal"
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormLabel>
    );
};

export default RadioButtonComponent;
