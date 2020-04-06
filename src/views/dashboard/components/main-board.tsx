import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Paper,
    Typography,
    Link,
    CardActionArea,
    CardMedia,
    CardActions,
    Button,
    Grid,
} from "@material-ui/core";
import PatientsMap from "./patient-map";
import PatientTable from "./patient-table";


interface Props {
}

const MainBoard: React.FC<Props> = props => {
    const { } = props

    return (
        <Card>
            <CardHeader
                title={"各都道府県の状況"}
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <PatientsMap />
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <PatientTable />
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default MainBoard;
