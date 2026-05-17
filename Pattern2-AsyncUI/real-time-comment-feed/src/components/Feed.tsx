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
    const [offSet, setOffset] = useState(0)

    const offsetRef = useRef(null); //using Ref instead of state here, because change in offsetRef doesn't impact rendering on the UI
    const hasFetched = useRef(false)

    const fetchComments = async(currentOffset: number, abortSignal: AbortSignal)=>{
        try{    


            const response = await fetch(`${url}?limit=${LIMIT}&skip=${currentOffset}`, {
                signal: abortSignal
            })
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
        
    
        const abc = new AbortController()

        fetchComments(offSet, abc.signal);

        return () => {
            abc.abort()
        }

    },[offSet])



    useEffect(() => {
        //Poll every 2 seconds
        const intervalId = setInterval(()=>{
            setOffset(pev => pev + LIMIT)
        },3000);

        return ()=>clearInterval(intervalId);
    }, [])
  return (
    <ul>
      {comments.map((comment)=><Comment comment= {comment} key={comment.id} newComments ={newComments}/>)}
    </ul>
  )
}

export default Feed
