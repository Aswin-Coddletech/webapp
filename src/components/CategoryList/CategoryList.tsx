import React from "react";
import { List, Card, Spin } from "antd";
import ss from "./CategoryList.module.scss";
import categories from "../../assets/json/categories.json";

export interface ICategoryListData {}

export interface ICategoryListHocData {
  loading: boolean;
  catList: any[];
  selectedCategory: string;
}

export interface ICategoryListCallbacks {}

export interface ICategoryListHocCallbacks {
  onInit(): any;
  onCategorySelect(data: string): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface ICategoryListProps
  extends ICategoryListData,
    ICategoryListHocData,
    ICategoryListHocCallbacks,
    ICategoryListCallbacks {}

export class CategoryList extends React.Component<
  ICategoryListProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {
    //this.props.getItem(this.props.item.itemId);
  }

  onCategoryClick = item => {
    this.props.onCategorySelect(item);
  };

  render() {
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          {this.props.loading === false && (
            <div>
              <h4 className={ss.sectionTitle}>Select Category</h4>
              <List
                grid={{
                  gutter: 16,
                  xs: 2,
                  lg: 4
                }}
                className={ss.listDesign}
                dataSource={categories}
                renderItem={item => (
                  <List.Item
                    className={ss.listStyle}
                    onClick={e => this.onCategoryClick(item.categoryId)}
                  >
                    <List.Item.Meta />
                    <Card
                      className={
                        this.props.selectedCategory === item.categoryId
                          ? ss.cardImgActive
                          : ss.cardImgStyle
                      }
                      hoverable={true}
                      cover={
                        <div className={ss.cardImage}>
                          <img
                            alt="icon"
                            src={require("../../assets/icons/" +
                              (item.icon ? item.icon : "no-image.svg"))}
                          />
                        </div>
                      }
                    >
                      {item.category}
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Spin>
      </>
    );
  }
}
