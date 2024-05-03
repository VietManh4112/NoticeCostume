import axios from "axios";

const EthnicStore = axios.create({
  baseURL: 'https://mycostumes.ddns.net',
  timeout: 5000,
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
  }
});

export default EthnicStore;