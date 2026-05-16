interface CommentProps {
    comment: commentType;
    newComments:Set<number>
}
export type commentType = {
    id: number,
    body: string, 
    likes : number,
}

const Comment : React.FC<CommentProps> = ({comment, newComments})=>{
    console.log("newComments",newComments)
  return (
    <li className={newComments.has(comment.id) ? "highlight" : ""}>
      {comment.body}
    </li>
  )
}

export default Comment
