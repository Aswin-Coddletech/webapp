import React, { Fragment } from "react";
import { Table, Popconfirm, Row, Col, Button, Spin } from "antd";

//import { Badge } from 'antd';

import currency from "currency.js";
import moment from "moment";
import jsonwebtoken from "jsonwebtoken";

import ItemCard from "src/components/ItemCard";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IInventory } from "src/interfaces/Inventory.interface";

import ss from "./DiList.module.scss";
import { Redirect } from "react-router-dom";

import { ROUTES } from "src/constants/routes";
import { colorMelloonPrimary } from "src/constants/colors";

import {
  RightOutlined,
  SafetyOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DoubleLeftOutlined
} from "@ant-design/icons";

const { Column } = Table;
export interface IDiListData {
  loading: boolean;
  list: IInventory[];
  item: IInventory;
  total: number;
  page: number;
  pageSize: number;
}

export interface IDiListCallbacks {
  changePagination: any;
  changePageSize: any;
  changeSelectedItem(item: IInventory): any;
}
export interface IDiListProps extends IDiListData, IDiListCallbacks {}
export interface ILocalState {
  screenOption: number;
  token: any;
}
export class DiList extends React.Component<IDiListProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1,
      token: window.localStorage.getItem("token")
    };
  }

  renderRow = (itemId: string, row, rowIndex) => {
    return (
      <Fragment key={itemId}>
        <Row style={{ width: "100%" }} justify="start">
          <Col xs={23}>
            <Row>
              <Col>
                {this.renderImage(row.primaryImageSource, row, rowIndex)}
              </Col>
              <Col style={{ paddingLeft: "10px" }}>
                <Row>
                  <Col>{row.oemProductModel}</Col>
                </Row>
                <Row>
                  <Col>{row.oem}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={1}>
            <RightOutlined />
          </Col>
        </Row>

        <Row justify="space-between" align="middle" style={{ width: "100%" }}>
          <Col>
            <span>
              {" "}
              Initial Value: &nbsp; {this.renderPurchasePrice(
                row.buyAmount
              )}{" "}
            </span>
          </Col>
          <Col>
            {typeof row["equipmentCover"] !== "undefined" &&
            row.equipmentCover === true ? (
              <Button
                type="primary"
                style={{ color: "green", marginBottom: "2px", width: "110px" }}
                disabled
              >
                <SafetyOutlined style={{ paddingRight: "2px" }} />
                Insured!
              </Button>
            ) : (
              <Button
                type="primary"
                style={{
                  cursor: "pointer",
                  marginBottom: "2px",
                  width: "110px"
                }}
                onClick={e => this.redirectToInsureItem(e, row)}
              >
                <SafetyOutlined style={{ paddingRight: "2px" }} />
                Insure it!
              </Button>
            )}
          </Col>
        </Row>

        <Row justify="space-between" align="middle" style={{ width: "100%" }}>
          <Col>
            <span> Current Value: &nbsp; {this.renderPurchasePrice(100)} </span>
          </Col>
          <Col>
            {typeof row["isPawned"] !== "undefined" && row.isPawned === true ? (
              <Button
                type="primary"
                style={{ color: "green", width: "110px" }}
                disabled
              >
                <SafetyOutlined style={{ paddingRight: "2px" }} />
                Pawned!
              </Button>
            ) : (
              <Button
                type="primary"
                style={{ cursor: "pointer", width: "110px" }}
                onClick={e => this.redirectToPawnItem(e, row)}
              >
                <SafetyOutlined style={{ paddingRight: "2px" }} />
                Pawn it!
              </Button>
            )}
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderImage = (primaryImageSource: string, row, rowIndex) => {
    //let prefix = "https://melloon-user-uploads.s3.eu-central-1.amazonaws.com/";
    //let url = prefix + primaryImageSource;

    let publicurl =
      "https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg";
    //let sourceurl = row.base64imageUrl ? row.base64imageUrl : publicurl;
    let sourceurl = row.presignedImageUrl ? row.presignedImageUrl : publicurl;

    return (
      <div className={ss.thumbnail}>
        <img
          className={ss.thumbnail}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            objectFit: "contain"
          }}
          src={sourceurl}
          alt={"item"}
        />
      </div>
    );
  };

  renderID = (item_id: string) => item_id;

  renderCreateDate = (created_at: string) =>
    moment(created_at).format("DD.MM.YYYY");

  renderPurchasePrice = (purchase_price: number) => {
    const amountFormatted = currency(purchase_price, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  renderHomeCover = (home_cover: boolean) => {
    const cover_value = home_cover ? "yes" : "no";
    return `${cover_value}`;
  };

  renderEquipmentCover = (equipment_cover: boolean) => {
    const cover_value = equipment_cover ? "yes" : "no";
    return `${cover_value}`;
  };

  renderIsPawned = (isPawned: boolean) => {
    const is_pawned = isPawned ? "yes" : "no";
    return `${is_pawned}`;
  };

  renderActions = (field, row, rowIndex) => {
    return (
      <div className={ss.actions}>
        <EyeOutlined className={ss.action} onClick={() => {}} />
      </div>
    );
  };

  renderActionsOld = ({
    _key,
    item_id,
    item_name
  }: {
    _key: string;
    item_id: string;
    item_name: string;
  }) => (
    <div className={ss.actions}>
      <a href="http://localhost:3000/diedit">
        <EditOutlined className={ss.action} />
      </a>
      <Popconfirm
        placement="bottomRight"
        title={`Are you sure you want to remove the Inventory Item "${item_name}"?`}
        okText="Yes"
        cancelText="No"
        onConfirm={() => true}
      >
        <DeleteOutlined className={ss.action} />
      </Popconfirm>
    </div>
  );

  renderFullTable() {
    const { list, loading, total, page, pageSize } = this.props;
    const { changePagination, changePageSize } = this.props;
    return (
      <Fragment>
        {this.renderTitleAndNavigationButtons()}

        <Table
          loading={loading}
          rowKey="itemId"
          dataSource={list}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                this.toggleItemCard(record);
              }
            };
          }}
          style={{ cursor: "pointer" }}
          pagination={{
            onChange: changePagination,
            total,
            current: page,
            pageSize,
            pageSizeOptions: ["5", "10", "50"],
            showSizeChanger: true,
            onShowSizeChange: changePageSize
          }}
        >
          <Column
            dataIndex="primaryImageSource"
            title="Image"
            render={this.renderImage}
          />
          <Column
            dataIndex="itemId"
            title="ID"
            key="itemId"
            render={this.renderID}
            className={ss.hideMe}
          />
          <Column
            dataIndex="createdAt"
            title="Created Date"
            render={this.renderCreateDate}
            className={ss.hideMe}
          />
          <Column
            dataIndex="category"
            title="Category"
            className={ss.hideMeForMobile}
          />
          <Column
            dataIndex="subcategory"
            title="Sub Category"
            className={ss.hideMeForMobile}
          />
          <Column
            dataIndex="oem"
            title="Manufacturer (OEM)"
            className={ss.hideMeForMobile}
          />
          <Column dataIndex="oemProductModel" title="Product" />
          <Column
            dataIndex="oemSerialNumber"
            title="Product Serial Number"
            className={ss.hideMeForMobile}
          />
          <Column
            dataIndex="buyAmount"
            title="Cost"
            render={this.renderPurchasePrice}
          />
          <Column
            dataIndex="homeCover"
            title="Home Cover?"
            render={this.renderHomeCover}
            className={ss.hideMeForSmallScreen}
          />
          <Column
            dataIndex="equipmentCover"
            title="Equipment Cover?"
            render={this.renderEquipmentCover}
            className={ss.hideMeForSmallScreen}
          />
          <Column
            dataIndex="isPawned"
            title="Is Pawned?"
            render={this.renderIsPawned}
            className={ss.hideMeForSmallScreen}
          />
          <Column
            title="Actions"
            render={this.renderActions}
            className={ss.hideMeForMobile}
          />
        </Table>
      </Fragment>
    );
  }

  renderMobileTable() {
    const { list, loading, total, page, pageSize } = this.props;
    const { changePagination, changePageSize } = this.props;

    if (list.length <= 0) {
      return (
        <Fragment>
          <Row justify="center">
            <Col>
              <h3
                style={{
                  color: colorMelloonPrimary,
                  fontWeight: "bold",
                  paddingBottom: "8px"
                }}
              >
                Your Belongings
              </h3>
            </Col>
          </Row>

          <Row justify="center">
            <Col
              style={{
                textAlign: "center",
                paddingTop: "10px",
                paddingBottom: "20px"
              }}
            >
              <Spin spinning={loading}>
                {!loading && <span> You have not yet added any items </span>}
              </Spin>
            </Col>
          </Row>

          {this.renderTitleAndNavigationButtons()}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {this.renderSummaryAndNavigationButtons(list)}

          <Table
            showHeader={false}
            loading={loading}
            rowKey="itemId"
            dataSource={list}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  this.toggleItemCard(record);
                }
              };
            }}
            style={{
              cursor: "pointer",
              paddingLeft: "2px",
              paddingRight: "2px"
            }}
            //scroll={{ y: 400 }}
            pagination={{
              onChange: changePagination,
              total,
              current: page,
              pageSize,
              pageSizeOptions: ["5", "10", "50"],
              showSizeChanger: true,
              onShowSizeChange: changePageSize
            }}
          >
            <Column
              dataIndex="itemId"
              title="ID"
              key="itemId"
              render={this.renderRow}
            />
          </Table>
        </Fragment>
      );
    }
  }

  renderTable() {
    let showFullTable = false;

    if (showFullTable) {
      return this.renderFullTable();
    } else {
      return this.renderMobileTable();
    }
  }

  renderSummaryAndNavigationButtons = list => {
    if (this.state.screenOption === 1) {
      let totalAmount = list.reduce((acc, row) => {
        return acc + row.buyAmount;
      }, 0);

      return (
        <div className={ss.summary}>
          <Row justify="center">
            <Col>
              <h3
                style={{
                  color: colorMelloonPrimary,
                  fontWeight: "bold",
                  paddingBottom: "8px"
                }}
              >
                Your Belongings
              </h3>
            </Col>
          </Row>
          <Row justify="space-between" align="middle">
            <Col>
              <Row justify="start" style={{ paddingLeft: "5px" }}>
                <Col>
                  <span style={{ paddingRight: "5px" }}> Total Items: </span>{" "}
                  <span> {list.length}</span>
                </Col>
              </Row>
              <Row justify="start" style={{ paddingLeft: "5px" }}>
                <Col>
                  <span style={{ paddingRight: "5px" }}> Total Value: </span>{" "}
                  <span> {this.renderPurchasePrice(totalAmount)}</span>
                </Col>
              </Row>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Button
                type="primary"
                onClick={() => this.redirectToAddItem()}
                style={{ marginRight: "5px" }}
              >
                <PlusOutlined style={{ paddingRight: "5px" }} />
                Add Product
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
  };

  renderTitleAndNavigationButtons = () => {
    if (this.state.screenOption === 1) {
      return (
        <Fragment>
          <Row justify="center">
            <Col style={{ textAlign: "center" }}>
              <Button
                type="primary"
                onClick={() => this.redirectToAddItem()}
                style={{ marginRight: "5px", width: "200px" }}
              >
                <PlusOutlined style={{ paddingRight: "20px" }} />
                Add Product
              </Button>
            </Col>
          </Row>
        </Fragment>
      );
    } else if (this.state.screenOption === 2) {
      return (
        <Fragment>
          <Row justify="end">
            <Col style={{ textAlign: "right" }}>
              <Button
                type="primary"
                onClick={() => this.toggleList()}
                style={{
                  marginRight: "16px",
                  width: "110px",
                  paddingRight: "0px",
                  paddingLeft: "0px"
                }}
              >
                <DoubleLeftOutlined /> Product List
              </Button>
            </Col>
          </Row>
        </Fragment>
      );
    }
  };

  renderItemCard = () => {
    return (
      <Fragment>
        {this.renderTitleAndNavigationButtons()}
        <Row align="top">
          <Col xs={24}>
            <ItemCard />
          </Col>
        </Row>
      </Fragment>
    );
  };

  toggleItemCard = (item: IInventory) => {
    this.props.changeSelectedItem(item);

    this.setState({
      screenOption: 2
    });
  };

  toggleList = () => {
    this.setState({
      screenOption: 1
    });
  };

  getUserEmail = (token: any) => {
    let userEmail = null;
    if (token != null) {
      const data = jsonwebtoken.decode(token);
      if (data != null) userEmail = data!["email"];
    }
    return userEmail;
  };

  redirectToAddItem = () => {
    this.setState({
      screenOption: 3
    });
  };

  redirectToInsureItem = (e, row) => {
    e.stopPropagation();
    this.props.changeSelectedItem(row);
    this.setState({
      screenOption: 6
    });
  };

  redirectToPawnItem = (e, row) => {
    e.stopPropagation();
    this.props.changeSelectedItem(row);
    this.setState({
      screenOption: 7
    });
  };

  render() {
    switch (this.state.screenOption) {
      case 1:
        return this.renderTable();
      case 2:
        return this.renderItemCard();
      case 3:
        return <Redirect to={ROUTES.DI_ADD} push={true} />;
      case 6:
        return (
          <Redirect
            push={true}
            to={{
              pathname: "/insurance/new",
              state: {
                option: "item",
                policyType: "equipment",
                item: this.props.item
              }
            }}
          />
        );
      case 7:
        return (
          <Redirect
            push={true}
            to={{
              pathname: "/loans/new",
              state: {
                option: "item",
                loanType: "equipment",
                item: this.props.item
              }
            }}
          />
        );
      default:
        break;
    }
  }
}
