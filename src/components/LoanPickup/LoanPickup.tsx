import React from "react";
import { Radio, Row, Col, Calendar, Spin } from "antd";
import ss from "./LoanPickup.module.scss";
import moment, { Moment } from "moment";

export interface ILoanPickupData {}

export interface ILoanPickupHocData {
  loading: boolean;
  pickupTimeSlot: any[];
  selectedTimeSlot: string;
  selectedPickupDate: Moment;
}

export interface ILoanPickupCallbacks {}

export interface ILoanPickupHocCallbacks {
  onInit(): any;
  onSelectedTimeSelect(data: {}): any;
  onSelectedPickupDate(data: {}): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface ILoanPickupProps
  extends ILoanPickupData,
    ILoanPickupHocData,
    ILoanPickupHocCallbacks,
    ILoanPickupCallbacks {}

export class LoanPickup extends React.Component<ILoanPickupProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {
    //this.props.getItem(this.props.item.itemId);
  }

  timeSlotClick = item => {
    this.props.onSelectedTimeSelect(item.target.value);
  };

  dateChange = input_date => {
    // return this.props.onSelectedPickupDate(
    //   moment(input_date).format('MM.DD.YYYY')
    // );
    return this.props.onSelectedPickupDate(input_date);
  };

  render() {
    return (
      <>
        <div>
          <h4 className={ss.sectionTitle}>Select a Pickup Date</h4>
          <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
            {this.props.loading === false && (
              <div>
                <div
                  style={{
                    width: 300,
                    border: "1px solid #d9d9d9",
                    borderRadius: 4
                  }}
                >
                  <Calendar
                    fullscreen={false}
                    disabledDate={current => {
                      return current && current < moment().subtract(1, "day");
                    }}
                    onChange={this.dateChange}
                    value={this.props.selectedPickupDate}
                  />
                </div>
                <h5 className={ss.sectionTitle}>Select a Pickup TimeSlot</h5>
                <Radio.Group
                  value={this.props.selectedTimeSlot}
                  buttonStyle="solid"
                  className={ss.conditionBtnGroup}
                >
                  <Row gutter={16}>
                    {/* {this.props.pickupTimeSlot.map(item => (
                      <Col xs={24} lg={12} key={item.key}>
                        <Radio.Button
                          value={item.key}
                          onChange={this.timeSlotClick}
                        >
                          {item.timeSlot}
                        </Radio.Button>
                      </Col>
                    ))} */}
                    <Col xs={24} lg={12}>
                      <Radio.Button
                        value="8:00 - 11:00"
                        onChange={this.timeSlotClick}
                      >
                        8:00 - 11:00
                      </Radio.Button>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Radio.Button
                        value="11:00 - 14:00"
                        onChange={this.timeSlotClick}
                      >
                        11:00 - 14:00
                      </Radio.Button>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Radio.Button
                        value="14:00 - 17:00"
                        onChange={this.timeSlotClick}
                      >
                        14:00 - 17:00
                      </Radio.Button>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Radio.Button
                        value="17:00 - 19:00"
                        onChange={this.timeSlotClick}
                      >
                        17:00 - 19:00
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
              </div>
            )}
          </Spin>
        </div>
      </>
    );
  }
}
