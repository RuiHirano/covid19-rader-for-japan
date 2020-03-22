import React from "react";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import FormLabel from "./form-label";

interface ComponentProps {
    title: string
    description: string
    required?: boolean
}

type Props = ComponentProps & TextFieldProps

const TextFieldComponent: React.FC<Props> = props => {
    const { title, description, required, ...rest } = props
    return (
        <FormLabel title={title} description={description} required={required}>
            <TextField
                {...rest}
                style={{ width: "70%" }}
                name={"test"}
                variant={"outlined"}
            />
        </FormLabel>
    );
};

export default TextFieldComponent;