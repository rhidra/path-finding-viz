import { Box } from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { dist, getGridPolygonBoundaries, pointInPolygon } from '../../utils/math';
import Node from './node';
import PendingPolygon from './pending-polygon';
import Polygons from './polygons';
import Path from './path';

const CLICK_RADIUS = 20;

export default function Map({cellSize, start, goal, polygons, onSetPolygons, path, nodes, onSetStart, onSetGoal, animSpeed}) {
  const ref = useRef(null);
  const [pendingPolygon, setPendingPolygon] = useState([]);
  const [holding, setHolding] = useState(false);

  function extractMouseCoord(e) {
    const rect = ref.current.getBoundingClientRect();
    const doc = document.documentElement;
    return [e.clientX - (rect.left + window.pageXOffset) - doc.clientLeft, e.clientY - (rect.top + window.pageYOffset) - doc.clientTop];
  }

  function handleClick(e) {
    const [x, y] = extractMouseCoord(e);
    let p = null;

    if (e.type === 'mousedown') {
      if (dist([start[0]*cellSize, start[1]*cellSize], [x, y]) < CLICK_RADIUS) {
        setHolding('start');
      } else if (dist([goal[0]*cellSize, goal[1]*cellSize], [x, y]) < CLICK_RADIUS) {
        setHolding('goal');
      } else if (polygons.some(poly => {if (pointInPolygon([x, y], poly)) {p = poly; return true} else return false})) {
        setHolding({poly: p, click: [x, y], idx: polygons.indexOf(p)});
      }
    } else {
      if (holding === 'start' || holding === 'goal' || (typeof holding === 'object' && holding !== null)) {
        setHolding(false);
      } else if (pendingPolygon.length >= 3 && dist(pendingPolygon[0], [x, y]) < CLICK_RADIUS) {
        onSetPolygons(polygons.concat([pendingPolygon]));
        setPendingPolygon([]);
      } else {
        setPendingPolygon(pendingPolygon.concat([[x, y]]));
      }
    }
  }

  function handleMouseMove(e) {
    if (!holding) { return; }

    const [x, y] = extractMouseCoord(e);
    if (holding === 'start') {
      onSetStart([Math.floor(x / cellSize), Math.floor(y / cellSize)]);
    } else if (holding === 'goal') {
      onSetGoal([Math.floor(x / cellSize), Math.floor(y / cellSize)]);
    } else if ('poly' in holding) {
      const half1 = polygons.slice(0, holding.idx);
      const half2 = polygons.slice(holding.idx + 1);
      const poly = holding.poly.map(pt => [pt[0] + x - holding.click[0], pt[1] + y - holding.click[1]]);
      onSetPolygons([...half1, poly, ...half2]);
    }
  }

  return (
    <Box 
        ref={ref}
        position="relative"
        bg="linear-gradient(rgba(74, 85, 104, .3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 85, 104, .3) 1px, transparent 1px)" 
        bgSize={`${cellSize}px ${cellSize}px`}
        w="100%" h="100%"
        onMouseMove={e => handleMouseMove(e)}
        onMouseDown={e => handleClick(e)}
        onMouseUp={e => handleClick(e)}
      >

      {start && 
        <Node type="start" x={start[0]} y={start[1]} cellSize={cellSize}/>
      }
      {goal && 
        <Node type="goal" x={goal[0]} y={goal[1]} cellSize={cellSize}/>
      }

      <Box position="relative" h="100%" zIndex="5">
        <svg width="100%" height="100%">
          <Path {...{cellSize, nodes, path, animSpeed}}/>
          <Polygons polygons={polygons}/>
          <PendingPolygon points={pendingPolygon}/>
        </svg>
      </Box>
    </Box>
  );
}
