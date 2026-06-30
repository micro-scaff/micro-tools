import {
  apiTest02
} from "../api";

export default async function submit(data: unknown, defaultData: unknown): Promise<boolean> {

  // eslint-disable-next-line no-console
  console.log("data", data, defaultData);

  return apiTest02().then(() => {
    return true;
  });
}
