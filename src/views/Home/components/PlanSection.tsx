import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PlanCompareLayout from './PlanCompareLayout'
import PlanPriceLayout from './PlanPriceLayout'
import Title from './Title'
interface Props {
}
interface State {}

const useStyles = makeStyles(theme => 
  createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sub_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flexGrow: 1,
  },
}));


const PlanSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      	<Title title={"選べる3つのプラン"} color={"#FFFFFF"}/>
		    <Typography variant="h6" className={"description"}>
		      あなたにぴったりのプランをお選びください。
        </Typography>
        <div className={classes.sub_container}>
          <PlanPriceLayout 
            planName={"Free"}
            subtext={"まずは手軽に使ってみたい方へ"}
            price={"0"}
            benefits={["カレンダー機能","豊富な統計機能", "グラフ機能", "", ""]}
          />
          <PlanPriceLayout
            planName={"Standard"}
            subtext={"まずは手軽に使ってみたい方へ"}
            price={"0"}
            benefits={["Free Planの全ての機能","全ての広告を非表示", "画像容量が5MB/月", "検索・絞り込み統計機能", "統計に期待値と破産の確率追加"]}
          />
          <PlanPriceLayout
            planName={"Premium"}
            subtext={"全ての機能を使っていち早くレベルアップをしたい方へ"}
            price={"500"}
            benefits={["Standard Planの全ての機能","画像容量が無制限", "取引データのCSV抽出機能", "優先的なサポート", "Webアプリと同期可能に"]}
          />
        </div>
        <Divider />
        <Title title={"プラン比較"} color={"#FFFFFF"}/>
        <PlanCompareLayout 
          title={"Plan"} text1={"Free"} text2={"Standard"} text3={"Premium"}
        />
        <PlanCompareLayout 
          title={""} text1={"¥0/月"} text2={"¥300/月"} text3={"¥500/月"}
        />
        <Divider />
        <PlanCompareLayout 
          title={"カレンダー機能"} text1={"○"} text2={"○"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"統計機能"} text1={"○"} text2={"○"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"グラフ機能"} text1={"○"} text2={"○"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"取引履歴表示機能"} text1={"○"} text2={"○"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"取引詳細表示機能"} text1={"○"} text2={"○"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"検索/絞り込み機能"} text1={"×"} text2={"○"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"期待値・破産の確率"} text1={"×"} text2={"○"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"画像容量"} text1={"3GB/月"} text2={"5GB/月"} text3={"無制限"}
        />
        <PlanCompareLayout 
          title={"アプリ内広告"} text1={"表示"} text2={"非表示"} text3={"非表示"}
        />
        <PlanCompareLayout 
          title={"CSV抽出機能"} text1={"b"} text2={"b"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"Webアプリとの同期"} text1={"×"} text2={"×"} text3={"○"}
        />
        <PlanCompareLayout 
          title={"サポート"} text1={"○"} text2={"優先"} text3={"最優先"}
        />
        <Divider />
    </div>
 
  );
}

export default PlanSection;
