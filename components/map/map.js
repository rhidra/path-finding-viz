import { Box } from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { dist, getGridPolygonBoundaries, pointInPolygon } from '../../utils/math';
import Cell from './cell';
import PendingPolygon from './pending-polygon';
import Polygons from './polygons';

const CLOSING_POLY_RADIUS = 20;

export default function Map({cellSize}) {
  const ref = useRef(null);
  const [cells, setCells] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [pendingPolygon, setPendingPolygon] = useState([]);
  const [grid, setGrid] = useState([[]]);

  useEffect(() => {
    const c = [];
    grid.forEach((col, x) => col.forEach((cell, y) => cell ? c.push({x, y}) : null));
    setCells(c);
  }, [grid]);

  useEffect(() => {
    const wGrid = Math.floor(ref.current.clientWidth / cellSize);
    const hGrid = Math.floor(ref.current.clientHeight / cellSize);
    let g;
    if (grid.length !== wGrid || grid[0].length !== hGrid) {
      g = new Array(wGrid).fill(0).map(() => new Array(hGrid).fill(0).map(() => false));
    } else {
      g = grid.map(col => col.slice());
    }
    if (polygons.length === 0) { return; }

    const poly = polygons[polygons.length-1];
    const [[x1, y1], [x2, y2]] = getGridPolygonBoundaries(poly, cellSize);
    for (let i = x1; i < x2; ++i) {
      for (let j = y1; j < y2; ++j) {
        if (pointInPolygon([i*cellSize, j*cellSize], poly)) {
          g[i][j] = true;
          g[i-1][j] = true;
          g[i][j-1] = true;
          g[i-1][j-1] = true;
        }
      }
    }
    setGrid(g);
  }, [polygons])

  function handleClick(e) {
    const rect = ref.current.getBoundingClientRect();
    const doc = document.documentElement;
    const [x, y] = [e.clientX - (rect.left + window.pageXOffset) - doc.clientLeft, e.clientY - (rect.top + window.pageYOffset) - doc.clientTop];
    if (pendingPolygon.length >= 3 && dist(pendingPolygon[0], [x, y]) < CLOSING_POLY_RADIUS) {
      setPolygons(polygons.concat([pendingPolygon]));
      setPendingPolygon([]);
    } else {
      setPendingPolygon(pendingPolygon.concat([[x, y]]));
    }
  }

  return (
    <Box 
        ref={ref}
        position="relative"
        bg="linear-gradient(rgba(74, 85, 104, .3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 85, 104, .3) 1px, transparent 1px)" 
        bgSize={`${cellSize}px ${cellSize}px`}
        w="100%" h="100%"
        onClick={e => handleClick(e)}
      >
      {cells.map(({x, y}) => (
        <Cell key={`${x}-${y}`} cellSize={cellSize} x={x} y={y}/>
      ))}
      
      <Box position="relative" h="100%" zIndex="5">
        <svg width="100%" height="100%">
          <Polygons polygons={polygons}/>
          <PendingPolygon points={pendingPolygon}/>
        </svg>
      </Box>
    </Box>
  );
}
