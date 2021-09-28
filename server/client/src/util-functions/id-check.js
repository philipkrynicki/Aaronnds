import _ from "lodash"

// This function makes sure an id doesn't already exist in the state
const checkDuplicateIds = (state, id) => {
  const ids = state.map(obj => obj._id);
      
  if (_.includes(ids, id))
    return true
  
  return false
}

export default checkDuplicateIds