import React, { ReactNode } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";

export const StyledHeader = styled.div`
    display: flex;
    background: ${theme.palette.background.default};
    flex-direction: column;
    height: 50px;
    border-bottom: 2px #ededed solid;

    @media (max-width: ${theme.breakpoints.values.sm}) {
        height: 7vh;
    }
`;

interface Props {
    children: ReactNode;
}

const Header: React.FC<Props> = props => {
    const { children } = props;

    return (
        <StyledHeader>
            <main>{children}</main>
        </StyledHeader>
    );
};

export default Header;
