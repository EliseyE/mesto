export class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _downloadData(path) {
    return fetch(`${this._baseUrl}${path.path}`, {
      headers: { authorization: this._headers.authorization }
    })
    .then(res => {return this._responceProcessing(res)})
    .catch(err => console.log(err));
  }

  _uploadData(path, data) {
    return fetch(`${this._baseUrl}${path.path}`, {
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers[Content-Type]
      },
      body: JSON.stringify(data)
    })
    .then(res => {return this._responceProcessing(res)})
    .catch(err => console.log(err));
  }

  _responceProcessing(res) {
    if(res.ok) {
      return res.json(); }
    return Promise.reject(`Ошибка в Api: ${res.status}`);
  }

  getInitialCards() {
    return this._downloadData({ path: '/cards' } );
  }

  getMyProfileData() {
    return this._downloadData({ path: '/users/me' });
  }

  uploadProfileData(data) {
    return this._uploadData({ path: '/users/me' }, data);
  }
}
