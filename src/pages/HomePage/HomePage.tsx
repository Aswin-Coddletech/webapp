import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "antd";
import ss from "./HomePage.module.scss";
//import melloonLogoBig from "src/assets/images/melloon-logo-banner.png";
import { ROUTES } from "../../constants/routes";
// import { colorMelloonPrimary } from "../../constants/colors";
// import { RewardsList } from "../../components/RewardsList/RewardsList";
// import { BelongingsList } from "../../components/BelongingsList/BelongingsList";
// import { LoanHomeList } from "../../components/LoanHomeList/LoanHomeList";
// import { SummaryList } from "../../components/SummaryList/SummaryList";

export interface IHomePageData {
  rewardsList: any[];
  loansList: any[];
  belongingsList: any[];
}
export interface IHomePageCallbacks {
  onInit(): any;
  getRewards(): any;
  getLoans(): any;
  getBelongings(): any;
}
export interface IHomePageProps
  extends IHomePageData,
    IHomePageCallbacks,
    RouteComponentProps {}
export class HomePage extends React.Component<IHomePageProps> {
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    //
    this.props.onInit();
    this.props.getBelongings();
    this.props.getLoans();
  }

  getLoans = () => {
    return <div>{this.props.history.push(ROUTES.LOANS)};</div>;
  };

  redirectToDashboard = ({ user, userEmail, isAuthenticated }) => {
    //redirecting to dilist page instead of dashboard
    return <div>{this.props.history.push(ROUTES.DI_LIST)};</div>;
  };

  // renderValue = () => {
  //   const IRewardsListHocData = {
  //     rewardsList: this.props.rewardsList
  //   };
  //   const IRewardsListHocCallback = {
  //     onInit: this.props.onInit
  //   };
  //   const IBelongingsListHocData = {
  //     belongingsList: this.props.belongingsList
  //   };
  //   const IBelongingsListHocCallback = {
  //     onInit: this.props.onInit
  //   };
  //   const ILoanHomeListHocData = {
  //     loansList: this.props.loansList
  //   };
  //   const ILoanHomeListHocCallback = {
  //     onInit: this.props.onInit
  //   };
  //   return (
  //     <Fragment>
  //       <Row justify="center" style={{ width: "100%" }}>
  //         <Col
  //           xs={24}
  //           style={{
  //             color: colorMelloonPrimary,
  //             padding: "0px 16px",
  //             textAlign: "left"
  //           }}
  //         >
  //           <SummaryList
  //             {...IRewardsListHocData}
  //             {...IRewardsListHocCallback}
  //           />
  //         </Col>
  //       </Row>
  //       <Row justify="center" style={{ width: "100%" }}>
  //         <Col
  //           xs={24}
  //           style={{
  //             color: colorMelloonPrimary,
  //             padding: "0px 16px",
  //             textAlign: "left"
  //           }}
  //         >
  //           <RewardsList
  //             {...IRewardsListHocData}
  //             {...IRewardsListHocCallback}
  //           />
  //         </Col>
  //       </Row>
  //       <Row justify="center" style={{ width: "100%" }}>
  //         <Col
  //           xs={24}
  //           style={{
  //             color: colorMelloonPrimary,
  //             padding: "0px 16px",
  //             textAlign: "left"
  //           }}
  //         >
  //           <LoanHomeList
  //             {...ILoanHomeListHocData}
  //             {...ILoanHomeListHocCallback}
  //           />
  //         </Col>
  //       </Row>
  //       <Row justify="center" style={{ width: "100%" }}>
  //         <Col
  //           xs={24}
  //           style={{
  //             color: colorMelloonPrimary,
  //             padding: "0px 16px",
  //             textAlign: "left"
  //           }}
  //         >
  //           <BelongingsList
  //             {...IBelongingsListHocData}
  //             {...IBelongingsListHocCallback}
  //           />
  //         </Col>
  //       </Row>
  //     </Fragment>
  //   );
  // };
  render() {
    //let current_time = new Date().getTime();

    return (
      <div className={ss.root}>
        <Row justify="center" align="middle">
          <Col>
            <h4>Home page update soon!!</h4>
          </Col>
        </Row>
        <Row justify="space-between" align="middle" style={{ width: "100%" }}>
          <Col
            xs={24}
            style={{
              textAlign: "center",
              justifyContent: "center"
            }}
          >
            {/* {this.renderValue()} */}
          </Col>
        </Row>
      </div>
    );
  }
}
