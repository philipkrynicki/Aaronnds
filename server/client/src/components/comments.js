import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { addCommentAsync } from "../redux/cardsSlice";

const Comments = () => {
  const card = useSelector(state => state.card);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();

  const newCommentForm = () => {
    return (
      <div className="comment-form">
        <input type="text" className="form-control" placeholder="Enter new comment" onChange={ (e) => setNewComment(e.target.value) }></input>
        <button type="button" className="button btn btn-primary btn-sm" onClick={ () => handleCommentSubmit()}>Post Comment</button>
      </div>
    )
  }

  const handleCommentSubmit = () => {
    if (!newComment) {
      return alert("Please enter comment text")
    }
    
    dispatch(addCommentAsync({
      card: card._id,
      text: newComment
    }))
    setNewComment("");
  }
  return (

    <div>
      <ul>
      {card.comments.map((comment) => {
          return (
            <li>
              {comment.text} -- Posted by {comment.userName} at {comment.created}
            </li>
          )
        })
      }
      </ul>
    

      <div>
        {newCommentForm()}
      </div>
    </div>
    // <div className="comment-form">
    //     <input type="text" className="form-control" placeholder="Enter new comment" onChange={ (e) => setNewComment(e.target.value) }></input>
    //     <button type="button" className="button btn btn-primary btn-sm" onClick={ () => handleCommentSubmit()}>Post Comment</button>
    // </div>
  )
}

export default Comments