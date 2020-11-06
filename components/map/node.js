import { Circle } from "@chakra-ui/core";

export default function Node({cellSize, x, y, type}) {
  const styles = type === 'start' ? {
    bg: 'red.500',
  } : type === 'goal' ? {
    bg: 'blue.500'
  } : {bg: 'purple.700'};

  return (
    <Circle 
        {...styles}
        size={`${cellSize}px`}
        pos="absolute"
        top={`${cellSize*y}px`}
        left={`${cellSize*x}px`}
        zIndex="3"
        transform="translate(-50%, -50%)"
      >
    </Circle>
  );
}