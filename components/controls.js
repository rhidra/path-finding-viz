import { Button, VStack, Flex, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, FormControl, FormLabel } from "@chakra-ui/core";
import {useState, useEffect} from 'react';
import { Config } from "../utils/config";

export default function Controls({onChange, onFindPath, onStartRobot, onGenerateObstacles, config}) {

  // useEffect(() => onChange(config), [config])

  return (
    <Flex h="100%" w="100%" p={4} direction="row" justify="space-between" align="center">
      <VStack spacing={3}>
        <FormControl>
          <FormLabel color="white">Exploration coef</FormLabel>
          <NumberInput defaultValue={config ? config.explCoef : null} onChange={e => !isNaN(+e) ? onChange(Object.assign(config, {explCoef: +e})) : null}
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
          <NumberInput defaultValue={config ? config.sensorRadius : null} onChange={e => !isNaN(+e) ? onChange(Object.assign(config, {sensorRadius: +e})) : null}
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
          <NumberInput defaultValue={config ? config.robotSpeed : null} onChange={e => !isNaN(+e) ? onChange(Object.assign(config, {robotSpeed: +e})) : null}
                        min="1" max="1000"
                        color="white" w={200}>
            <NumberInputField placeholder="10" />
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel color="white">Animation speed</FormLabel>
          <NumberInput defaultValue={config ? config.animSpeed : null} onChange={e => !isNaN(+e) ? onChange(Object.assign(config, {animSpeed: +e})) : null}
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