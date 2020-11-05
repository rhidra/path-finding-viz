import { Button, VStack, Flex, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, FormControl, FormLabel } from "@chakra-ui/core";
import {useState, useEffect} from 'react';

export default function Controls({onChange, onFindPath, onStartRobot, onGenerateObstacles}) {
  const [explCoef, setExplCoef] = useState(1);
  const [sensorRadius, setSensorRadius] = useState(10);
  const [speed, setSpeed] = useState(10);

  useEffect(() => onChange({explCoef, sensorRadius, speed}), [explCoef, sensorRadius, speed])

  return (
    <Flex h="100%" w="100%" p={4} direction="row" justify="space-between" align="center">
      <VStack spacing={3}>
        <FormControl>
          <FormLabel color="white">Exploration coef</FormLabel>
          <NumberInput defaultValue={1} onChange={e => !isNaN(+e) ? setExplCoef(+e) : null}
                        min="0.1" max="10" step={0.1} precision={2}
                        color="white" w={200}>
            <NumberInputField placeholder="1.5" />
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel color="white">Sensor radius</FormLabel>
          <NumberInput defaultValue={10} onChange={e => !isNaN(+e) ? setSensorRadius(+e) : null}
                        min="1" max="1000"
                        color="white" w={200}>
            <NumberInputField placeholder="10" />
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </VStack>
      
      <VStack>
        <FormControl>
          <FormLabel color="white">Robot speed</FormLabel>
          <NumberInput defaultValue={10} onChange={e => !isNaN(+e) ? setSpeed(+e) : null}
                        min="1" max="1000"
                        color="white" w={200}>
            <NumberInputField placeholder="10" />
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </VStack>
    
      <VStack spacing={10}>
        <Button colorScheme="gray" variant="outline" type="button" onClick={() => onGenerateObstacles()}>Generate obstacles</Button>
        <Button colorScheme="gray" variant="outline" type="button" onClick={() => onFindPath()}>Find a path</Button>
        <Button colorScheme="teal" type="button" onClick={() => onStartRobot()}>Start robot</Button>
      </VStack>
    </Flex>
  );
}