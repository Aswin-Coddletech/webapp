import * as React from "react";
import { Fragment } from "react";
import {
  Card,
  Descriptions,
  Row,
  Col,
  Table,
  Timeline,
  Collapse,
  Button
} from "antd";
import { ClockCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { IShop } from "src/interfaces/Shop.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import ss from "./ShopCard.module.scss";

const { Column } = Table;
const { Panel } = Collapse;

export interface IShopCardData {}

export interface IShopCardHocData {
    loading: boolean;
    shop: IShop;
    userAccount: IUserAccount;
}

export interface IShopCardCallbakcs {}

export interface ILocalState {
    screenOption: number;
}

export interface IShopCardProps 
    extends IShopCardData,
        IShopCardCallbakcs,
        IShopCardHocData {}

export class ShopCard extends React.Component<IShopCardProps,ILocalState> {
    constructor(props) {
        super(props);
        this.state = {
          screenOption: 1
        };
    }

    renderTitle = shopId => {
        // eslint-disable-next-line
        let t = shopId != undefined ? "Shop#:" + "\xa0" + shopId : "";
        return t;
    };

    renderStrokeColor = score => {
        return score > 600 ? `rgba(220, 20, 60, ${score / 100})` : `#0E86D4`;
    };

    renderShopStatus = status => {
        let val = 'Shop Status: ';
        return val+status
    }

    
}