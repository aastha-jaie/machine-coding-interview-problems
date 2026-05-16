import { useEffect, useRef, useState } from "react"
import Comment, { type commentType } from "./Comment"

const url = 'https://dummyjson.com/comments'
const LIMIT = 5;
type Comment ={
    id:number, 
    body:string
}
function Feed() {

    const [comments, setComments] = useState<Comment[]>([]);
    const [newComments, setNewComments] = useState<Set<number>>(new Set());

    const offsetRef = useRef(0);
    const hasFetched = useRef(false)

    const fetchComments = async(currentOffset: number)=>{
        try{    
            const response = await fetch(`${url}?limit=${LIMIT}&skip=${currentOffset}`)
            const data = await response.json();

            const fetchedComments = data.comments;

            //store new Ids for highlighting
            const ids = new Set<number>(
                fetchedComments.map((comment:commentType) => comment.id)
            )
            setNewComments(ids);
            setComments((prev)=> [...prev, ...fetchedComments]);

            //Remove highlight after 2 seconds
            setTimeout(()=>{
                setNewComments(new Set())
            },2000)
        }
        catch(error){
            console.error("API Error:", error);
        }
    }

    useEffect(()=>{
        if(hasFetched.current) return; //to prevent useEffect calling twice

        hasFetched.current = true;

        //Initialize API call
        fetchComments(0);

        //Poll every 2 seconds
        const intervalId = setInterval(()=>{
            offsetRef.current = offsetRef.current + LIMIT;
            fetchComments(offsetRef.current);
        },3000);

    },[])
  return (
    <ul>
      {comments.map((comment)=><Comment comment= {comment} key={comment.id} newComments ={newComments}/>)}
    </ul>
  )
}

export default Feed
