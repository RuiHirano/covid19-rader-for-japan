import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { NavContainer } from "./style";
import {
    AppBar,
    Toolbar,
    Badge,
    Hidden,
    IconButton,
    Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = ({}) => (
    <NavContainer>
        <Button />
    </NavContainer>
);

export default Navigation;
