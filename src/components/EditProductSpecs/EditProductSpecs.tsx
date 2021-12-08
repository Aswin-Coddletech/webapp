import React, { Fragment } from "react";
import {
  Row,
  Col,
  Select,
  Input,
  InputNumber,
  Tag,
  Tooltip,
  Checkbox
} from "antd";

import ss from "./EditProductSpecs.module.scss";
import { ITag } from "src/interfaces/Inventory.interface";

import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";

import { CATEGORIES } from "src/constants/inventory";
import { CATALOG_ITEMS } from "src/constants/inventory";

const Option = Select.Option;

const categoriesData = CATEGORIES;
const categoryList = categoriesData.map(row => row.category);

const catalogData = CATALOG_ITEMS;
const catalogList = catalogData;
export interface IEditProductSpecsData {
  category: string;
  subcategory: string;
  oem: string;
  oemProductModel: string;
  oemSerialNumber: string;
  selectedLabels: [];
  descriptionLabels: ITag[];
  buyAmount: number;
  //productSpecs: IInventory,
  loading: boolean;
}
//€
export interface IEditProductSpecsCallbacks {
  changeCategory(value: string): void;
  changeSubcategory(value: string): void;
  changeOem(value: string): void;
  changeOemProductModel(value: string): void;
  changeOemSerialNumber(value: string): void;
  changeTags(value: ITag[]): void;
  changeBuyAmount(value: number): void;
}

export interface IEditProductSpecsProps
  extends IEditProductSpecsData,
    IEditProductSpecsCallbacks {}

export interface ILocalState {
  subcategories: string[];
  tags: string[];
}

export class EditProductSpecs extends React.Component<
  IEditProductSpecsProps,
  ILocalState
> {
  constructor(props) {
    super(props);

    let selectedRow = categoriesData.filter(
      row => row.category === this.props.category
    );
    let tags = this.props.descriptionLabels.map(row => row.label);
    this.state = {
      subcategories: selectedRow[0]["subcategories"],
      tags: tags as string[]
    };
  }

  componentDidMount() {}

  handleCategoryChange = value => {
    let selectedRow = categoriesData.filter(row => row.category === value);
    this.setState({
      subcategories: selectedRow[0]["subcategories"]
    });
    // update redux category
    this.props.changeCategory(value);
    this.props.changeSubcategory(selectedRow[0]["subcategories"][0]);
  };

  handleSubcategoryChange = value => {
    // update redux subcategory
    this.props.changeSubcategory(value);
  };

  handleOemChange = e => {
    this.props.changeOem(e.target.value);
  };

  handleOemModelChange = e => {
    this.props.changeOemProductModel(e.target.value);
  };

  handleOemSerialNumberChange = e => {
    //console.log('handleOemSerialNumberChange', e.target.value);
    this.props.changeOemSerialNumber(e.target.value);
  };

  handleBuyAmountChange = value => {
    let newvalue = value;
    if (
      value === null ||
      value === "null" ||
      value === "" ||
      value === " " ||
      value <= 0 ||
      !value
    ) {
      newvalue = 0.01;
    }
    this.props.changeBuyAmount(newvalue);
  };

  handleCatalogChange = value => {
    //console.log('select from catalog not yet supported');
  };

  handleCloseTag = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    const newlabels = this.props.descriptionLabels.filter(
      row => row.label !== removedTag
    );
    this.props.changeTags(newlabels);
  };

  renderAmount = value => {
    let formattedAmount = "";
    //console.log(value);
    //console.log(currency((value||''), AMOUNTS_FORMAT));
    formattedAmount = currency(value || "", AMOUNTS_FORMAT).format();
    //console.log(formattedAmount);
    return formattedAmount;
  };

  renderTags = () => {
    const { tags } = this.state;
    return (
      <div className={ss.sizeMeForMobile}>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              style={{ marginTop: "5px" }}
              color="blue"
              key={tag}
              closable={index >= 0}
              onClose={() => this.handleCloseTag(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <Row gutter={0}>
          <Col>
            <Row justify="center" align="middle" gutter={0}>
              <Col className={ss.inputHideForMobile}>
                <div className={ss.sizeMeForMobile}>
                  AI Detected Tags (Remove{" "}
                  <span style={{ color: "red" }}>FALSE</span> Tags)
                </div>
                {this.renderTags()}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="start" align="middle" gutter={0}>
              <Col className={ss.inputHideForMobile}>
                <div className={ss.sizeMeForMobile}>
                  Override with Catalog Item?
                </div>
                <Select
                  defaultValue={"Feature not supported"}
                  className={ss.sizeMeForMobile}
                  onChange={this.handleCatalogChange}
                >
                  {catalogList.map(row => (
                    <Option key={row.itemCode} value="">
                      {row.oemProductModel + ",  €" + row.buyAmount}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={0}>
          <Col>
            <Row justify="start" gutter={0}>
              <Col className={ss.input}>
                <div className={ss.sizeMeForMobile}>Product Category</div>
                <Select
                  defaultValue={this.props.category}
                  className={ss.sizeMeForMobile}
                  onChange={this.handleCategoryChange}
                >
                  {categoryList.map(cat => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row justify="start" gutter={0}>
              <Col className={ss.input}>
                <div className={ss.sizeMeForMobile}>Product Sub Category</div>
                <Select
                  value={this.props.subcategory}
                  className={ss.sizeMeForMobile}
                  onChange={this.handleSubcategoryChange}
                >
                  {this.state.subcategories.map(subcat => (
                    <Option key={subcat} value={subcat}>
                      {subcat}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="center" gutter={0}>
              <Col className={ss.input}>
                <div className={ss.sizeMeForMobile}>Product Manufacturer</div>
                <Input
                  id="oem"
                  className={ss.sizeMeForMobile}
                  placeholder="Apple"
                  defaultValue={this.props.oem}
                  onChange={this.handleOemChange}
                ></Input>
              </Col>
            </Row>
            <Row justify="center" gutter={0}>
              <Col className={ss.input}>
                <div className={ss.sizeMeForMobile}>Product Model</div>
                <Input
                  id="oemProductModel"
                  className={ss.sizeMeForMobile}
                  placeholder="MacBook"
                  defaultValue={this.props.oemProductModel}
                  onChange={this.handleOemModelChange}
                ></Input>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={0}>
          <Col>
            <Row justify="center" gutter={0}>
              <Col className={ss.inputHideForMobile}>
                <div className={ss.sizeMeForMobile}>OEM Serial Number</div>
                <Input
                  id="oemSerialNumber"
                  className={ss.sizeMeForMobile}
                  placeholder="XXX123..."
                  defaultValue={this.props.oemSerialNumber}
                  onChange={this.handleOemSerialNumberChange}
                ></Input>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="start" align="middle" gutter={0}>
              <Col className={ss.inputHideForMobile}>
                <div className={ss.sizePriceForMobile}>
                  Product Cost or Price (€){" "}
                </div>
                <InputNumber
                  id="buyAmount"
                  className={ss.resizePriceForMobile}
                  defaultValue={this.props.buyAmount}
                  value={this.props.buyAmount}
                  decimalSeparator={","}
                  precision={2}
                  min={0.01}
                  required={true}
                  //formatter={value => this.renderAmount(value)}
                  //parser={value => (value || '').replace(/\$\s?|(,*)/g, '')}
                  parser={value => (value || "").replace(/[^\w,-]+/g, "")}
                  onChange={this.handleBuyAmountChange}
                ></InputNumber>
                <Checkbox
                  defaultChecked={false}
                  disabled
                  style={{ paddingLeft: "5px" }}
                >
                  Get Used Item Market Price?
                </Checkbox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
