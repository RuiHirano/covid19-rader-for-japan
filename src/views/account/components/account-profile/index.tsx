import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import {
    User,
    Image,
    ImageStatus,
} from "../../../../types";
import myAvatar from "../../../../app/assets/app_icon.png";
import Dropzone from "react-dropzone";
import { useUpdateUserInfo } from "../../../../redux/hooks/useUser";
import { ReduxState } from "../../../../redux/module";

// Container
interface ContainerProps {}
const AccountProfileContainer: React.FC<ContainerProps> = props => {
    const {} = props;
    const dispatch = useDispatch();
    const {updateUserInfo, status} = useUpdateUserInfo()

    const user: User = useSelector((state: ReduxState) => state.User);

    const handleRemoveThumbnail = () => {
        //Status: DELETEでfire-storageから削除
        user.Profile.Thumbnail.Status = ImageStatus.DELETE;
        updateUserInfo(user);
    };
    const handleUploadThumbnail = (img: Image) => {
        // storageに保存
        user.Profile.Thumbnail = img;
        updateUserInfo(user);
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
                            user.Profile.Thumbnail.Url === ""
                                ? myAvatar
                                : user.Profile.Thumbnail.Url
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
                                    ID: user.Profile.Thumbnail.ID,
                                    Path: "",
                                    Url: url,
                                    Size: fileData.size,
                                    Status: ImageStatus.UPDATE
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
