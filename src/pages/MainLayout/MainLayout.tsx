import { Layout, Spin, Menu } from "antd";
import React, { Component } from "react";

//Removed footer links
//import { Link } from 'react-router-dom';
//import { LINK_LABELS } from 'src/constants/labels';

import MainHeader from "src/components/MainHeader";
import { ROUTES, MAIN_MENU } from "src/constants/routes";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import esES from "antd/lib/locale-provider/es_ES";
import enGB from "antd/lib/locale-provider/en_GB";

import meesgaes_en from "../../constants/locale/en/allscreens_en.json";
import meesgaes_es from "../../constants/locale/es/allscreens_es.json";
import { flattenMessages } from "../../utils";

import ss from "./MainLayout.module.scss";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AuditOutlined,
  MoneyCollectOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  FileDoneOutlined,
  DeliveredProcedureOutlined,
  DollarOutlined
} from "@ant-design/icons";
//import logo from "src/assets/images/logo.png";
//import iconLogo from "src/assets/images/logo-old.png";
import { NavLink } from "react-router-dom";

const { Content, Header, Sider } = Layout;
const { SubMenu } = Menu;
const messages = {
  en: meesgaes_en,
  es: meesgaes_es
};

const antdLang = {
  en: enGB,
  es: esES
};

export interface IMainLayoutData {
  loading: boolean;
  isAuthenticated: Boolean;
  id_token_exp_time_millisec: number;
  refresh_token_exp_time_millisec: number;
  lang: string;
  userId: string;
  userEmail: string;
}
export interface IMainLayoutCallbacks {
  fetchNewTokens(): any;
  changeLanguage(lang: any): any;
  onFilterChange(status: string): any;
  onSearchFilterChange(filter: any): any;
  onPagenatationChange(page: number): any;
}

export interface ILocalState {
  collapsed: boolean;
  logoImg: boolean;
}

export interface IMainLayoutProps
  extends IMainLayoutData,
    IMainLayoutCallbacks {}
export class MainLayout extends Component<IMainLayoutProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      logoImg: true
    };
  }
  shouldComponentUpdate() {
    //console.log('in Main Layout shouldComponentUpdate');
    return true;
  }

  componentDidMount() {
    //console.log('in Main Layout componentDidMount');
  }

  redirectToLogin() {
    window.location.replace(ROUTES.LANDING_PAGE);
    return null;
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      logoImg: !this.state.logoImg
    });
  };

  navClick = label => {
    this.props.onPagenatationChange(1);
    switch (label) {
      case "Quotes Search":
      case "Device force-locking/force-unlocking":
      case "Segment Identity":
      case "KYC/CDC":
      case "User Search":
        let filterData = {};
        this.props.onSearchFilterChange(filterData);
        break;
      case "New Quotes":
        this.props.onFilterChange("CDC-STEP-NOT-DONE");
        break;
      case "Collateral Pickup/Register/Remote-Setup":
        this.props.onFilterChange("PENDING-REGISTRATION");
        break;
      case "Collateral Custody/Enrollment/Inhouse-Arrival":
        this.props.onFilterChange("PENDING-ENROLLMENT");
        break;
      case "Inspections(Inhouse/ Remote-Diagnostic)":
        this.props.onFilterChange("PENDING-INSPECTION");
        break;
      case "Approvals":
        this.props.onFilterChange("PENDING-APPROVAL");
        break;
      case "Signature/Documents":
        this.props.onFilterChange("PENDING-SIGNATURE");
        break;
      case "Device Search":
        this.props.onFilterChange("NOT-REGISTERED");
        break;
      case "Loans Search":
      case "Payorders":
      case "Installments":
      case "Repayments/Payback":
      case "Overdues":
        let loanFilterValue = {};
        this.props.onSearchFilterChange(loanFilterValue);
        break;
      case "Disbursal":
        this.props.onFilterChange("PAY-ORDER-NOT-CREATED");
        break;
    }
  };
  renderMenuIcon = iconsrc => {
    switch (iconsrc) {
      case "HomeOutlined":
        return <HomeOutlined />;
      case "AuditOutlined":
        return <AuditOutlined />;
      case "MoneyCollectOutlined":
        return <MoneyCollectOutlined />;
      case "BarChartOutlined":
        return <BarChartOutlined />;
      case "FileSearchOutlined":
        return <FileSearchOutlined />;
      case "FileDoneOutlined":
        return <FileDoneOutlined />;
      case "DeliveredProcedureOutlined":
        return <DeliveredProcedureOutlined />;
      case "DollarOutlined":
        return <DollarOutlined />;
      default:
        return <HomeOutlined />;
    }
  };

  rendereMenuItem = (path, iconsrc, label) => {
    return (
      <Menu.Item
        key={path}
        style={{
          lineHeight: 1,
          whiteSpace: "normal",
          height: "auto"
        }}
      >
        <NavLink
          to={path}
          onClick={() => this.navClick(label)}
          style={{ display: "flex", paddingTop: "6px", paddingBottom: "6px" }}
        >
          {this.renderMenuIcon(iconsrc)}
          <span>{label}</span>
        </NavLink>
      </Menu.Item>
    );
  };

  renderSubmenu = (mainMenu, children, iconsrc) => {
    sessionStorage.setItem("subemenu", mainMenu);
    return (
      <SubMenu
        key={mainMenu}
        title={
          <span>
            {this.renderMenuIcon(iconsrc)}
            <span>{mainMenu}</span>
          </span>
        }
      >
        {children.map(({ path, label, iconsrc }) =>
          this.rendereMenuItem(path, iconsrc, label)
        )}
      </SubMenu>
    );
  };

  render() {
    const { children } = this.props;
    let now = new Date().getTime();

    //give 15minutes per page;
    //if user is more than 15minutes on the page, and token expires in those 15min
    //and an api action occurs after token expiry, then api is likely to throw error
    //workaround is to have the api fetch the token - but for time being I am letting it be
    //another option is NOT using redux store all and always having the api fetch token

    if (
      !this.props.loading &&
      this.props.isAuthenticated &&
      now >= this.props.id_token_exp_time_millisec - 900000 &&
      now <= this.props.refresh_token_exp_time_millisec
    ) {
      console.log("In main layout calling fetchNewTokens");
      this.props.fetchNewTokens().then();
    }

    if (
      !this.props.loading &&
      this.props.isAuthenticated &&
      now > this.props.refresh_token_exp_time_millisec
    ) {
      window.location.replace(ROUTES.LANDING_PAGE);
      return null;
    }

    const IMainHeaderHocData = {
      lang: this.props.lang
    };

    const IMainHeaderCallback = {
      changeLang: this.props.changeLanguage
    };

    const filteredMenu = MAIN_MENU.filter(value => !value.hideMenuForMobileMvp);
    console.log("filteredMenu", filteredMenu);
    return (
      <ConfigProvider locale={antdLang[this.props.lang]}>
        <IntlProvider
          locale={this.props.lang}
          messages={flattenMessages(messages[this.props.lang])}
        >
          <div>
            <div style={{ zIndex: 1, width: "100%" }}>
              <MainHeader {...IMainHeaderHocData} {...IMainHeaderCallback} />
            </div>
            <Spin spinning={this.props.loading} />
            {!this.props.loading && (
              <Layout>
                <Sider
                  trigger={null}
                  width={240}
                  collapsible
                  collapsed={this.state.collapsed}
                  className={ss.test}
                >
                  {/* {this.state.logoImg && (
                    <div className={ss.logo}>
                      <img alt="" src={logo} className={ss.logoAlign} />
                    </div>
                  )}
                  {!this.state.logoImg && (
                    <div className={ss.iconLogo}>
                      <img alt="" src={iconLogo} />
                    </div>
                  )} */}
                  <Menu
                    theme="dark"
                    mode="inline"
                    //defaultOpenKeys={["Manage Quotes"]}
                    defaultSelectedKeys={[window.location.pathname]}
                    style={{ marginTop: "20px" }}
                  >
                    {filteredMenu.map(({ path, label, iconsrc, children }) =>
                      children.length > 0
                        ? this.renderSubmenu(label, children, iconsrc)
                        : this.rendereMenuItem(path, iconsrc, label)
                    )}
                  </Menu>
                </Sider>
                <Layout className={ss.siteLayout}>
                  <Header
                    className={ss.siteLayoutdocker}
                    style={{ padding: 0 }}
                  >
                    {React.createElement(
                      this.state.collapsed
                        ? MenuUnfoldOutlined
                        : MenuFoldOutlined,
                      {
                        onClick: this.toggle,
                        style: {
                          padding: "0 24px",
                          fontSize: "18px",
                          lineHeight: "1",
                          cursor: "pointer"
                        }
                      }
                    )}
                  </Header>
                  <Content
                    className={ss.siteLayoutBackground}
                    style={{
                      margin: "24px 16px",
                      padding: 24,
                      minHeight: 280
                    }}
                  >
                    {children}
                  </Content>
                </Layout>
              </Layout>
            )}
          </div>
        </IntlProvider>
      </ConfigProvider>
    );
    // }
  }
}
