import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { addCommentAsync, editCommentAsync } from "../redux/cardsSlice";

const Comments = () => {
  const card = useSelector(state => state.card);
  const [newComment, setNewComment] = useState('');
  const [editing, setEditing] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState('');
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

  const commentRegular = (comment) => {
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

  const handleEditComment = (comment) => {
    setEditing(true)
    setCommentToEdit(comment._id)
  }

  const handleDeleteComment = () => {

  }

  const handleEditSubmit = (comment) => {
    dispatch(editCommentAsync({
      comment: comment._id,
      text: newComment
    }))
    setEditing(false);
    setCommentToEdit('');
  }

  const editCommentForm = (comment) => {
    return (
      <li key={ comment._id }>
        <input type="text" className="form-control" defaultValue={comment.text} onChange={(e) => setNewComment(e.target.value)}>
        </input>
        <button type="button" className=" btn  btn-sm " onClick={() => handleEditSubmit(comment)}>Submit Changes</button>
      </li>
    )
  }

  return (
//add logic to show buttons to edit and delete only if current user made those comments? 

      <div className="col all-comments-col">
        { card.comments.map((comment) => {
          return editing && commentToEdit === comment._id ? editCommentForm(comment) : commentRegular(comment) 
        })
      }
      </div>


      <div>
        {newCommentForm()}
      </div>
    </div>
  )
}

export default Comments