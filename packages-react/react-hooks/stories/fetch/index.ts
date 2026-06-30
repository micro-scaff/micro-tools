export interface IResponse {
  content: string;
  title: string;
  author: string;
  url: string;
}

export function testFetch(): Promise<IResponse | null> {
  return fetch("https://mock.mengxuegu.com/mock/60434bccf340b05bceda3906/practise-nuxtjs/test").
      then(res => {
        return res.json();
      }).
      then(res => {
        if (res.code === 200) {
          return res.data;
        }

        return null;
      });
}
