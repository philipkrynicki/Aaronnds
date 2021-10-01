import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { addCommentAsync } from "../redux/cardsSlice";

const Comments = () => {
  const card = useSelector(state => state.card);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();

  const newCommentForm = () => {
    return (
      <div className="comment-input-row">
        <div className="comment-form input-group mb-3">
          <input type="text" className="form-control" placeholder="Write new comment" onChange={ (e) => setNewComment(e.target.value) }></input>
          <button type="button" className="button btn btn-primary btn-sm com-inp-btn" onClick={ () => handleCommentSubmit()}>Post</button>
        </div>
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
      <div className="col all-comments-col">
      {card.comments.map((comment) => {
          return (
              <div className="row ind-comment-row">
                <div className="col rounded ind-comment-col">
                  <p className="comment-username">{comment.user.name}</p>
                  <p className="comment-time">{comment.created}</p>
                  <hr/>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
          )
        })
      }
      </div>
    

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