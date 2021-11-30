import { createStructuredSelector } from "reselect";

import {
  fileListSelector,
  detectedLabelsSelector,
  selectedLabelsSelector,
  base64imageUrlSelector,
  loadingSelector
} from "src/redux/add-inventory/selectors";

import { IRootState } from "src/redux/reducer";

import { IImageSelectAndDetectData } from "./ImageSelectAndDetect";

export default createStructuredSelector<IRootState, IImageSelectAndDetectData>({
  fileList: fileListSelector,
  detectedLabels: detectedLabelsSelector,
  selectedLabels: selectedLabelsSelector,
  base64imageUrl: base64imageUrlSelector,
  loading: loadingSelector
});
