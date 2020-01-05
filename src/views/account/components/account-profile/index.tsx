import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    LinearProgress
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { AppState } from "../../../../redux/module";
import {
    Setting,
    Profile,
    User,
    Image,
    ImageStatus,
    LoadingState
} from "../../../../types";
import myAvatar from "../../../../app/assets/app_icon.png";
import Dropzone from "react-dropzone";
import { userActions } from "../../../../redux/saga/user";
import { useLoading } from "../../../../common/hooks/useLoading";

// Container
interface ContainerProps {}
const AccountProfileContainer: React.FC<ContainerProps> = props => {
    const {} = props;
    const dispatch = useDispatch();

    const user: User = useSelector((state: AppState) => state.User);
    const isLoading: boolean = useSelector(
        (state: AppState) => state.App.Loading.IsLoading
    );
    console.log("account profile");
    const handleUpdateUser = (user: User) => {
        dispatch(
            userActions.updateUserAction({
                user: user,
                loadingStatus: LoadingState.UPDATE_PROFILE
            })
        );
    };

    const callback = (nowLoading: boolean, finishLoading: boolean) => {
        if (nowLoading) {
            console.log("loading now");
        } else if (finishLoading) {
            console.log("finish loading");
        }
    };

    useLoading(LoadingState.UPDATE_PROFILE, callback);

    const handleRemoveThumbnail = () => {
        //Status: DELETEでfire-storageから削除
        user.Profile.Thumbnail.status = ImageStatus.DELETE;
        handleUpdateUser(user);
    };
    const handleUploadThumbnail = (img: Image) => {
        // storageに保存
        user.Profile.Thumbnail = img;
        handleUpdateUser(user);
    };

    return (
        <AccountProfile
            user={user}
            handleRemoveThumbnail={handleRemoveThumbnail}
            handleUploadThumbnail={handleUploadThumbnail}
        />
    );
};

export default withRouter(AccountProfileContainer);

// Presentational
interface Props {
    user: User;
    handleRemoveThumbnail: () => void;
    handleUploadThumbnail: (img: Image) => void;
}

export const AccountProfile: React.FC<Props> = props => {
    const { user, handleRemoveThumbnail, handleUploadThumbnail } = props;

    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <div className={classes.details}>
                    <div>
                        <Typography gutterBottom variant="h2">
                            {user.Profile.Name}
                        </Typography>
                        <Typography
                            //className={classes.locationText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {user.Setting.Email}
                        </Typography>
                    </div>
                    <Avatar
                        className={classes.avatar}
                        src={
                            user.Profile.Thumbnail.url === ""
                                ? myAvatar
                                : user.Profile.Thumbnail.url
                        }
                    />
                </div>
            </CardContent>
            <Divider />
            <CardActions>
                <Dropzone
                    onDrop={(acceptedFiles: File[]) => {
                        const fileData = acceptedFiles[0];
                        var reader = new FileReader();
                        // ファイル読み込みに成功したときの処理
                        reader.onload = function() {
                            const url = reader.result;
                            if (!(url instanceof ArrayBuffer) && url !== null) {
                                // 同じIDで上書きする
                                const img: Image = {
                                    id: user.Profile.Thumbnail.id,
                                    url: url,
                                    size: fileData.size,
                                    status: ImageStatus.UPDATE
                                };
                                handleUploadThumbnail(img);
                            }
                        };
                        // ファイル読み込みを実行
                        reader.readAsDataURL(fileData);
                    }}
                    accept="image/jpeg,image/png,image/jpg"
                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Button
                                    className={classes.uploadButton}
                                    color="primary"
                                    variant="text"
                                >
                                    Upload picture
                                </Button>
                            </div>
                        </section>
                    )}
                </Dropzone>

                <Button variant="text" onClick={() => handleRemoveThumbnail()}>
                    Remove picture
                </Button>
            </CardActions>
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    details: {
        display: "flex"
    },
    avatar: {
        marginLeft: "auto",
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    progress: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    }
}));
