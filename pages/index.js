import { Flex, Box, DarkMode } from '@chakra-ui/core';
import { useEffect, useRef, useState } from 'react';
import Console from '../components/console';
import Controls from '../components/controls';
import Map from '../components/map/map';
import {phiStar} from '../lib/phi-star';
import { Config } from '../utils/config';

export default function Home() {
  const ref = useRef(null);
  const [config, setConfig] = useState(new Config());
  const [dims, setDims] = useState([10, 10]);
  const [polygons, setPolygons] = useState([]);
  const [start, setStart] = useState([5, 5]);
  const [goal, setGoal] = useState([100, 50]);
  const [path, setPath] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const wGrid = Math.floor(ref.current.clientWidth / config.cellSize);
    const hGrid = Math.floor(ref.current.clientHeight / config.cellSize);
    setDims([wGrid, hGrid])
  }, [])

  function handleStartPathFinding() {
    const [path, nodes] = phiStar(start, goal, dims[0], dims[1], polygons, config);
    setPath(path);
    setNodes(nodes);
  }

  return (
    <DarkMode>
      <Flex direction="column" w="100vw" h="100vh" p="0" bg="gray.700">
        <Flex flex={.2} direction="row" bg="gray.800">
          <Box flex={.6}>
            <Controls 
                onChange={c => setConfig(c)}
                onGenerateObstacles={() => {}}
                onFindPath={() => handleStartPathFinding()}
                onStartRobot={() => console.log('Start Robot !')}
              />
          </Box>
          <Box flex={.4} bg="gray.600">
            <Console/>
          </Box>
        </Flex>
        <Box flex={.8} ref={ref}>
          <Map {...{...config, start, goal, polygons, path, nodes}} 
              onSetPolygons={polygons => setPolygons(polygons)}
              onSetStart={s => setStart(s)}
              onSetGoal={g => setGoal(g)}/>
        </Box>
      </Flex>
    </DarkMode>
  )
}
