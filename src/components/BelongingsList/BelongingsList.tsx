import React from "react";
import { Timeline } from "antd";
import { colorMelloonPrimary } from "../../constants/colors";

export interface IBelongingsListData {}

export interface IBelongingsListHocData {
  belongingsList: any[];
}

export interface IBelongingsListCallbacks {}

export interface IBelongingsListHocCallbacks {
  onInit(): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface IBelongingsListProps
  extends IBelongingsListData,
    IBelongingsListHocData,
    IBelongingsListHocCallbacks,
    IBelongingsListCallbacks {}

export class BelongingsList extends React.Component<
  IBelongingsListProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <h2
          style={{
            color: colorMelloonPrimary
          }}
        >
          Belongings
        </h2>
        <Timeline>
          {this.props.belongingsList.map((item, i) => (
            <Timeline.Item key={i}>{item.name}</Timeline.Item>
          ))}
        </Timeline>
      </>
    );
  }
}
