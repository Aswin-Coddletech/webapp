import React from "react";
import { Table, Upload, message, Row, Col, Spin } from "antd";

import ss from "./ImageSelectAndDetect.module.scss";
import { CameraOutlined } from "@ant-design/icons";

const { Column } = Table;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export interface IImageSelectAndDetectData {
  fileList: [];
  detectedLabels: [];
  selectedLabels: [];
  base64imageUrl: string;
  loading: boolean;
}

export interface IImageSelectAndDetectCallbacks {
  changeFileList(fileList: []): void;
  changeBase64imageUrl(base64imageUrl: string): void;
  changeSelectedLabels(selectedLabels: []): void;
  getDetectedLabels(base64imageUrl: string): void;
}

export interface IImageSelectAndDetectProps
  extends IImageSelectAndDetectData,
    IImageSelectAndDetectCallbacks {}

export interface IImageSelectAndDetectState {
  imageUrl: string;
}
export class ImageSelectAndDetect extends React.Component<
  IImageSelectAndDetectProps,
  IImageSelectAndDetectState
> {
  state = {
    imageUrl: ""
  };

  componentDidMount() {
    //console.log("in component did mount", this.props);

    this.setState({
      imageUrl: this.props.base64imageUrl
    });
  }

  renderConfidence = (Confidence: number) => {
    let string_value = "";
    if (Confidence) {
      string_value = Confidence.toString();
    }
    return `${string_value}`;
  };

  render() {
    //console.log("in render", this.props);

    const {
      //fileList,
      //detectedLabels,
      selectedLabels,
      changeFileList,
      changeBase64imageUrl,
      getDetectedLabels,
      changeSelectedLabels
    } = this.props;

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      selectedRowKeys: this.props.selectedLabels.map(row => row["Name"]),
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        changeSelectedLabels(selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    const beforeUpload = (file: any) => {
      //console.log('in before upload');

      const isJPG = file.type === "image/jpeg" || "image/png";
      if (!isJPG) {
        message.error("You can only upload JPG or PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        message.error("Image must be smaller than 4MB!");
      }

      //console.log('in before upload', fileList);

      // return isJPG && isLt2M;
      // always return false so that antd does not try to upload the file

      return false;
    };

    //const removeFile = file => {
    //}

    const handleChange = (event: any) => {
      //console.log('in handle chnage', event);

      changeFileList(event.fileList);

      getBase64(event.fileList[0].originFileObj, base64url => {
        this.setState({ imageUrl: base64url });
        changeBase64imageUrl(base64url);
        getDetectedLabels(base64url);
      });
    };

    const uploadButton = (
      <div>
        <CameraOutlined />
        <div className="ant-upload-text"> Product Image </div>
      </div>
    );

    const nothingDetected = <div> Nothing Detected </div>;

    return (
      <div className={ss.root}>
        <Row justify="space-around">
          <Col>
            <Row>
              <Col xs={24} className={ss.centerMeForMobile}>
                <h3> Upload Product Image </h3>
              </Col>
            </Row>

            <Row>
              <Col xs={24} className={ss.centerMeForMobile}>
                <Spin spinning={this.props.loading}>
                  <Upload
                    name="inventoryimage"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {this.state.imageUrl ? (
                      <img
                        src={this.state.imageUrl}
                        alt="inventoryimage"
                        className={ss.itemimage}
                        style={{
                          width: "100px",
                          height: "100px",
                          overflow: "hidden",
                          objectFit: "contain"
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Spin>
              </Col>
            </Row>
          </Col>

          <Col className={ss.hideMeForMobile}>
            <Row justify="start">
              <Col xs={24}>
                <h3>
                  {" "}
                  Following Product Description is Detected by Melloon AI
                </h3>
              </Col>
            </Row>

            <Row justify="start">
              <Col xs={24}>
                {this.state.imageUrl ? (
                  <div>
                    <p style={{ color: "#1890ff" }}>
                      {" "}
                      Select all that is true{" "}
                    </p>
                    <Spin spinning={this.props.loading}>
                      <Table
                        loading={false}
                        rowKey="Name"
                        dataSource={selectedLabels}
                        rowSelection={rowSelection}
                        pagination={false}
                        bordered
                        size="small"
                      >
                        <Column dataIndex="Name" title="Name" key="Name" />
                        <Column
                          dataIndex="Confidence"
                          title="Confidence"
                          render={this.renderConfidence}
                        />
                      </Table>
                    </Spin>
                  </div>
                ) : (
                  nothingDetected
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
