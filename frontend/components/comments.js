import React from "react"

const CommentsCompo = ({ comments }) => {
  const commentaire = comments
    return (
      <div>
        {console.log("comments",comments)}
        <div>
          {comments.map((item) => {  return( <ul class="uk-comment-list">
    <li><span key={item.id}>  {item.contenu} </span></li> </ul> )})}
        </div>
      </div>
    )
}

export default CommentsCompo
