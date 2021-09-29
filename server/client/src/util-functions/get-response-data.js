import axios from 'axios';

// Returns the relevent data from a POST request
const getPostData = async (url, body) => {

  // Data from a socket
  if (body.hasOwnProperty('_id'))
    return body;

  let reqBody = {};

  if (body.hasOwnProperty('nameObj'))
    reqBody = body.nameObj
  else
    reqBody = body;
  
  // Data from an http request
  const response = await axios.post(url, reqBody);
  return response.data;
}

export default getPostData;