import { useSelector } from "react-redux"

const Activities = () => {
  const card = useSelector(state => state.card)
  
  return (
    <ul>
      { card.activities.map((activity, i) => {
        return (
          <li key={i}>
            {activity}
          </li>
        )
      })}
    </ul>
  )
}

export default Activities