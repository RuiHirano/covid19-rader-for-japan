import React, { useEffect } from "react";
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
import { Setting, Profile } from "../../../../types";

// Container
interface ContainerProps {}
const AccountProfileContainer: React.FC<ContainerProps> = props => {
    const {} = props;
    const dispatch = useDispatch();
    const email = useSelector((state: AppState) => state.User.Setting.Email);
    const name = useSelector((state: AppState) => state.User.Profile.Name);
    console.log("account profile");
    /*const handleUpdateAccountProfile = (values: FormikValues) => {
        dispatch(
            userActions.updateAccountProfileAction({
                password: values.password
            })
        );
    };*/

    //const { isLoading, isFinishLoading } = useLoading(
    //    LoadingState.UPDATE_PASSWORD
    //);
    /*useEffect(() => {
        if (isFinishLoading) {
            //history.push("/dashboard");
        }
    }, [isLoading]);*/

    return <AccountProfile email={email} name={name} />;
};

export default withRouter(AccountProfileContainer);

// Presentational
interface Props {
    name: Profile["Name"];
    email: Setting["Email"];
}

export const AccountProfile: React.FC<Props> = props => {
    const { name, email } = props;

    const classes = useStyles();

    const user = {
        name: "Rui Hirano",
        email: "xxx@xxx.com",
        avatar: "/images/avatars/avatar_11.png"
    };

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <CardContent>
                <div className={classes.details}>
                    <div>
                        <Typography gutterBottom variant="h2">
                            {name}
                        </Typography>
                        <Typography
                            //className={classes.locationText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {email}
                        </Typography>
                    </div>
                    <Avatar className={classes.avatar} src={user.avatar} />
                </div>
                <div className={classes.progress}>
                    <Typography variant="body1">
                        Profile Completeness: 70%
                    </Typography>
                    <LinearProgress value={70} variant="determinate" />
                </div>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                >
                    Upload picture
                </Button>
                <Button variant="text">Remove picture</Button>
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
