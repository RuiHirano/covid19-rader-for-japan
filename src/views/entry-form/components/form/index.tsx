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
    Link,
    FormHelperText
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
import TextFieldComponent from "../text-field";
import RadioButtonComponent from "../radio-button";
import DatePickerComponent from "../date-picker";
import FormLabel from "../form-label";

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
};

const validationSchema = Yup.object().shape({
    startDate: Yup.date().typeError("正しい日付を入力してください"),
    endDate: Yup.date().typeError("正しい日付を入力してください"),
    pair: Yup.string().min(1, "入力してください"),
    lot: Yup.number().typeError("数字を入力してください"),
    entryRate: Yup.number().typeError("数字を入力してください"),
    losscutRate: Yup.number().typeError("数字を入力してください"),
    settleRate: Yup.number().typeError("数字を入力してください"),
    profit: Yup.number().typeError("数字を入力してください")
});

const Form: React.FC<Props> = props => {
    const { handleRegistItem, history, match } = props;

    const classes = useStyles();

    const checkdDefaultItem = () => {
        const itemId: string = match.params.itemId
        let item = new Item()
        if (itemId !== "new") {
            items.forEach((_item: Item) => {
                if (itemId === _item.ID) {
                    console.log("update", _item)
                    item = _item
                }
            })
        }
        return item
    }

    const items = useSelector((state: ReduxState) => state.Items)
    const item = checkdDefaultItem()

    // alert
    const { openAlert, alertController } = useAlert()
    // dialog
    const { openDialog, dialogController } = useDialog()


    const { handleSubmit, errors, control, watch } = useForm<FormData>({
        defaultValues: itemToForm(item),
        validationSchema: validationSchema
    });
    const { createItem, status } = useCreateItem()
    const { updateItem } = useUpdateItem()
    const onSubmit = handleSubmit((formData: FormData) => {

        console.log("submit!!")

        const newItem = formToItem(formData)

        const itemId = match.params.itemId
        newItem.UpdatedAt = new Date().toISOString()
        if (itemId === "new") {
            console.log("new: ", newItem)
            newItem.ID = uuid()
            newItem.CreatedAt = new Date().toISOString()
            createItem(newItem)
        } else {
            newItem.ID = item.ID
            newItem.CreatedAt = item.CreatedAt
            console.log("update: ", newItem)
            updateItem(newItem)
        }
    });

    console.log("item is ", item)

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


    const [images, setImages] = React.useState<Image[]>([]);
    const [tagName, setTagName] = React.useState<string>("");

    const [pairData, setPairData] = React.useState<string[]>([
        "USD/JPY",
        "EUD/USD",
        "EUD/JPY",
    ]);

    const handleDeleteImage = () => {
        let newImages: Image[] = []
        images.forEach((data, index) => {
            if (index !== images.length - 1) {
                newImages.push(data)
            }
        })
        setImages(newImages)
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

    const { fields, append } = useFieldArray(
        {
            control,
            name: "tags"
        }
    );

    const { fields: imageFields, append: appendImage } = useFieldArray(
        {
            control,
            name: "images"
        }
    );

    //console.log("tradetype: ", TradeType.RECORD === "RECORD")
    const watchTradeType = watch('tradeType');
    return (
        <div>
            <Paper style={{ width: "100%", padding: 20 }}>

                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div style={{ display: "flex" }}>
                            <BackButton handleBack={() => openDialog(handleBack, "Back", "Are you sure delete content?")} />
                            <Typography variant={"h5"} style={{ flexGrow: 1, textAlign: "center" }}>取引登録</Typography>
                        </div>
                    </Grid>
                </Grid>

                <div>

                    <Grid container spacing={3}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FormLabel title={"取引選択"} description={""}>
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
                                    defaultValue={item.TradeType.toString()}
                                />
                            </FormLabel>
                        </Grid>

                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FormLabel title={"取引選択"} description={""}>
                                <Controller
                                    as={
                                        <RadioGroup aria-label="position" name="position" value={MarketType.FX.toString()} onChange={(e) => console.log("radio: ", e.target.value)} row>
                                            <FormControlLabel
                                                value={MarketType.FX.toString()}
                                                control={<Radio color="primary" />}
                                                label="Forex"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value={MarketType.STOCK.toString()}
                                                control={<Radio color="primary" />}
                                                label="株式"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    }
                                    name="marketType"
                                    control={control}
                                    defaultValue={item.MarketType.toString()}
                                />
                            </FormLabel>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FormLabel title={"取引開始日時"} description={""}>
                                <Controller
                                    as={
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="yyyy/MM/dd"
                                            margin="normal"
                                            id="date-picker-start-date"
                                            error={errors.startDate ? true : false}
                                            helperText={errors.startDate ? errors.startDate.message : ""}
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
                                    defaultValue={item.StartDate}
                                />
                            </FormLabel>
                        </Grid>

                        {watchTradeType === TradeType.DEPOSIT || watchTradeType === TradeType.WITHDRAWAL ? <div /> :
                            <Grid container>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <FormLabel title={"取引終了日時"} description={""}>
                                        <Controller
                                            as={
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="yyyy/MM/dd"
                                                    margin="normal"
                                                    id="date-picker-end-date"
                                                    label="End Date"
                                                    error={errors.endDate ? true : false}
                                                    helperText={errors.endDate ? errors.endDate.message : ""}
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            }
                                            name="endDate"
                                            control={control}
                                            defaultValue={item.EndDate}
                                        />
                                    </FormLabel>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >

                                    <FormLabel title={"取引通貨"} description={""}>
                                        <Controller
                                            as={
                                                <Select
                                                    style={{ width: 200 }}
                                                    error={errors.pair ? true : false}
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
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
                                            defaultValue={item.Pair}
                                        />
                                        <FormHelperText style={{ color: "red" }}>{errors.pair ? errors.pair.message : ""}</FormHelperText>
                                    </FormLabel>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Controller
                                        as={
                                            <TextFieldComponent
                                                title="数量"
                                                description=""
                                                error={errors.lot ? true : false}
                                                fullWidth
                                                helperText={errors.lot ? errors.lot.message : ""}
                                                label="数量"
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
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Controller
                                        as={
                                            <TextFieldComponent
                                                title="注文価格"
                                                description=""
                                                error={errors.entryRate ? true : false}
                                                fullWidth
                                                helperText={errors.entryRate ? errors.entryRate.message : ""}
                                                label="注文価格"
                                                name="entryRate"
                                                type="text"
                                                variant="outlined"
                                            />
                                        }
                                        name="entryRate"
                                        control={control}
                                        defaultValue={item.EntryRate}
                                    />
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Controller
                                        as={
                                            <TextFieldComponent
                                                title="損切価格"
                                                description=""
                                                error={errors.losscutRate ? true : false}
                                                fullWidth
                                                helperText={errors.losscutRate ? errors.losscutRate.message : ""}
                                                label="損切価格"
                                                name="losscutRate"
                                                type="text"
                                                variant="outlined"
                                            />
                                        }
                                        name="losscutRate"
                                        control={control}
                                        defaultValue={item.LossCutRate}
                                    />
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Controller
                                        as={
                                            <TextFieldComponent
                                                title="決済価格"
                                                description=""
                                                error={errors.settleRate ? true : false}
                                                fullWidth
                                                helperText={errors.settleRate ? errors.settleRate.message : ""}
                                                label="決済価格"
                                                name="settleRate"
                                                type="text"
                                                variant="outlined"
                                            />
                                        }
                                        name="settleRate"
                                        control={control}
                                        defaultValue={item.SettleRate}
                                    />
                                </Grid>
                            </Grid>
                        }
                        {watchTradeType !== TradeType.RECORD ?
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Controller
                                    as={
                                        <TextFieldComponent
                                            title="損益"
                                            description=""
                                            error={errors.profit ? true : false}
                                            fullWidth
                                            helperText={errors.profit ? errors.profit.message : ""}
                                            label="損益"
                                            name="profit"
                                            type="text"
                                            variant="outlined"
                                        />
                                    }
                                    name="profit"
                                    control={control}
                                    defaultValue={item.Profit}
                                />
                            </Grid>
                            :
                            <div />}

                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Controller
                                as={
                                    <TextFieldComponent
                                        title="注文前メモ"
                                        description=""
                                        multiline
                                        fullWidth
                                        label="注文前メモ"
                                        name="beforeComment"
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
                                    <TextFieldComponent
                                        title="決済後メモ"
                                        description=""
                                        multiline
                                        fullWidth
                                        label="決済後メモ"
                                        name="afterComment"
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
                            <FormLabel title="タグ" description="">
                                <TextField
                                    label="タグ名"
                                    name="tag"
                                    variant={"outlined"}
                                    value={tagName}
                                    onChange={(e: any) => { setTagName(e.target.value) }}
                                />
                                <Button
                                    onClick={() => {

                                        console.log("click: ", tagName)
                                        append([tagName]);
                                        setSearchTags([...searchTags, tagName])
                                        setTagName("")
                                    }}
                                    variant={"contained"}
                                    style={{ margin: 5 }}
                                >Add Tag</Button>
                                <div style={{ width: "100%" }}>
                                    {fields.map((item, index) => {
                                        console.log("item: ", item)
                                        return (
                                            <Controller
                                                as={
                                                    <Chip
                                                        style={{ margin: 10 }}
                                                        key={index}
                                                        label={item.value}
                                                        onDelete={() => handleDeleteTag(index)}
                                                    />
                                                }
                                                name={`tags[${index}]`}
                                                control={control}
                                                defaultValue={item.value}
                                            />

                                        );
                                    })}

                                </div>
                            </FormLabel>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FormLabel title="画像選択" description="">
                                <Paper style={{ height: 200, backgroundColor: colors.grey[300], marginTop: 20 }} elevation={0}>
                                    {imageFields.map((item, index) => {
                                        console.log("item ", item)
                                        return (
                                            <Controller
                                                as={
                                                    <Button onClick={() => openDialog(handleDeleteImage, "Delete Image", "Are you sure delete image?")}>
                                                        <ImageComponent alt="image" src={item.Base64} />
                                                    </Button>
                                                }
                                                name={`images[${index}]`}   // images[index]にdefaultvalueを格納する
                                                control={control}
                                                defaultValue={item}
                                            />

                                        );
                                    })}
                                    {/*images.map(data => {
                                        return (
                                            <Button onClick={() => openDialog(handleDeleteImage, "Delete Image", "Are you sure delete image?")}>
                                                <ImageComponent alt="image" src={data.Base64} />
                                            </Button>
                                        );
                                    })*/}
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
                                            setImages([...images, image])
                                            appendImage([image]);
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
                            </FormLabel>
                        </Grid>
                    </Grid>


                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Button variant={"contained"} color="primary" style={{ width: 200, margin: 20 }} onClick={() => onSubmit()}>Save</Button>
                    </div>
                </div>
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
    item.MarketType = form.marketType
    item.StartDate = form.startDate
    item.EndDate = form.endDate === undefined ? form.startDate : form.endDate
    item.TradeType = form.tradeType
    item.Pair = form.pair === undefined ? "" : form.pair
    item.Lot = form.lot === undefined ? 0 : form.lot
    item.EntryRate = form.entryRate === undefined ? 0 : form.entryRate
    item.LossCutRate = form.losscutRate === undefined ? 0 : form.losscutRate
    item.SettleRate = form.settleRate === undefined ? 0 : form.settleRate
    item.Profit = form.profit === undefined ? 0 : form.profit
    item.BeforeComment = form.beforeComment
    item.AfterComment = form.afterComment
    item.Tags = form.tags === undefined ? [] : form.tags
    item.Images = form.images === undefined ? [] : form.images
    return item
}

const itemToForm = (item: Item) => {
    console.log("itemDebug: ", item)
    const form: FormData = {
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
    }
    return form
}
