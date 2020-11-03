import { Box } from "@chakra-ui/core";

export default function Cell({cellSize, x, y}) {
  return (
    <Box 
        bg="red.500" 
        w={`${cellSize}px`} 
        h={`${cellSize}px`}
        pos="absolute"
        top={`${cellSize*y}px`}
        left={`${cellSize*x}px`}
      >
    </Box>
  );
}