import axios from 'axios';

// Returns the relevent data from a POST or PUT request
const getResponseData = async (url, body, httpMethod) => {

  // Data from a socket
  if (body.hasOwnProperty('_id'))
    return body;

  let reqBody = {};

  if (body.hasOwnProperty('nameObj'))
    reqBody = body.nameObj
  else
    reqBody = body;
  
  let response = {};

  // Data from an http request
  if (httpMethod === 'POST') 
    response = await axios.post(url, reqBody);
  else if (httpMethod === 'PUT') 
   response = await axios.put(url, reqBody);
  
  return response.data
}

export default getResponseData;