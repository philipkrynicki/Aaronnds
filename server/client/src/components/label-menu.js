import { useSelector, useDispatch } from "react-redux"
import {useState } from "react"
import { addLabelAsync, deleteLabelAsync } from "../redux/cardsSlice";

const LabelMenu = () => {
  const card = useSelector(state => state.card);
 
  const dispatch = useDispatch();
  
  const colors = ["brown", "blue", "black", "green", "red", "orange", "purple"];

  
  const alreadyChecked = colors.map(color => {
    return card.labels.includes(color)    
  })

  const [checkedState, setCheckedState] = useState(alreadyChecked)  

  const submitLabel = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    if (card.labels.includes(e.target.value)) {
      dispatch(deleteLabelAsync({
        card: card._id,
        data: { data: e.target.value }
      }))
    } else {
      
      dispatch(addLabelAsync({
        card: card._id,
        label: { label: e.target.value }
      }))
    }
  }

  const labelForm = () => {
    return (
      <div>
        {colors.map((color, index) => {
            
          return (
            <div className="form-check" key={ index }>
              <input onChange={ (e) => submitLabel(e, index) } className="form-check-input" type="checkbox" value={ color } name={ color } checked={ checkedState[index] } id="flexCheckLabel1"></input>
              <label style={ { color: color } } className="form-check-label" htmlFor="flexCheckLabel1">
                { color }
              </label>
            </div>
          )
        })}
     </div> 
    )
  }
  
    return (
      <div className="btn-group dropend">
        <button type="button" className="btn btn-success card-detail-btn btn-sm dropdown-toggle" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Labels</button>
    
        <div className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
          <div className="labels-dropdown-options">
            {labelForm()} 
            
          </div>
        </div>
      </div>
    )

}

export default LabelMenu