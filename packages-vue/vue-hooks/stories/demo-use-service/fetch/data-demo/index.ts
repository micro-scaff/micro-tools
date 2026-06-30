import {
  fixDemoData
} from "../fix-data";
import {
  IDataDataDemo
} from "../types";

export default function dataDemo(): Promise<IDataDataDemo> {

  return fetch("https://mock.mengxuegu.com/mock/61922927f126df7bfd5b79ef/promise/promise3#!method=get").then(req => {
    return req.json();
  }).
      then(fixDemoData).
      catch(error => {
        throw new Error(error);
      });
}
