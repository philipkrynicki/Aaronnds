import { useSelector } from "react-redux"

const Activities = () => {
  const card = useSelector(state => state.card)
  
  return (
    <div>
      { card.activities.map((activity) => {
        return (
          <li>
            {activity}
          </li>
        )
      })}
    </div>
  )
}

export default Activities