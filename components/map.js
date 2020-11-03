import { Box } from '@chakra-ui/core';
import React from 'react';
import Cell from './cell';

export default class Map extends React.Component {
  cellSize = 10;

  constructor(props) {
    super(props);
    this.state = {
      cells: [],
    };
  }

  componentDidMount() {
    const width = this.divRef.clientWidth;
    const height = this.divRef.clientHeight;
    const wGrid = Math.floor(width / this.cellSize);
    const hGrid = Math.floor(height / this.cellSize);
    this.grid = new Array(wGrid).fill(0).map(() => new Array(hGrid).fill(false));
    this.grid[1][50] = true;
    this.grid[0][50] = true;
    this.grid[10][5] = true;
    this.grid[9][4] = true;
    this.grid[9][3] = true;
    this.grid[50][50] = true;
    this.makeCells();
  }

  makeCells() {
    const cells = [];
    this.grid.forEach((col, x) => col.forEach((c, y) => c ? cells.push({x, y}) : null));
    this.setState({cells});
  }

  render() {
    return (
      <Box 
          ref={element => this.divRef = element}
          position="relative"
          bg="linear-gradient(rgba(74, 85, 104, .3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 85, 104, .3) 1px, transparent 1px)" 
          bgSize={`${this.cellSize}px ${this.cellSize}px`}
          w="100%" h="100%"
        >
        {this.state.cells.map(({x, y}) => (
          <Cell key={`${x}-${y}`} cellSize={this.cellSize} x={x} y={y}/>
        ))}
      </Box>
    );
  }
}