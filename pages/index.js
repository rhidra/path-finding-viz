import { Flex, Box, DarkMode } from '@chakra-ui/core';
import { useEffect, useRef, useState } from 'react';
import Console from '../components/console';
import Controls from '../components/controls';
import Map from '../components/map';
import {phiStar} from '../lib/phi-star';

function handleStartPathFinding() {
  console.log('Start Phi* algorithm !');
  phiStar();
}

const CELL_SIZE = 10;

export default function Home() {
  const [grid, setGrid] = useState([[]]);
  const mapEl = useRef(null);

  // Initialization
  useEffect(() => {
    const wGrid = Math.floor(mapEl.current.clientWidth / CELL_SIZE);
    const hGrid = Math.floor(mapEl.current.clientHeight / CELL_SIZE);
    const g = new Array(wGrid).fill(0).map(() => new Array(hGrid).fill(false));
    g[1][50] = true;
    g[0][50] = true;
    g[10][5] = true;
    g[9][4] = true;
    g[9][3] = true;
    g[50][50] = true;
    setGrid(g);
  }, []);

  return (
    <DarkMode>
      <Flex direction="column" w="100vw" h="100vh" p="0" bg="gray.700">
        <Flex flex={.2} direction="row" bg="gray.800">
          <Box flex={.6}>
            <Controls 
                onChange={e => console.log(e)}
                onFindPath={() => handleStartPathFinding()}
                onStartRobot={() => console.log('Start Robot !')}
              />
          </Box>
          <Box flex={.4} bg="gray.600">
            <Console/>
          </Box>
        </Flex>
        <Box flex={.8} ref={mapEl}>
          <Map grid={grid} cellSize={CELL_SIZE}/>
        </Box>
      </Flex>
    </DarkMode>
  )
}
