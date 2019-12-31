import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";
interface Props {}
interface State {}

const Title = styled(Typography)`
	text-align: center
	margin: 50px
	width: 100%
	height: 100%

`;

const Description = styled(Typography)`
	text-align: center
	margin: 50px
	width: 100%
	height: 100%

`;

const HeaderContainer = styled.div`
	width: 100%
	height: 300px
`;

const HeaderTitle: React.FC = () => {
    return (
        <HeaderContainer>
            <Title variant="h2">Trading Manager</Title>
            <Description variant="h6">
                あなたの日々のFXや株、仮想通貨取引を記録し、自動的に分析をします。
                過去の取引を振り返ることで、効率よくトレードの質をあげることができます。
            </Description>
            <Divider />
        </HeaderContainer>
    );
};

export default HeaderTitle;
