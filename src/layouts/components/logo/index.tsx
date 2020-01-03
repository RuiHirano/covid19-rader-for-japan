import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../../styles/theme";

interface LogoProps {
  title: string;
}

const LogoImage = styled.img`
  max-height: 30px;
  width: 30px;
  margin-right: 45px;

  @media (max-width: ${theme.breakpoints.values.sm}) {
    margin-right: 15px;
  }
`;

const HomeLink = styled(Link)`
  align-self: center;
  height: 30px;
`;

const Logo: FunctionComponent<LogoProps> = ({ title }) => {

  return (
    <HomeLink to={`/`}>
      <LogoImage alt={title} />
    </HomeLink>
  );
};

export default Logo;
