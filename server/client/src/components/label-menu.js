import { useSelector, useDispatch } from "react-redux"
import {useState, useEffect } from "react"
import { addLabelAsync, deleteLabelAsync } from "../redux/cardsSlice";
import Select, { components }  from "react-select"


const LabelMenu = () => {
  const card = useSelector(state => state.card);
  const dispatch = useDispatch();
  
  const colors = ["brown", "blue", "black", "green", "red", "orange", "purple"];
  console.log(card.labels)
  const alreadyChecked = colors.map(color => {
    return card.labels.includes(color)    
  })
 

  const test = [true, false, true, false, false, false, true]
  const [checkedState, setCheckedState] = useState(alreadyChecked)
  
  console.log(alreadyChecked) //loads once with all false and then a second time correctly. The buttons all load unchecked. Every box click triggers two of these console.logs
 

  const submitLabel = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    console.log (e.target.value)
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
  
  return (
    <div className="btn-group dropend">
    <button type="button" className="btn btn-success card-detail-btn btn-sm dropdown-toggle" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Labels</button>
    
    <div className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
        <div className="labels-dropdown-options">
          { colors.map((color, index) => {
            
            return (
            <div className="form-check" key={index}>
                <input onChange={ (e) => submitLabel(e, index) } className="form-check-input" type="checkbox" value={ color } name={ color } checked={ checkedState[index]}id="flexCheckLabel1"></input>
              <label style={{ color: color }} className="form-check-label" htmlFor="flexCheckLabel1">
              {color}
              </label>
            </div>
            )
          })}
        
        
      </div>
    </div>
  </div>
)

}

export default LabelMenu


//react-select attempt below -- abandoned b/c docs aren't clear and style is wonky
  // const options = [
  //   { value: 'yellow', label: 'Yellow' },
  //   { value: 'blue', label: 'Blue' },
  //   { value: 'black', label: 'Black' },
  //   { value: 'green', label: 'Green' },
  //   { value: 'red', label: 'Red' },
  //   { value: 'purple', label: 'Purple' },
  //   { value: 'orange', label: 'Orange' }
  // ];

  // card.labels.forEach(label => {
  //   options.forEach(option => {
  //     option.value === label ? option.checked=true : option.checked=false
  //   })
  // })


  // const handleOptionSelect = (selected) => {
    
  //   setLabelToUpdate(selected.value)
  //   console.log(labelToUpdate)
  //   setLabelToUpdate('')
  // }

  // const Option = (props) => {
    
  //   return (
  //     <div>
  //       <components.Option { ...props }>
  //         <input
  //           type="checkbox"
  //           checked={ props.data.checked }
  //           onChange={ () => null }
  //         />{ " " }
  //         <label>{  props.label }</label>
  //       </components.Option>
  //     </div>
  //   )
  // }
  
  // return (
  //   <Select
  //         options={options}
  //         // isMulti
  //         closeMenuOnSelect={false}
  //         hideSelectedOptions={false}
  //         components={{
  //           Option
  //         }}
  //         onChange={handleOptionSelect}
  //         allowSelectAll={true}
  //         value={labelToUpdate}
  //       />
  // )