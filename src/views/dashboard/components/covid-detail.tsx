import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Paper,
    Typography,
    Link,
    CardActionArea,
    CardMedia,
    CardActions,
    Button,
} from "@material-ui/core";
import covidImg from "./../../../assets/covid19-blue.png"


interface Props {
}

const CovidDetail: React.FC<Props> = props => {
    const { } = props

    return (
        <Card>
            <CardMedia
                style={{ height: 200 }}
                image={covidImg}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    新型コロナウィルス
            </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    発熱や上気道症状を引き起こすウイルスで、人に感染を起こすものは６種類あることが分かっています。そのうち、中東呼吸器症候群（MERS）や重症急性呼吸器症候群（SARS）などの、重症化傾向のある疾患の原因ウイルスも含まれています。それ以外の４種類のウイルスは、一般の風邪の原因の10～15％（流行期は35％）を占めます。
            </Typography>
            </CardContent>
            <CardActions>
                <Link href={"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/dengue_fever_qa_00001.html"}>{"コロナウィルスはどのようなウィルスですか？ (厚生労働省HP)"}</Link>
            </CardActions>
        </Card>
    );
};

export default CovidDetail;
