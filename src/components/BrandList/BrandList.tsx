import React from "react";
import { Spin, Table, Empty } from "antd";
import ss from "./BrandList.module.scss";

export interface IBrandListData {}

export interface IBrandListHocData {
  loading: boolean;
  brandList: any[];
  selectedBrandId: string;
}

export interface IBrandListCallbacks {}

export interface IBrandListHocCallbacks {
  onInit(): any;
  onBrandSelect(data: string): any;
}

const columns = [
  {
    dataIndex: "brand"
  }
];

export interface ILocalState {
  screenOption: number;
  keys: any[];
}

export interface IBrandListProps
  extends IBrandListData,
    IBrandListHocData,
    IBrandListHocCallbacks,
    IBrandListCallbacks {}

export class BrandList extends React.Component<IBrandListProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1,
      keys: []
    };
  }

  componentDidMount() {}

  setSelectedBrand = brand => {
    //this.setState({ keys: brand });
    this.props.onBrandSelect(brand[0]);
  };

  onRowKeysChange = keys => {
    this.setSelectedBrand(keys);
  };

  rowclick = e => {
    let keys: string[] = [e.currentTarget.dataset.rowKey];
    this.setSelectedBrand(keys);
  };

  render() {
    let keys: string[] = [this.props.selectedBrandId];
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          {this.props.loading === false && (
            <div>
              <h4 className={ss.sectionTitle}>Select Item's Brand</h4>
              {this.props.brandList.length > 0 && (
                <Table
                  className={ss.tableBrandList}
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: keys,
                    onChange: this.onRowKeysChange
                  }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: this.rowclick // click row
                    };
                  }}
                  columns={columns}
                  rowKey="brandId"
                  dataSource={this.props.brandList}
                  pagination={false}
                />
              )}
              {this.props.brandList.length === 0 && (
                <Empty description={"Sorry, no brands are available"} />
              )}
            </div>
          )}
        </Spin>
      </>
    );
  }
}
