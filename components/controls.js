import { Button, VStack, Flex, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, FormControl, FormLabel, FormHelperText } from "@chakra-ui/core";
import React, {setState} from 'react';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      explCoef: 1, 
      sensorRadius: 10, 
      speed: 10
    };
  }

  componentDidMount() {
    this.props.onChange(this.state);
  }

  handleChange(e, key) {
    if (!isNaN(+e)) {
      this.setState({[key]: +e});
      this.props.onChange(this.state);
    }
  }

  render() {
    return (
      <Flex h="100%" w="100%" p={4} direction="row" justify="space-between" align="center">
        <VStack spacing={3}>
          <FormControl>
            <FormLabel color="white">Exploration coef</FormLabel>
            <NumberInput defaultValue={1} onChange={e => this.handleChange(e, 'explCoef')}
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
            <NumberInput defaultValue={10} onChange={e => this.handleChange(e, 'sensorRadius')}
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
            <NumberInput defaultValue={10} onChange={e => this.handleChange(e, 'speed')}
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
          <Button colorScheme="gray" variant="outline" type="button" onClick={() => this.props.onFindPath()}>Find a path</Button>
          <Button colorScheme="teal" type="button" onClick={() => this.props.onStartRobot()}>Start robot</Button>
        </VStack>
      </Flex>
    );
  }
}