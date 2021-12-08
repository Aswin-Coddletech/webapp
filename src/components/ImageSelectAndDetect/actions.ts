import {
  setFileList,
  setBase64imageUrl,
  setSelectedLabels,
  getDetectedLabels
} from "src/redux/add-inventory/actions";

export default {
  changeFileList: setFileList,
  changeBase64imageUrl: setBase64imageUrl,
  changeSelectedLabels: setSelectedLabels,
  getDetectedLabels: getDetectedLabels
};
