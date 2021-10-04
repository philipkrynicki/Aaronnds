import { useSelector, useDispatch } from "react-redux"
import {useState, useEffect } from "react"
import { addLabelAsync, deleteLabelAsync } from "../redux/cardsSlice";
const colors = ["brown", "blue", "black", "green", "red", "orange", "purple"];

const LabelMenu = () => {
  const card = useSelector(state => state.card);
  const [colorSelections, setColorSelections] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    setColorSelections(colors.map(color => card.labels.includes(color)))
  }, [card.labels])

  const submitLabel = (e, position) => {
    setColorSelections(prevColors => prevColors.map((color, i) => i === position ? !color : color))

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
              <input onChange={ (e) => submitLabel(e, index) } className="form-check-input" type="checkbox" value={ color } name={ color } checked={ colorSelections[index] ?? false } id="flexCheckLabel1"></input>
              <label style={{ color }} className="form-check-label" htmlFor="flexCheckLabel1">
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