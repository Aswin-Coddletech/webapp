import {
  setCategory,
  setSubcategory,
  setOem,
  setOemProductModel,
  setOemSerialNumber,
  setBuyAmount,
  setTags
} from "src/redux/add-inventory/actions";

export default {
  changeCategory: setCategory,
  changeSubcategory: setSubcategory,
  changeOem: setOem,
  changeOemProductModel: setOemProductModel,
  changeOemSerialNumber: setOemSerialNumber,
  changeBuyAmount: setBuyAmount,
  changeTags: setTags
};
