import axios from 'axios';

async function httpClient(request: string, url: string, data?: any, token?: string) {
  let errorResponse = '';
  const tokenRequest =
    token === ''
      ? undefined
      : {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  const response =
    request === 'POST'
      ? await axios
          .post(url, { ...data }, tokenRequest)
          .then((res) => res)
          .catch((err) => (errorResponse = err.response.data.error.message))
      : request === 'PUT'
      ? await axios
          .put(url)
          .then((res) => res)
          .catch((err) => (errorResponse = err.response.data.error.message))
      : request === 'DELETE'
      ? await axios
          .delete(url)
          .then((res) => res)
          .catch((err) => (errorResponse = err.response.data.error.message))
      : await axios
          .get(url, tokenRequest)
          .then((res) => res)
          .catch(
            (err) =>
              (errorResponse =
                err.response.data && err.response.data.description
                  ? err.response.data.description
                  : err.response.data.error.message),
          );

  return { response, errorResponse };
}

export default httpClient;
