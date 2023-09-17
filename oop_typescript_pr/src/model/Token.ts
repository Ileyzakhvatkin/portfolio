import axios from "./../../node_modules/axios/index";

export class Token {

  async setToken() {
    try {
      const { data } = await axios.post(`http://localhost:3000/api/auth/register`,
        {
          username: "user",
          password: "1111",
          firstName: "Ilya",
          lastName: "Zakhvatkin",
        }, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      return data.access_token;
    } catch (err) {
        console.log(`code: ${err.code} name: ${err.name} message: ${err.message}`);
    }
  }

  async getToken() {
    try {
      const { data } = await axios.post(`http://localhost:3000/api/auth/login`,
        {
          username: "user",
          password: "1111",
        }, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      return data.access_token;
    } catch (err) {
        console.log(`code: ${err.code} name: ${err.name} message: ${err.message}`);
    }
  }
}
