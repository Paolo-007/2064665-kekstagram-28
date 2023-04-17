const GET_DATA_LINK = 'https://28.javascript.pages.academy/kekstagram/data';
const SEND_DATA_LINK = 'https://28.javascript.pages.academy/kekstagram';

const getData = () => fetch(GET_DATA_LINK)
  .then((Response) => {
    if(Response.ok) {
      return Response.json();
    }

    throw new Error(`${Response.status} ${Response.statusText}`);
  });

const sendData = (body) => fetch(
  SEND_DATA_LINK,
  {
    method: 'POST',
    body,
  },
);

export {getData, sendData};
