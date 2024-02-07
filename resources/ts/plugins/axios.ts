import router from '@/router/index'
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://ibcris.thinkingbees.tech/',
  // baseURL: 'http://127.0.0.1:8000'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken')

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response;
}, error => {
  
  // Check if error.response exists
  if (error.response) {
    // Handle HTTP errors
    if (error.response.status === 401) {
      // Logout user and redirect to login page
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userAbilities');
      // Redirect to login page
      router.push('/not-authorized');
      console.log(error)
    }
  } else {
    // Handle non-HTTP errors (e.g., network errors)
    console.error('Network error or server not reachable:', error);
  }

  return Promise.reject(error);
});


export default axiosIns
