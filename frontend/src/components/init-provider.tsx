import React, { useEffect } from "react";
import { LinearProgress, Typography } from "@material-ui/core";
import { useGetPatients } from "../data/useData";

interface Props {
    children?: any;
}


const InitProvider: React.FC<Props> = props => {
    const { children } = props;

    const { getPatients, status } = useGetPatients()

    useEffect(() => {
        getPatients()
    }, []);

    return (
        <div>
            {status.Progress !== 100 ? <LinearProgress /> : children}
            {status.Error !== "" ? <div>
                <Typography >{"Error occor... "}</Typography>
                <Typography >{"Error Message:  " + status.Error + "."}</Typography>
            </div> : <div />}
        </div>
    );
};

export default InitProvider;
