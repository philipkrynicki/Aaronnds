import { useSelector } from "react-redux"

const CardsAll = () => {
  const cards = useSelector(state => state.cards)
  const renderCards = () => {
    <div>I am a card</div>
  } 

  return (
  <div>
    {renderCards()}
  </div>
  )
}

export default CardsAll