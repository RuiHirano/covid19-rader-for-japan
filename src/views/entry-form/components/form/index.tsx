import React, { useEffect, useState } from "react";
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
    styled,
    Link
} from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { Item, ImageStatus, MarketType, TradeType, Image } from "../../../../types";
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import BackButton from "../back-button";
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { withRouter, match } from "react-router-dom";
import * as H from "history";
import imgPath from "../../../../app/assets/app_icon.png";
import AlertComponent, { useAlert } from "../../../../components/alert";
import DialogComponent, { useDialog } from "../../../../components/dialog";
import { useCreateItem, useUpdateItem } from "../../../../redux/hooks/useItem";
import uuid from "uuid";
import { Moment } from "moment";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../redux/module";

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

const ImageComponent = styled("img")({
    width: 150,
    height: 150
});

interface Props {
    history: H.History;
    location: H.Location;
    match: match<{ itemId: string }>;
    item: Item;
    handleRegistItem: (values: FormikValues) => void;
}

type FormData = {
    id: string
    marketType: MarketType;
    startDate: string
    endDate: string
    tradeType: TradeType
    pair: string
    lot: number
    entryRate: number
    losscutRate: number
    settleRate: number
    profit: number
    beforeComment: string
    afterComment: string
    tags: string[]
    images: Image[]
    updatedAt: string
    createdAt: string
};

const validationSchema = Yup.object().shape({
    lot: Yup.number().typeError("数字を入力してください")
        .required("必須項目です"),
    profit: Yup.number().typeError("数字を入力してください")
        .required("必須項目です"),
});

const Form: React.FC<Props> = props => {
    const { handleRegistItem, history, match } = props;

    const classes = useStyles();

    const items = useSelector((state: ReduxState) => state.Items)
    const [item, setItem] = useState<Item>(new Item())
    useEffect(() => {
        // init
        // EditであればそのItemをdefaultにする
        const itemId: string = match.params.itemId
        if (itemId !== "new") {
            items.forEach((item: Item) => {
                if (itemId === item.ID) {
                    setItem(item)
                }
            })
        }
    }, [])
    console.log("itemTest: ", item)

    // alert
    const { openAlert, alertController } = useAlert()
    // dialog
    const { openDialog, dialogController } = useDialog()

    console.log("render");

    const { handleSubmit, errors, control, getValues, setValue, register } = useForm<FormData>({
        defaultValues: itemToForm(item),
        validationSchema: validationSchema
    });
    const { createItem, status } = useCreateItem()
    const { updateItem } = useUpdateItem()
    const onSubmit = handleSubmit((formData: FormData) => {
        formData["tags"] = searchTags
        formData["images"] = imageData

        const item = formToItem(formData)
        console.log("item: ", item, formData)

        const itemId = match.params.itemId
        if (itemId === "new") {
            console.log("new: ")
            //createItem(item)
        } else {
            console.log("update: ")
            //updateItem(item)
        }
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

    const [searchTags, setSearchTags] = React.useState<string[]>([]);


    const [imageData, setImageData] = React.useState<Image[]>([]);

    const [pairData, setPairData] = React.useState<string[]>([
        "USD/JPY",
        "EUD/USD",
        "EUD/JPY",
    ]);

    const handleDeleteImage = () => {
        let newImageData: Image[] = []
        imageData.forEach((data, index) => {
            if (index !== imageData.length - 1) {
                newImageData.push(data)
            }
        })
        setImageData(newImageData)
    };

    const handleDeleteTag = (index: number) => {
        let newTags: string[] = []
        searchTags.forEach((tag, i) => {
            if (i !== index) {
                newTags.push(tag)
            }
        })
        setSearchTags(newTags)
    };

    //console.log("tradetype: ", TradeType2.RECORD === "RECORD")
    return (
        <div>
            <Paper style={{ width: "100%", padding: 20 }}>

                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div style={{ display: "flex" }}>
                            <BackButton handleBack={() => openDialog(handleBack, "Back", "Are you sure delete content?")} />
                            <Typography variant={"h5"} style={{ flexGrow: 1, textAlign: "center" }}>Entry Form</Typography>
                        </div>
                    </Grid>
                </Grid>

                <form onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
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
                                }
                                name="tradeType"
                                control={control}
                                defaultValue={TradeType.SELL.toString()}
                            />

                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
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
                                }
                                name="marketType"
                                control={control}
                                defaultValue={"fx"}
                            />

                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
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
                                }
                                name="startDate"
                                control={control}
                                defaultValue={new Date(item.StartDate)}
                            />

                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
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
                                }
                                name="endDate"
                                control={control}
                                defaultValue={selectedDate}
                            />

                        </Grid>


                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Pair
                                </InputLabel>
                                <Controller
                                    as={
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
                                    }
                                    name="pair"
                                    control={control}
                                    defaultValue=""
                                />

                            </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        error={errors.lot ? true : false}
                                        fullWidth
                                        helperText={errors.lot ? errors.lot.message : ""}
                                        label="Lot"
                                        name="lot"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="lot"
                                control={control}
                                defaultValue={item.Lot}
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        error={errors.entryRate ? true : false}
                                        fullWidth
                                        helperText={errors.entryRate ? errors.entryRate.message : ""}
                                        label="Entry Rate"
                                        name="Entry Rate"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="entryRate"
                                control={control}
                                defaultValue={item.EntryRate}
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
                                name="losscutRate"
                                control={control}
                                defaultValue={item.LossCutRate}
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
                                name="settleRate"
                                control={control}
                                defaultValue={item.SettleRate}
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
                                name="profit"
                                control={control}
                                defaultValue={item.Profit}
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        multiline
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="Before Comment"
                                        name="Before Comment"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="beforeComment"
                                control={control}
                                defaultValue={item.BeforeComment}
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextField
                                        //error={errors.email ? true : false}
                                        fullWidth
                                        multiline
                                        //helperText={errors.email ? errors.email.message : ""}
                                        label="After Comment"
                                        name="After Comment"
                                        type="text"
                                        variant="outlined"
                                    />
                                }
                                name="afterComment"
                                control={control}
                                defaultValue={item.AfterComment}
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {/*fields.map((item, index) => {
                                const test = `searchTags[${index}]`
                                const values = getValues()
                                return (
                                    <ul>
                                        <li key={item.id}>
                                            <input name={`searchTags[${index}]`} ref={register} defaultValue={values.searchTags[index]} />
                                        </li>
                                    </ul>

                                )
                            })

                        */}
                            <Button
                                onClick={() => {

                                    console.log("click: ")
                                    //append({ name: "testttt" })
                                    //append(["testttt"])
                                    setSearchTags([...searchTags, "test"])
                                    //setValue("searchTags", values)
                                }}
                                variant={"contained"}
                                style={{ margin: 5 }}
                            >Add Tag</Button>
                            {searchTags.map((tag, index) => {
                                return (
                                    <Chip
                                        style={{ margin: 10 }}
                                        key={index}
                                        label={tag}
                                        onDelete={() => handleDeleteTag(index)}
                                    />
                                );
                            })}



                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                            <Paper style={{ height: 200, backgroundColor: colors.grey[300], marginTop: 20 }} elevation={0}>
                                {imageData.map(data => {
                                    return (
                                        <Button onClick={() => openDialog(handleDeleteImage, "Delete Image", "Are you sure delete image?")}>
                                            <ImageComponent alt="image" src={data.Base64} />
                                        </Button>
                                    );
                                })}
                            </Paper>

                            <Dropzone
                                onDrop={acceptedFiles => {
                                    console.log(acceptedFiles)
                                    const selectFile = acceptedFiles[0]
                                    const reader = new FileReader();
                                    reader.onload = (event: any) => {
                                        const base64: string = event.target.result
                                        console.log(base64);
                                        const image: Image = { ID: uuid(), Base64: base64, Url: "", Size: 0, Status: ImageStatus.NONE }
                                        setImageData([...imageData, image])
                                    };
                                    reader.readAsDataURL(selectFile);
                                }}
                                accept="image/jpeg,image/png,image/jpg">
                                {({ getRootProps, getInputProps }) => (

                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Button style={{ margin: 10 }} variant={"contained"}>Add Image</Button>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>

                        </Grid>

                    </Grid>

                    <Button variant={"contained"} color="secondary" style={{ width: 100, margin: 20 }} type="button" onClick={() => openDialog(onSubmit, "Save", "Are you sure save?")}>Save</Button>
                </form>
            </Paper>
            <DialogComponent controller={dialogController} />
            <AlertComponent controller={alertController} />
        </div>
    )
};

export default withRouter(Form);


/////////////////////////////////////////////////
//////////           Util                ////////
////////////////////////////////////////////////

const formToItem = (form: FormData) => {
    const item = new Item()
    item.ID = form.id
    item.MarketType = form.marketType
    item.StartDate = form.startDate
    item.EndDate = form.endDate
    item.TradeType = form.tradeType
    item.Pair = form.pair
    item.Lot = form.lot
    item.EntryRate = form.entryRate
    item.LossCutRate = form.losscutRate
    item.SettleRate = form.settleRate
    item.Profit = form.profit
    item.BeforeComment = form.beforeComment
    item.AfterComment = form.afterComment
    item.Tags = form.tags
    item.Images = form.images
    item.UpdatedAt = form.updatedAt
    item.CreatedAt = form.createdAt
    return item
}

const itemToForm = (item: Item) => {
    console.log("form debug: ", item)
    const form: FormData = {
        id: item.ID,
        marketType: item.MarketType,
        startDate: item.StartDate,
        endDate: item.EndDate,
        tradeType: item.TradeType,
        pair: item.Pair,
        lot: item.Lot,
        entryRate: item.EntryRate,
        losscutRate: item.LossCutRate,
        settleRate: item.SettleRate,
        profit: item.Profit,
        beforeComment: item.BeforeComment,
        afterComment: item.AfterComment,
        tags: item.Tags,
        images: item.Images,
        updatedAt: item.UpdatedAt,
        createdAt: item.CreatedAt,
    }
    return form
}