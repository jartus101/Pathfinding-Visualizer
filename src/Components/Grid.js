import React, { useState } from 'react';
import './Grid.css';
import Node from './Node';
import { cyan, teal, grey, red } from '@mui/material/colors';
import {BFS, DFS} from './Algorithms.js'

const Grid = ({ rows, cols }) => {
  const initialGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => grey[0])
  );

  //VARIABLES
  const [grid, setGrid] = useState(initialGrid);
  const algorithms = ["dfs", "bfs", "astar"];
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

  //use bfs in ./Algorithms.js to render the output
  const renderAlgorithm = (alg) => {
    clearPaths();
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

    let bfs = BFS(helper, 7, 0, 7, 24);
    console.log(bfs)
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

  return (
    <div>
      <div>
        <button onClick={clearBoard}>Clear Grid</button>
        <label className={"label"}> CHOOSE ALGORITHM:
          <select>
            <option>DFS</option>
            <option>BFS</option>
            <option>ASTAR</option>
          </select>
        </label>
        <button onClick={renderAlgorithm}>Render Algorithm</button>
        <button>Choose Start</button>
        <input></input>
        <button>Choose End</button>
        <input></input>
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
