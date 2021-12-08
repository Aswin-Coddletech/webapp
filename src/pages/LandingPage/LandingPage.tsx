import React, { Fragment } from "react";
import { RouteComponentProps } from "react-router";
//import { Link } from 'react-router-dom';
import { Row, Col, Button, List, Avatar, Steps } from "antd";
import ss from "./LandingPage.module.scss";
import melloonLogoBig from "src/assets/images/melloon-logo-banner.png";
import { ROUTES } from "src/constants/routes";
import { CheckOutlined, CopyrightOutlined } from "@ant-design/icons";

//import Intercom from "react-intercom";

const { Step } = Steps;
export interface ILandingPageData {
  user: { [key: string]: any };
  isAuthenticated: Boolean;
  id_token_exp_time_millisec: number;
  refresh_token_exp_time_millisec: number;
  userEmail: string;
}
export interface ILandingPageCallbacks {
  logout: any;
  login: any;
  signup: any;
  fetchNewTokens(): any;
}
export interface ILandingPageProps
  extends ILandingPageData,
    ILandingPageCallbacks,
    RouteComponentProps {}
export class LandingPage extends React.Component<ILandingPageProps> {
  componentWillMount() {
    let now = new Date().getTime();

    console.log(
      "in Landing page component will mount; isAuth, id_token_exp_time_millisec, refresh_token_exp_time_millisec, now",
      this.props.isAuthenticated,
      this.props.id_token_exp_time_millisec,
      this.props.refresh_token_exp_time_millisec,
      now
    );
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    //
    let current_time = new Date().getTime();
    if (this.props.refresh_token_exp_time_millisec != null) {
      if (
        this.props.isAuthenticated &&
        current_time < this.props.refresh_token_exp_time_millisec
      ) {
        this.props.history.push(ROUTES.HOME);
      }
    }
  }

  getInstantQuote = () => {
    return <div>{this.props.history.push(ROUTES.INSTANT_QUOTE)};</div>;
  };

  renderUnsignedMenu = ({ login, signup }) => {
    return (
      <Fragment>
        <Row gutter={16} justify="center" className={ss.buttonContainer}>
          {/* <Col span={24}>
            <Button
              onClick={signup}
              size="large"
              shape="round"
              className={ss.signButton}>
              Sign up
            </Button>
          </Col> */}
          <Col span={24}>
            <p>You already have an account?</p>
            <Button
              onClick={login}
              size="large"
              shape="round"
              className={`${ss.signButton} ${ss.signInButton}`}
            >
              Sign in
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderValue = () => {
    return (
      <Fragment>
        <Row justify="center" style={{ padding: "24px" }}>
          <Col xs={24} className={ss.infoItem}>
            <h2>Why use Melloon?</h2>
            <p>
              Melloon is the easiest way to get a short term loan, without
              leaving home.
            </p>
            <List size="small">
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size="small" icon={<CheckOutlined />} />}
                  title="Avoid expensive cash loan providers"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size="small" icon={<CheckOutlined />} />}
                  title="Save time and do the process online"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size="small" icon={<CheckOutlined />} />}
                  title="Get a Melloon Payment Card and use your loan as it pleases you"
                />
              </List.Item>
            </List>
          </Col>
          <Col span={24} className={ss.infoItem}>
            <h2>How Does it work?</h2>
            <p>
              You need short term liquidity? Follow the next steps and get the
              best loan with just a few clicks!
            </p>
            <Steps direction="vertical" size="small" current={0}>
              <Step
                title="Add items"
                description="Upload items you may pawn into your personal item wallet"
              />
              <Step
                title="Choose the item(s) you want to pawn"
                description="Get our short term loan offer, pawn your item(s) and schedule a
              pick up date / time"
              />
              <Step
                title="Get your cash loan!"
                description="We pick up the pawned item(s) and deliver you the loan on a
              Melloon Payment Card"
              />
            </Steps>
          </Col>
          <Col xs={24} className={ss.infoItem}>
            <h2>Security?</h2>
            <p>
              Melloon is 100% safe, no other user will have access to what you
              store in your private area.
            </p>
            <p>
              We do not share your informations with any orther service or
              partner. You are the only one with access to it.
            </p>
          </Col>
        </Row>
      </Fragment>
    );
  };
  render() {
    //const appId = process.env.REACT_APP_INTERCOM_APPID;
    return (
      <div className={ss.root}>
        <Row>
          <Col xs={24} lg={12} className={ss.banner}>
            <Row>
              <Col span={24}>
                <img src={melloonLogoBig} alt={"logo"} className={ss.logo} />
                <h1 className={ss.headerForMobile}>Back Office</h1>
              </Col>
              <Col span={24}>{this.renderUnsignedMenu(this.props)}</Col>
            </Row>
          </Col>
          <Col xs={24} lg={12}>
            {this.renderValue()}
          </Col>
        </Row>

        <Row>
          <Col>
            <Row className={ss.footerbanner}>
              <Col className={ss.footerName}>
                <CopyrightOutlined style={{ paddingRight: "5px" }} /> Melloon
                GmbH. Germany.
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
