import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    return(
        <button className="square"
                onClick={() => props.onClick()}>   
                {props.value} {/* when the square is clicked, the value will be updated to X */}
            </button>
    )
}

class Board extends React.Component {
    constructor(props) {    // adding a constructor to set the board's initial state to contain an array of 9 nulls for the 90 squares.
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); // .slice() creates a copy of the squares array to modify instead of modifying the existing array. 
        if (calculateWinner (squares) || squares [i]){  // ignores a click if someone has won the game or if a square is already filled.
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
        
    }

    renderSquare(i) {   // passing down a function from Board to Square. when clicked, Square will call the renderSquare function. 
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            // passing down two props from Board to Square: value and onClick. Square will call onClick when clicked. 
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares); 
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {  // renders board with placeholder values.
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [     // lists all possible layouts of winning.
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
