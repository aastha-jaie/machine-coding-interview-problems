import { useState } from "react";


const initialGrid = Array.from({length:3},()=>Array.from({length:3}));
const Board = ()=>{
    const [board,setBoard] = useState(initialGrid);
    
    const [isXTurn,setXTurn] = useState(true);
    const [winner, setWinner] = useState("");

    const handleCellClick = (row, col)=>{
        if(board[row][col] || checkWinner(board)){
            return;
        }
        //deep copy
        const newBoard = board.map((r)=>[...r]);

        newBoard[row][col] = isXTurn ? "X" :"O";


        setBoard(newBoard)
        const winner = checkWinner(newBoard);
        if(winner){
            setWinner(winner);
            return;
        }
         if(isDraw(newBoard)){
            setWinner('Match Draw')
         }
        setXTurn(!isXTurn);
    }

    const checkWinner = (board)=>{
        //rows
        for(let i = 0; i < 3; i++){
            if(board[i][0] === board[i][1] && board[i][1]=== board[i][2]){
                return board[i][0];
            }
        }

        //cols
        for(let i = 0; i < 3; i++){
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
                return board[0][i];
            }
        }

        //diagonals
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2]){
            return board[0][0];
        }
        if(board[0][2] === board[1][1] && board[1][1] === board[2][0]){
            return board[0][2];
        }
        return null
    }
    const isDraw = (board)=>{
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(!board[i][j]){
                    return false;
                }
            }
        }
        return true;
    }
    
    const resetGame = ()=>{
        setBoard(initialGrid);
    }
    return (
        <div className="tic-tac-toe-game"> 
        {winner &&         
        <div className="winner-text">Match Results: {winner} </div>}
         <div className="board"> 
        {board.map((row,rowIndex)=>(
            row.map((cell,colIndex)=><div key={`row-${rowIndex}_col-${colIndex}`} className="cell" onClick={()=>handleCellClick(rowIndex,colIndex)}>{cell}</div>)
        ))}
    </div>
    <button className="reset-btn" onClick={()=>resetGame()}>Reset Game</button>

    </div>
    )
}
export default Board;