const getData = () => fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((Response) => {
    if(Response.ok) {
      return Response.json();
    }

    throw new Error(`${Response.status} ${Response.statusText}`);
  });

const sendData = (body) => fetch(
  'https://28.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  },
);

export {getData, sendData};
