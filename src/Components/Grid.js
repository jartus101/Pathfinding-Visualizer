import React, { useState } from 'react';
import './Grid.css';
import Node from './Node';
import { cyan, teal, grey, red, green } from '@mui/material/colors';
import {BFS, DFS, AStar} from './Algorithms.js'

const Grid = ({ rows, cols }) => {
  const initialGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => grey[0])
  );

  //VARIABLES
  const [grid, setGrid] = useState(initialGrid);
  const [algorithm, setAlgorithm] = useState("DFS");
  const mazeAlgos = [];
  const [startx, setStartX] = useState(0);
  const [starty, setStartY] = useState(0);
  const [endx, setEndX] = useState(rows-1);
  const [endy, setEndY] = useState(cols-1);

  //Visit a specific node
  const visitNode = (i, j, color) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      newGrid[i][j] = color;
      return newGrid;
    });
  };

  //wall node
  const handleNodeClick = (i, j) => {
    const newGrid = grid.map(row => [...row]);
    newGrid[i][j] = grey[500];
    setGrid(newGrid);
  };

  //whiten grid
  const clearBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        visitNode(i, j, grey[0]);
      }
    }
  };

  //clear out all non-walls
  const clearPaths = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j]!=grey[500]){
          visitNode(i, j, grey[0]);
        }
      }
    }
  };

  const chooseAlgorithm = (event) => {
    setAlgorithm(event.target.value);
  }

  //use bfs in ./Algorithms.js to render the output
  const renderAlgorithm = (alg) => {
    clearPaths();
    const algorithmMap = {"DFS": DFS, "BFS": BFS, "ASTAR": AStar};
    let delay = 0;
    const helper = grid.map((row, i) => {
      return row.map((color, j) => {
        if (color == grey[500]){
          return 1;
        } else {
          return 0;
        }
      })
    })

    let bfs = algorithmMap[algorithm](helper, startx, starty, endx, endy);
    const path = bfs[0];
    if (path == []) {
      for (let i = 0; i < visited.length; i++) {
        setTimeout(() => {
          visitNode(visited[i][0], visited[i][1], cyan[500]);
        }, delay);
        delay += 5;
      }
      return;
    }
    const visited = bfs[1];

    for (let i = 0; i < visited.length; i++) {
      setTimeout(() => {
        visitNode(visited[i][0], visited[i][1], cyan[500]);
      }, delay);
      delay += 5;
    }
    
    if(path.length==0) {
      for (let i = 0; i < visited.length; i++) {
        setTimeout(() => {
          visitNode(visited[i][0], visited[i][1], red[500]);
        }, delay);
        delay+=5
      }
    } else {
      for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
          visitNode(path[i][0], path[i][1], teal[500]);
        }, delay);
        delay += 20;
      }
    }
  }

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const chooseStartAndEnd = (event) => {
    event.preventDefault();
    let start = inputs.start;
    let end = inputs.end;
    if (start==end) {
      alert("start and end cannot be the same");
      return;
    }

    if (start.split(',').length-1==0 || start.split(',').length-1>1 || end.split(',').length-1==0 || end.split(',').length-1>1) {
      alert("Invalid Input. Try something like '0,0'");
      return;
    }
    let startCoords = start.split(",");
    let endCoords = end.split(",");

    visitNode(startx, starty, grey[0])
    visitNode(endx, endy, grey[0])

    let newStartX = parseInt(startCoords[0]);
    let newStartY = parseInt(startCoords[1]);
    let newEndX = parseInt(endCoords[0]);
    let newEndY = parseInt(endCoords[1]);

    if (newStartX < 0 || newStartX >= rows || newStartY < 0 || newStartY >= cols || newEndX < 0 || newEndX >= rows || newEndY < 0 || newEndY >= cols) {
      alert("Invalid Coordinates. Out of bounds.");
      return;
    }

    setStartX(newStartX);
    setStartY(newStartY);
    visitNode(newStartX, newStartY, green[500]);

    setEndX(newEndX);
    setEndY(newEndY);
    visitNode(newEndX, newEndY, red[500]);
  }

  return (
    <div>
      <div>
        <button onClick={clearBoard}>Clear Grid</button>
        <label className={"label"}> CHOOSE ALGORITHM:
          <select onChange={chooseAlgorithm}>
            <option value="DFS">DFS</option>
            <option value="BFS">BFS</option>
            <option value="ASTAR">A*</option>
          </select>
        </label>
        <button onClick={renderAlgorithm}>Render Algorithm</button>
        <form onSubmit={chooseStartAndEnd}>
          <label>Choose Start Coordinates (i,j):
          <input 
            type="text" 
            name="start" 
            value={inputs.start || ""} 
            onChange={handleChange}
          />
          </label>
          <label>Choose End Coordinates (i,j):
            <input 
              type="text"
              name="end"
              value={inputs.end || ""} 
              onChange={handleChange}
            />
            </label>
            <input type="submit" />
        </form>
        <button>Generate Maze</button>
      </div>
      
      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="grid-row">
            {row.map((color, j) => (
              <Node key={i + "," + j} color={color} onClick={() => handleNodeClick(i, j)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
