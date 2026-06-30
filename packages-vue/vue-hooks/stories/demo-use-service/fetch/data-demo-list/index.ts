import {
  fixDemoListData
} from "../fix-data";
import {
  TDataDataListDemo
} from "../types";

export default function dataDemoList(): Promise<TDataDataListDemo[]> {

  return fetch("https://mock.mengxuegu.com/mock/60434bccf340b05bceda3906/practise-nuxtjs/list").then(req => {
    return req.json();
  }).
      then(fixDemoListData).
      catch(error => {
        throw new Error(error);
      });
}
