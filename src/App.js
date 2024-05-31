import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Grid from './Components/Grid'
import './App.css'
import Node from './Components/Node'
import { blueGrey } from '@mui/material/colors';

function App() {
  return (
    <div className = "App">
      <Grid rows={15} cols={25}></Grid>
    </div>
  )
}

export default App