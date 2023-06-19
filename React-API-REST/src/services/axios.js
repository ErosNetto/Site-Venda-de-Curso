import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3005',
});

// import axios from 'axios';

// const axiosConfig = axios.create();

// axiosConfig.defaults.baseURL = 'http://34.151.254.26:81';

// export default axiosConfig;
