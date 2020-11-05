import { Box } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import Cell from './cell';

export default function Map({grid, cellSize}) {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const c = [];
    grid.forEach((col, x) => col.forEach((cell, y) => cell ? c.push({x, y}) : null));
    setCells(c);
  }, [grid])

  return (
    <Box 
        position="relative"
        bg="linear-gradient(rgba(74, 85, 104, .3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 85, 104, .3) 1px, transparent 1px)" 
        bgSize={`${cellSize}px ${cellSize}px`}
        w="100%" h="100%"
      >
      {cells.map(({x, y}) => (
        <Cell key={`${x}-${y}`} cellSize={cellSize} x={x} y={y}/>
      ))}
    </Box>
  );
}
