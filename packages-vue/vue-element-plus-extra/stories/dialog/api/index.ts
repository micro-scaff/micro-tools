export function apiTest01(): Promise<{
  name: string;
  age: number;
  email: string;
}> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        age: 20,
        email: "john.doe@example.com"
      });
    }, 500);
  });
}

export function apiTest02(): Promise<{
  code: number;
  message: string;
}> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        code: 500,
        message: "error"
      });

      // resolve({
      //   code: 200,
      //   message: "success"
      // });
    }, 5000);
  });
}
