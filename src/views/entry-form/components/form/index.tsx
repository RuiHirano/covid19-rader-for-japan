import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    colors,
    styled
} from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { Item, ImageStatus, MarketType, TradeType } from "../../../../types";
import { useForm, Controller } from 'react-hook-form'
import BackButton from "../back-button";
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { withRouter, match } from "react-router-dom";
import * as H from "history";
import imgPath from "../../../../app/assets/app_icon.png";
import AlertComponent, { useAlert } from "../../../../components/alert";
import DialogComponent, { useDialog } from "../../../../components/dialog";

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        marginTop: theme.spacing(2)
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

const Image = styled("img")({
    width: 150,
    height: 150
});

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    item: Item;
    handleRegistItem: (values: FormikValues) => void;
}

const validationSchema = {};

const Form: React.FC<Props> = props => {
    const { item, handleRegistItem, history } = props;

    const classes = useStyles();

    // alert
    const { openAlert, closeAlert, alertStatus } = useAlert()
    // dialog
    const { open, openDialog, closeDialog } = useDialog()

    console.log("render");


    type FormData = {
        marketType: MarketType;
        startDate: string;
        endDate: string
        tradeType: TradeType
        pair: string
        lot: number
        orderRate: number
        losscutRate: number
        settleRate: number
        profit: number
        beforeMemo: string
        afterMemo: string
    };

    const { handleSubmit, errors, control } = useForm<FormData>({ validationSchema: validationSchema });
    const onSubmit = handleSubmit((formData) => {
        console.log("sign in", formData.profit)
    });

    const handleBack = () => {
        console.log("back")
        history.goBack();
    }

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    interface ChipData {
        key: number;
        label: string;
    }

    const [chipData, setChipData] = React.useState<ChipData[]>([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);


    const [imageData, setImageData] = React.useState<string[]>([
        imgPath,
        imgPath,
        imgPath,
        imgPath,
        imgPath,
    ]);

    const [pairData, setPairData] = React.useState<string[]>([
        "USD/JPY",
        "EUD/USD",
        "EUD/JPY",
    ]);

    const handleDeleteImage = () => {
        let newImageData: string[] = []
        imageData.forEach((data, index) => {
            if (index !== imageData.length - 1) {
                newImageData.push(data)
            }
        })
        setImageData(newImageData)
    };

    return (
        <div>
            <Paper style={{ width: "100%", padding: 20 }}>

                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div style={{ display: "flex" }}>
                            <BackButton handleBack={handleBack} />
                            <Typography variant={"h5"} style={{ flexGrow: 1, textAlign: "center" }}>Entry Form</Typography>
                        </div>
                    </Grid>
                </Grid>

                <form onSubmit={onSubmit}>
                    <Grid container>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <RadioGroup aria-label="position" name="position" value={"buysell"} onChange={(e) => console.log("radio: ", e.target.value)} row>
                                <FormControlLabel
                                    value="buysell"
                                    control={<Radio color="primary" />}
                                    label="Buy or Sell"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="record"
                                    control={<Radio color="primary" />}
                                    label="Record"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="depowith"
                                    control={<Radio color="primary" />}
                                    label="Depo and With"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <RadioGroup aria-label="position" name="position" value={"fx"} onChange={(e) => console.log("radio: ", e.target.value)} row>
                                <FormControlLabel
                                    value="fx"
                                    control={<Radio color="primary" />}
                                    label="Forex"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="stock"
                                    control={<Radio color="primary" />}
                                    label="Stock"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
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
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="End Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>


                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Pair
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={pairData[0]}
                                    onChange={(e) => console.log("select: ", e)}
                                >
                                    {pairData.map((pair) => {
                                        return (
                                            <MenuItem value={pair}>{pair}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="Lot"
                                        name="Lot"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="email"
                                control={control}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="Order Rate"
                                        name="Order Rate"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="email"
                                control={control}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="Losscut Rate"
                                        name="Losscut Rate"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="email"
                                control={control}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="Settle Rate"
                                        name="Settle Rate"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="email"
                                control={control}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="Profit"
                                        name="Profit"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="email"
                                control={control}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="Before Memo"
                                        name="Before Memo"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="email"
                                control={control}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="After Memo"
                                        name="After Memo"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="email"
                                control={control}
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {chipData.map(data => {

                                return (
                                    <Chip
                                        key={data.key}
                                        label={data.label}
                                        style={{ margin: 3 }}
                                        onDelete={() => console.log("delete: ", data.label)}
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Paper style={{ height: 200, backgroundColor: colors.grey[300], marginTop: 20 }} elevation={0}>
                                {imageData.map(data => {
                                    return (
                                        <Button onClick={() => openDialog()}>
                                            <Image alt="image" src={data} />
                                        </Button>
                                    );
                                })}
                            </Paper>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
            <Button variant={"contained"} color="secondary" style={{ width: 100, margin: 20 }}>Save</Button>
            <DialogComponent open={open} closeDialog={closeDialog} runFunc={handleDeleteImage} />
            <AlertComponent closeAlert={closeAlert} alertStatus={alertStatus} />
        </div>
    )
};

export default withRouter(Form);
