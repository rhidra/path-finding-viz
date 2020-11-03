import { Flex, Box, DarkMode } from '@chakra-ui/core';
import Console from '../components/console';
import Controls from '../components/controls';
import Map from '../components/map';

export default function Home() {
  return (
    <DarkMode>
      <Flex direction="column" w="100vw" h="100vh" p="0" bg="gray.700">
        <Flex flex={.2} direction="row" bg="gray.800">
          <Box flex={.6}>
            <Controls 
                onChange={e => console.log(e)}
                onFindPath={() => console.log('Start Phi* algorithm !')}
                onStartRobot={() => console.log('Start Robot !')}
              />
          </Box>
          <Box flex={.4} bg="gray.600">
            <Console/>
          </Box>
        </Flex>
        <Box flex={.8}>
          <Map/>
        </Box>
      </Flex>
    </DarkMode>
  )
}
