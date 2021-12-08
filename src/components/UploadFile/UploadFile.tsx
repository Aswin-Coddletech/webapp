import React from "react";
import superagent from "superagent";
import { Table, Upload, message, Row, Col, Spin } from "antd";
import { string, any } from "prop-types";

import ss from "./UploadFile.module.scss";
import { CameraOutlined } from "@ant-design/icons";

const { Column } = Table;

function getBase64(img, callback) {
  const reader = new FileReader();
  let fullresult = {};

  reader.addEventListener("load", () => {
    superagent
      .post(
        "https://4ip88h5723.execute-api.eu-west-1.amazonaws.com/prod/detectimage"
      )
      .send(reader.result) // sends a JSON post body
      .set("X-API-Key", "foobar")
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
        if (err) {
          console.log("error from superagent", err);
        }
        console.log("back from superagent. res=", res);
        console.log("back from superagent. res.body=", res.body);

        let table =
          "<p>The image may have one of the following items</p><table><tr><th>Object</th><th>Confidence</th></tr>";
        let lables = res.body.detectedLabels;
        let i = 0;
        console.log("labels", lables);
        // show each label name and build out confidence table
        for (i = 0; i < lables.length; i++) {
          table +=
            "<tr><td>" +
            lables[i].Name +
            "</td><td>" +
            lables[i].Confidence +
            "</td></tr>";
        }
        table += "</table>";
        console.log("table", table);

        let fullresult = {
          detectedTable: table,
          detectedLabels: lables,
          imageUrl: reader.result
        };

        console.log(
          "detected labels in fullresult:",
          fullresult.detectedLabels
        );

        callback(fullresult);
      });
    //callback(reader.result)
  });
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  // return isJPG && isLt2M;
  // always return false so that antd does not try to upload the file

  return false;
}

export class UploadFile extends React.Component {
  state = {
    fileList: "",
    imageFileName: "",
    base64imageUrl: "",
    detectedLabels: [],
    detectedTable: "",
    loading: false
  };

  handleChange = info => {
    // eslint-disable-next-line no-console
    console.log(info);
    //getBase64(info.fileList[0].originFileObj, base64imageUrl =>
    this.setState({
      fileList: info.fileList,
      imageFileName: info.fileList[0].name,
      base64imageUrl: "",
      detectedLabels: [],
      detectedTable: "",
      loading: true
    });

    getBase64(info.fileList[0].originFileObj, fullresult => {
      console.log(fullresult);
      console.log("detectted lable in callback", fullresult.detectedLabels);

      this.setState({
        fileList: info.fileList,
        imageFileName: info.fileList[0].name,
        base64imageUrl: fullresult.imageUrl,
        detectedLabels: fullresult.detectedLabels,
        detectedTable: fullresult.detectedTable,
        loading: false
      });

      console.log(this.state);
    });
  };

  renderConfidence = (Confidence: number) => {
    let string_value = "";
    if (Confidence) {
      string_value = Confidence.toString();
    }
    return `${string_value}`;
  };

  render() {
    const base64imageUrl = this.state.base64imageUrl;
    const detectedLabels = this.state.detectedLabels;
    const detectedTable = this.state.detectedTable;
    const loading = this.state.loading;

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    const uploadButton = (
      <div>
        <CameraOutlined />
        <div className="ant-upload-text"> Upload Image </div>
      </div>
    );

    const nothingDetected = <div> Nothing Detected </div>;

    return (
      <div className={ss.root}>
        <Row justify="space-between">
          <Col xs={12}>
            <Row>
              <Col xs={24} className={ss.title}>
                <h3>
                  {" "}
                  Upload a Product Image File or Take a Photo or Scan Bar Code{" "}
                </h3>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <Spin spinning={loading}>
                  <Upload
                    name="inventoryimage"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {base64imageUrl ? (
                      <img
                        src={base64imageUrl}
                        alt="inventoryimage"
                        style={{ height: "225px", width: "225px" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Spin>
              </Col>
            </Row>
          </Col>

          <Col xs={12}>
            <Row>
              <Col xs={24} className={ss.title}>
                <h3> Following Product Description is Detected </h3>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                {detectedTable ? (
                  <div>
                    <p style={{ color: "#1890ff" }}>
                      {" "}
                      Select all that is true{" "}
                    </p>
                    <Table
                      loading={false}
                      rowKey="Name"
                      dataSource={detectedLabels}
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
