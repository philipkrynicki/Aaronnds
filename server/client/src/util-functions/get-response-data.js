import axios from 'axios';

// Returns the relevent data from a POST request
const getResponseData = async (url, body) => {

  // Data from a socket
  if (body.hasOwnProperty('_id'))
    return body;
  
  // Data from an http request
  const response = await axios.post(url, body);
  return response.data;
}

export default getResponseData;