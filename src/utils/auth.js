import { settingsNetwork } from "./utils.js";
class Auth {
  constructor({ urlServerAuth }) {
    this._urlServerAuth = urlServerAuth;
  }

  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  checkToken(token) {
    return fetch(`${this._urlServerAuth}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleOriginalResponse);
  }

  register({ email, password }) {
    return fetch(`${this._urlServerAuth}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._handleOriginalResponse);
  }

  login({ email, password }) {
    return fetch(`${this._urlServerAuth}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._handleOriginalResponse);
  }
}

const auth = new Auth(settingsNetwork);

export default auth;
