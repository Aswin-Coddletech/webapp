import React from "react";
import { Radio, Row, Col, Switch, Spin } from "antd";
import ss from "./ItemCondition.module.scss";
import condition from "../../assets/json/condition.json";

export interface IItemConditionData {}

export interface IItemConditionHocData {
  loading: boolean;
  inclusionList: any[];
  selectedCondition: string;
}

export interface IItemConditionCallbacks {}

export interface IItemConditionHocCallbacks {
  onInit(): any;
  onConditionSelect(data: {}): any;
}

export interface ILocalState {
  screenOption: number;
  checkedList: Array<string>;
}

export interface IItemConditionProps
  extends IItemConditionData,
    IItemConditionHocData,
    IItemConditionHocCallbacks,
    IItemConditionCallbacks {}

export class ItemCondition extends React.Component<
  IItemConditionProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1,
      checkedList: []
    };
  }

  componentDidMount() {
    //this.props.getItem(this.props.item.itemId);
  }

  onInclusionSelect = checked => {
    console.log(`switch to ${checked}`);
  };

  conditonClick = item => {
    this.props.onConditionSelect(item.target.value);
  };

  handleChange(index, info) {
    console.log("index", index);
    console.log("info", info);
  }

  render() {
    console.log("inclusionList", this.props.inclusionList);
    return (
      <>
        <div>
          <h4 className={ss.sectionTitle}>Select Item's Condition</h4>
          <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
            {this.props.loading === false && (
              <div>
                <Radio.Group
                  value={this.props.selectedCondition}
                  buttonStyle="solid"
                  className={ss.conditionBtnGroup}
                >
                  <Row gutter={16}>
                    {condition.map(item => (
                      <Col xs={24} lg={12} key={item.key}>
                        <Radio.Button
                          value={item.key}
                          onChange={this.conditonClick}
                        >
                          {item.status}
                          <div className={ss.shortDesc}>{item.description}</div>
                        </Radio.Button>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>

                <div>
                  <h4 className={ss.sectionTitle}>Inclusions</h4>

                  {this.props.inclusionList.map((item, i) => (
                    <Row gutter={16} key={i} className={ss.alignInclustions}>
                      <Col xs={18}>
                        <div className={ss.inclusionTitle}>
                          {item.inclusion}
                        </div>
                      </Col>
                      <Col xs={6} className={ss.inclusionDeisgn}>
                        <Switch
                          //checked={this.state.checkedPos[i]}

                          onChange={() => this.handleChange(i, item.inclusion)}
                        />
                      </Col>
                    </Row>
                  ))}

                  {/* <Row>
                    <Checkbox.Group
                      value={this.state.checkedList}
                      onChange={this.onInclusionSelect}
                    >
                      {this.props.inclusionList.map((item, i) => (
                        <Checkbox key={i} value={item.inclusion}>
                          {item.inclusion}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Row> */}
                </div>
              </div>
            )}
          </Spin>
        </div>
      </>
    );
  }
}
