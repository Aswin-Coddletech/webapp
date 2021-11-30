import { put, takeEvery, select } from "redux-saga/effects";

import {
  SET_DETECTED_SPECS,
  setCategory,
  setSubcategory,
  setOem,
  setOemProductModel,
  setTags,
  INIT
} from "./actions";

import { selectedLabelsSelector } from "./selectors";

import { ITag } from "src/interfaces/Inventory.interface";
import { CATEGORIES } from "src/constants/inventory";

/*const categoriesData = [
  {
    category: "Electronics",
    subcategories: ["Cell Phone", "Laptop", "TV"]
  },
  {
    category: "Home Appliance",
    subcategories: ["Washing Machine", "Refrigerator", "Room Heater"]
  },
];*/

const categoriesData = CATEGORIES;

export function* onInit() {
  yield takeEvery(INIT, function*() {
    //    yield put(getList() as any);
    //    yield put(getSummary() as any);
  });
}

export function* updateDetectedSpecs() {
  yield takeEvery(SET_DETECTED_SPECS, function*() {
    const selectedLabels = yield select(selectedLabelsSelector);

    console.log(
      "selectedLabelsSelector in sagas - updateDetectedSpecs",
      selectedLabels
    );

    const categoryList = categoriesData.map(row => row.category);
    let defaultCat = "",
      defaultSubcat = "",
      catFound = false;
    let i = 0,
      j = 0;
    for (i = 0; i < selectedLabels.length; i++) {
      for (j = 0; j < categoryList.length; j++) {
        if (selectedLabels[i]["Name"] === categoryList[j]) {
          defaultCat = selectedLabels[i]["Name"];
          catFound = true;
        }
      }
    }

    console.log("catfound?", catFound, "deafault cat", defaultCat);

    if (catFound) {
      let selectedRow = categoriesData.filter(
        row => row.category === defaultCat
      );
      let scFound = false;
      let k = 0;
      for (i = 0; i < selectedLabels.length; i++) {
        for (k = 0; k < selectedRow[0].subcategories.length; k++) {
          if (selectedLabels[i]["Name"] === selectedRow[0].subcategories[k]) {
            defaultSubcat = selectedLabels[i]["Name"];
            scFound = true;
          }
        }
      }
      if (!scFound) {
        defaultSubcat = selectedRow[0]["subcategories"][0];
      }
    } else {
      defaultCat = categoryList[0];
      defaultSubcat = categoriesData[0].subcategories[0];

      //let subcatFound = false;
      for (i = 0; i < selectedLabels.length; i++) {
        for (j = 0; j < categoriesData.length; j++) {
          let row = categoriesData[j];
          let k = 0;
          for (k = 0; k < row.subcategories.length; k++) {
            if (selectedLabels[i]["Name"] === row.subcategories[k]) {
              defaultSubcat = selectedLabels[i]["Name"];
              defaultCat = row.category;
              //subcatFound=true;
            }
          }
        }
      }
    }
    yield put(setCategory(defaultCat) as any);
    yield put(setSubcategory(defaultSubcat) as any);

    //let oemFound=false;
    let value = "",
      model = "";
    for (i = 0; i < selectedLabels.length; i++) {
      if (selectedLabels[i]["Name"].includes("Iphone")) {
        //oemFound = true;
        value = "Apple";
        model = "Iphone";
      } else if (selectedLabels[i]["Name"].includes("MacBook")) {
        //oemFound = true;
        value = "Apple";
        model = "MacBook";
      }
    }
    yield put(setOem(value) as any);
    yield put(setOemProductModel(model) as any);

    //set product tags
    let tags: ITag[] = [];
    for (i = 0; i < selectedLabels.length; i++) {
      tags.push({ label: selectedLabels[i]["Name"] });
    }
    yield put(setTags(tags) as any);
  });
}
