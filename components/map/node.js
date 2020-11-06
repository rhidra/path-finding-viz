import { Circle } from "@chakra-ui/core";
import { useState } from "react";

export default function Node({cellSize, x, y, type}) {
  const styles = type === 'start' ? {
    bg: 'red.500',
    cursor: 'pointer',
  } : type === 'goal' ? {
    bg: 'blue.500',
    cursor: 'pointer',
  } : {bg: 'purple.700'};

  return (
    <Circle 
        {...styles}
        size={`${cellSize + 2}px`}
        pos="absolute"
        top={`${cellSize*y}px`}
        left={`${cellSize*x}px`}
        zIndex="10"
        transform="translate(-50%, -50%)"
      >
    </Circle>
  );
}