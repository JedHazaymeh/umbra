const API_URL = (
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API
    : process.env.REACT_APP_API_DEV
) as string

export default API_URL