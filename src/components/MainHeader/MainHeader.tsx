import { Dropdown, Menu, Row, Col, Select } from "antd";
import React, { Component, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";

import logo from "src/assets/images/finnu_logo.svg";
import ss from "./MainHeader.module.scss";

import { MAIN_MENU } from "src/constants/routes";
import { ROUTES } from "src/constants/routes";
import { colorMelloonPrimary } from "src/constants/colors";
import languages from "../../assets/json/languages.json";
import countries from "../../assets/json/countries.json";
import {
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  HomeOutlined,
  SafetyOutlined,
  DollarOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;
const { Option } = Select;

export interface IMainHeaderData {
  user: { [key: string]: any };
  isAuthenticated: Boolean;
  refresh_token_exp_time_millisec: Boolean;
  userEmail: string;
}

export interface IMainHeaderHocData {
  lang: any;
}

export interface IMainHeaderCallbacks {
  logout: any;
  login: any;
  signup: any;
  changetokens: any;
}

export interface IMainHeaderHocCallbacks {
  changeLang(data: any): any;
}

export interface ILocalState {
  country: any;
}

export interface IMainHeaderProps
  extends IMainHeaderData,
    IMainHeaderHocData,
    IMainHeaderHocCallbacks,
    IMainHeaderCallbacks {}

export class MainHeader extends Component<IMainHeaderProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      country:
        window.localStorage.getItem("country") != null
          ? window.localStorage.getItem("country")
          : process.env.REACT_APP_DEFAULT_COUNTRY,
    };
  }
  shouldComponentUpdate() {
    //console.log('main header component should update returning true');
    return true;
  }

  renderUnsignedMenu = ({ login, signup }) => {
    return (
      <Fragment>
        <Menu
          mode="horizontal"
          style={{ display: "flex", float: "right", verticalAlign: "middle" }}
        >
          <Menu.Item key="login">
            <LoginOutlined className={ss.imageaction} onClick={login} />
          </Menu.Item>
        </Menu>
        {/* login n signup moved to landing page 
      <Button className={ss.action} style={{marginLeft:'10px'}} onClick={signup}>
        Sign up
      </Button>
      <Button className={ss.action} onClick={login}>
        Login
      </Button> */}
      </Fragment>
    );
  };

  renderSignedInMenuBlue = ({ logout }) => (
    <Fragment>
      <div>
        <Dropdown
          className={ss.dropdown}
          trigger={["click"]}
          placement="bottomRight"
          overlay={
            <Menu>
              {this.renderBlueBurgerMenu()}

              {/* <Menu.Divider />

              <Menu.Item key="11" className={ss.disabledblue} disabled>
                <GlobalOutlined style={{ marginRight: "10px" }} /> EURO (€)
              </Menu.Item>

              <Menu.Item key="22" className={ss.disabledblue} disabled>
                <SettingOutlined style={{ marginRight: "10px" }} /> Settings
              </Menu.Item> */}

              <Menu.Divider />

              <Menu.Item key="1111" style={{ color: colorMelloonPrimary }}>
                <UserOutlined style={{ marginRight: "10px" }} />
                {this.props.isAuthenticated
                  ? this.props.user["email"] ||
                    this.props.userEmail ||
                    "local@melloon.com"
                  : "you-are-not-logged-in@melloon.com"}
              </Menu.Item>

              <Menu.Item key="4444" onClick={logout}>
                <LogoutOutlined />
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          }
        >
          <div>
            <MenuOutlined />
          </div>
        </Dropdown>
      </div>
    </Fragment>
  );

  renderMenuIcon = (iconsrc) => {
    switch (iconsrc) {
      case "HomeOutlined":
        return (
          <HomeOutlined />
        );
      case "SafetyOutlined":
        return (
          <SafetyOutlined />
        );
      case "DollarOutlined":
        return (
          <DollarOutlined />
        );
      case "SolutionOutlined":
        return (
          <SolutionOutlined />
        );
      default:
        return (
          <HomeOutlined />
        );
    }
  };

  renderBurgerMenu = () => {
    const filteredMenu = MAIN_MENU.filter(
      (value) => !value.hideMenuForMobileMvp
    );
    let i = 0;
    for (i = 0; i < filteredMenu.length; i++) {
      let j = 0;
      for (j = 0; j < filteredMenu[i].children.length; j++) {
        if (filteredMenu[i].children[j]["hideMenuForMobileMvp"]) {
          filteredMenu[i].children.splice(j, 1);
        }
      }
    }

    // return filteredMenu.map(({ path, label, iconsrc, children, disabled }) =>
    //   children && children.length ? (
    //     <SubMenu
    //       className={ss.dropdownmenu}
    //       title={
    //         <NavLink to={path}>
    //           {this.renderMenuIcon(iconsrc)}
    //           <span>{label}</span>
    //         </NavLink>
    //       }
    //       key={path}
    //     >
    //       {children.map(({ path, label }) => (
    //         <Item key={path}>
    //           <NavLink to={path}>{label}</NavLink>
    //         </Item>
    //       ))}
    //     </SubMenu>
    //   ) : (
    //     <Item key={path} disabled={disabled}>
    //       <Link to={path}>
    //         {this.renderMenuIcon(iconsrc)}
    //         <span>{label}</span>
    //       </Link>
    //     </Item>
    //   )
    // );
  };

  renderBlueBurgerMenu = () => {
    const filteredMenu = MAIN_MENU.filter(
      (value) => !value.hideMenuForMobileMvp
    );
    let i = 0;
    for (i = 0; i < filteredMenu.length; i++) {
      let j = 0;
      for (j = 0; j < filteredMenu[i].children.length; j++) {
        if (filteredMenu[i].children[j]["hideMenuForMobileMvp"]) {
          filteredMenu[i].children.splice(j, 1);
        }
      }
    }

    return filteredMenu.map(({ path, label, iconsrc, children, disabled }) =>
      children && children.length ? (
        <SubMenu
          className={ss.dropdownmenu}
          title={
            <span >
              {this.renderMenuIcon(iconsrc)}
              {label}
            </span>
          }
          key={label}
        >
          {children.map(({ path, label }) => (
            <Item key={label}>
              <NavLink to={path}>
                {" "}
                <span> {label} </span>
              </NavLink>
            </Item>
          ))}
        </SubMenu>
      ) : (
        <Item key={label} disabled={disabled}>
          <Link to={path}>
            {this.renderMenuIcon(iconsrc)}
            <span>{label}</span>
          </Link>
        </Item>
      )
    );
  };

  handleChange = (value) => {
    this.props.changeLang(value);
  };

  handleCountryChange = (value) => {
    this.setState({ country: value }, () => {
      window.localStorage.setItem("country", value);
      window.location.reload();
    });
  };

  renderLocalization = () => {
    return (
      <Select
        style={{ width: 70 }}
        onChange={this.handleChange}
        value={this.props.lang}
      >
        {languages.map((lang, i) => (
          <Option key={i} value={lang.value}>
            {lang.text}
          </Option>
        ))}
      </Select>
    );
  };

  renderSelectCountry = () => {
    return (
      <Select
        style={{ width: 100 }}
        onChange={this.handleCountryChange}
        value={this.state.country}
      >
        {countries.map((item, i) => (
          <Option key={i} value={item.code}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  };

  redirectHome = () => {
    window.location.replace(ROUTES.LANDING_PAGE);
  };

  render() {
    return (
      <Fragment>
        <Row
          justify="space-between"
          className={ss.header}
        >
          <Col xs={12} className={ss.logo} onClick={this.redirectHome}>
            <div className={ss.logo}>
              <img
                alt=""
                src={logo}
                style={{
                  height: "28px",
                  width: "105px",
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
              />
            </div>
          </Col>
          <Col xs={12} className={ss.burger} style={{ textAlign: "right" }}>
            <div className={ss.locale}>{this.renderSelectCountry()}</div>
            {this.props.isAuthenticated
              ? this.renderSignedInMenuBlue(this.props)
              : this.renderUnsignedMenu(this.props)}
          </Col>
        </Row>
      </Fragment>
    );
  }
}
