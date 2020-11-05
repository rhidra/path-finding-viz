import { Flex, Box, DarkMode } from '@chakra-ui/core';
import { useEffect, useRef, useState } from 'react';
import Console from '../components/console';
import Controls from '../components/controls';
import Map from '../components/map/map';
import {phiStar} from '../lib/phi-star';

const CELL_SIZE = 10;

export default function Home() {

  function handleStartPathFinding() {
    console.log('Start Phi* algorithm !');
    phiStar();
  }

  function handleGenerateObstacles() {
    let g = grid.map(col => col.map(() => Math.random() < .2));
    setGrid(g);
  }

  return (
    <DarkMode>
      <Flex direction="column" w="100vw" h="100vh" p="0" bg="gray.700">
        <Flex flex={.2} direction="row" bg="gray.800">
          <Box flex={.6}>
            <Controls 
                onChange={e => console.log(e)}
                onGenerateObstacles={() => handleGenerateObstacles()}
                onFindPath={() => handleStartPathFinding()}
                onStartRobot={() => console.log('Start Robot !')}
              />
          </Box>
          <Box flex={.4} bg="gray.600">
            <Console/>
          </Box>
        </Flex>
        <Box flex={.8}>
          <Map cellSize={CELL_SIZE}/>
        </Box>
      </Flex>
    </DarkMode>
  )
}
