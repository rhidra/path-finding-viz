import { Box } from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { dist, getGridPolygonBoundaries, pointInPolygon } from '../../utils/math';
import Node from './node';
import PendingPolygon from './pending-polygon';
import Polygons from './polygons';
import Path from './path';

const CLOSING_POLY_RADIUS = 20;

export default function Map({cellSize, start, goal, polygons, onSetPolygons, path, nodes}) {
  const ref = useRef(null);
  const [pendingPolygon, setPendingPolygon] = useState([]);

  function handleClick(e) {
    const rect = ref.current.getBoundingClientRect();
    const doc = document.documentElement;
    const [x, y] = [e.clientX - (rect.left + window.pageXOffset) - doc.clientLeft, e.clientY - (rect.top + window.pageYOffset) - doc.clientTop];
    if (pendingPolygon.length >= 3 && dist(pendingPolygon[0], [x, y]) < CLOSING_POLY_RADIUS) {
      onSetPolygons(polygons.concat([pendingPolygon]));
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
      
      {start && 
        <Node type="start" x={start[0]} y={start[1]} cellSize={cellSize}/>
      }
      {goal && 
        <Node type="goal" x={goal[0]} y={goal[1]} cellSize={cellSize}/>
      }

      <Box position="relative" h="100%" zIndex="5">
        <svg width="100%" height="100%">
          <Path path={path} nodes={nodes} cellSize={cellSize}/>
          <Polygons polygons={polygons}/>
          <PendingPolygon points={pendingPolygon}/>
        </svg>
      </Box>
    </Box>
  );
}
