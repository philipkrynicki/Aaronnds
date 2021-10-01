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
      <div className="comment-form">
        <input type="text" className="form-control" placeholder="Enter new comment" onChange={ (e) => setNewComment(e.target.value) }></input>
        <button type="button" className="button btn btn-primary btn-sm" onClick={ () => handleCommentSubmit()}>Post Comment</button>
      </div>
    )
  }

  const commentRegular = (comment) => {
    return (
      <li key={comment._id}>
        { comment.text } -- Posted by { comment.user.name } at { comment.created }<br />
        <button className="btn" onClick={ () => handleEditComment(comment) }><small><u>Edit</u></small></button>
        <button className="btn" onClick={ () => handleDeleteComment() }><small><u>Delete</u></small></button>
      </li>
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
    <div>
      <ul>
        { card.comments.map((comment) => {
          return editing && commentToEdit === comment._id ? editCommentForm(comment) : commentRegular(comment) 
        })
      }
      </ul>

      <div>
        {newCommentForm()}
      </div>
    </div>
  )
}

export default Comments