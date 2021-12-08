import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import ss from "./MainMenu.module.scss";

const { SubMenu, Item } = Menu;

export class MainMenu extends PureComponent {
  static propTypes = exact({
    routes: PropTypes.array.isRequired,
    selectedKeys: PropTypes.array.isRequired
  });

  render() {
    const { routes, selectedKeys } = this.props;

    // eslint-disable-next-line no-console
    console.log(routes, selectedKeys);

    return (
      <Menu
        selectedKeys={selectedKeys}
        openKeys={selectedKeys}
        className={ss.MainMenu}
        mode="inline"
        multiple={false}
      >
        {routes.map(({ path, label, children, key, disabled }) =>
          children && children.length ? (
            <SubMenu title={<Link to={path}> {label}</Link>} key={key}>
              {children.map(({ path, label, key }) => (
                <Item key={key}>
                  <Link to={path}>{label}</Link>
                </Item>
              ))}
            </SubMenu>
          ) : (
            <Item key={key}>
              <Link to={path} disabled={disabled}>
                {label}
              </Link>
            </Item>
          )
        )}
      </Menu>
    );
  }
}
