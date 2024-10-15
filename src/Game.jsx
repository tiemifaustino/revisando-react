import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // passo em que o usuário está vendo atualmente
  const xIsNext = currentMove % 2 === 0;
  // const [xIsNext, setXIsNext] = useState(true); // xIsNext === true quando currentMove é par e xIsNext === false quando currentMove é ímpar
  // sempre tente evitar state redundante
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // o slice é para não alterar o array original e gerar um novo array
    // history.slice(0, currentMove + 1) é para manter somente o histórico até o ponto de onde escolhi para voltar
    // se tive 4 jogadas e voltei para a jogada 1 ele vai trazer o histórico até ajogada 1 se eu formular outras jogadas a partir da jogada 1
    console.log(nextHistory, 'nextHistory');

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    console.log(history, 'history');
    console.log(currentSquares, 'currentSquares');
    
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    move > 0
      ? (description = `Go to move #${move}`)
      : (description = 'Go to game start');
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
