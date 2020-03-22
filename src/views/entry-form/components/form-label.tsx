import React from "react";
import { TextField, Typography, Divider, Grid, colors } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";

interface Props {
    title: string
    description: string
    required?: boolean
    children: React.ReactNode
}


const FormLabel: React.FC<Props> = props => {
    const { title, description, required, children } = props
    return (
        <div style={{ margin: 10 }}>
            <Grid container spacing={3}>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                    <Typography style={{ fontSize: 20, textAlign: "center", color: colors.grey[800] }}>{title}</Typography>
                    <Typography style={{ fontSize: 15, textAlign: "center", color: colors.grey[800] }}>{description}</Typography>
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                    {children}
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                    <div style={{ textAlign: "center" }}>
                        <Divider style={{}} />
                    </div>
                </Grid>

            </Grid>
        </div>
    );
};

export default FormLabel;
