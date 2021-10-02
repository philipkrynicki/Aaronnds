import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { addCommentAsync, editCommentAsync, deleteCommentAsync } from "../redux/cardsSlice";
import {Create, Trash} from 'react-ionicons';

const Comments = () => {
  const card = useSelector(state => state.card);
  const [newComment, setNewComment] = useState('');
  const [editing, setEditing] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState('');
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const newCommentForm = () => {
    return (
      <div>
        {user.authenticated && 
          <form onSubmit={handleCommentSubmit} >
            <div className="comment-input-row">
              <div className="comment-form input-group mb-3">
                <input type="text" className="form-control" value={newComment} placeholder="Write new comment" onChange={ (e) => setNewComment(e.target.value)}></input>
                <button type="submit" className="button btn btn-dark btn-sm com-inp-btn">Post</button>
              </div>
            </div>
          </form>
        }
      </div>
    )
  }

  const commentRegular = (comment) => {
    return (
       <div className="row ind-comment-row" key={comment._id}>
          <div className="col rounded ind-comment-col">

            <div className="row">
              <div className="col-6">
                <p className="comment-username">{comment.user.name}</p>
                <p className="comment-time">{comment.created}</p>
              </div>

              <div className="col-6 text-end">

                {user.authenticated && <div>
                  <Create className="comment-edit-icon" onClick={() => handleEditComment(comment)}/>
                  <Trash className="comment-delete-icon" onClick={() => handleDeleteComment(comment)}/>
                </div> }
              </div>

            </div>

            <hr/>
          <p className="comment-text">{ comment.text }</p>
        </div>       
      </div>
    )
  }

  const handleCommentSubmit = (e) => {
    if (!newComment) {
      return alert("Please enter comment text")
    }
    e.preventDefault();

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

  const handleCloseEditComment = (comment) => {
    setEditing(false);
  }

  const handleDeleteComment = (comment) => {
    //eslint-disable-next-line
    const isConfirmed = confirm('This will delete your comment. Continue?');

    if (isConfirmed) {
      dispatch(deleteCommentAsync({
        comment: comment._id
      }))
   }
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
      <div className="row ind-comment-row" key={comment._id}>
          <div className="col rounded ind-comment-col">

            <div className="row">
              <div className="col-6">
                <p className="comment-username">{comment.user.name}</p>
                <p className="comment-time">{comment.created}</p>
              </div>

              <div className="col-6 text-end">

                {user.authenticated && <div>
                  <Create className="comment-edit-icon" onClick={() => handleCloseEditComment(comment)}/>
                  <Trash className="comment-delete-icon" onClick={() => handleDeleteComment(comment)}/>
                </div> }
              </div>

            </div>

          <hr />

          <div className="input-group mb-3">
            <input type="text" className="form-control" defaultValue={comment.text} aria-label={comment.text} aria-describedby="button-addon" onChange={(e) => setNewComment(e.target.value)} />
            <button className="btn btn-outline-secondary btn-sm" type="button" id="button-addon" onClick={() => handleEditSubmit(comment)}>Save</button>
          </div>
                  
        </div>
      </div>
    )
  }

  return (
//add logic to show buttons to edit and delete only if current user made those comments? 
    <div>
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