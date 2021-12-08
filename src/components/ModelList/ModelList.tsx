import React from "react";
import { AutoComplete, Row, Col, Spin, Empty } from "antd";
import ss from "./ModelList.module.scss";

export interface IModelListData {}

export interface IModelListHocData {
  loading: boolean;
  modelList: any[];
  selectedModel: string;
  selectedModelDesc: string;
}

export interface IModelListCallbacks {}

export interface IModelListHocCallbacks {
  onInit(): any;
  onModelSelect(data: string): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface IModelListProps
  extends IModelListData,
    IModelListHocData,
    IModelListHocCallbacks,
    IModelListCallbacks {}

export class ModelList extends React.Component<IModelListProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {
    //this.props.getItem(this.props.item.itemId);
  }

  onModelClick = item => {
    this.props.onModelSelect(item);
  };

  render() {
    const getModel = this.props.modelList.map((item, i) =>
      item.title ? item.title : "No Items"
    );
    return (
      <div>
        <Row style={{ width: "100%" }}>
          <Col lg={4} />
          <Col lg={16}>
            <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
              {this.props.loading === false && (
                <div>
                  <h4 className={ss.sectionTitle}>Select Item's Model</h4>
                  {this.props.modelList.length > 0 && (
                    <Row gutter={16} className={ss.modalAutoComplete}>
                      <Col xs={24}>
                        <AutoComplete
                          style={{ width: "100%" }}
                          dataSource={getModel}
                          placeholder="Search Model"
                          autoFocus={true}
                          defaultOpen={true}
                          onSelect={this.onModelClick}
                          filterOption={true}
                          //value={this.props.selectedModel}
                        />
                      </Col>
                    </Row>
                  )}
                  {this.props.modelList.length === 0 && (
                    <Empty
                      description={
                        "Sorry, no models are available for the selected brand"
                      }
                    />
                  )}
                  {this.props.selectedModel !== "" && (
                    <div className={ss.loan_stat}>
                      <div>
                        <div className={ss.loanstat_inner}>
                          <h5 className={ss.modalLabel}>
                            <strong>Selected Model: </strong>
                          </h5>
                          <h5>
                            <strong style={{ fontSize: 20 }}>
                              {this.props.selectedModelDesc}
                            </strong>
                          </h5>
                        </div>
                        <div className={ss.loanstat_inner}>
                          <h5 className={ss.modalLabel}>Model Description: </h5>
                          <h5>
                            <strong>{this.props.selectedModelDesc}</strong>
                          </h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Spin>
          </Col>
          <Col lg={16} />
        </Row>
      </div>
    );
  }
}
