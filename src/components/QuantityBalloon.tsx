import { Flex, Text } from '@chakra-ui/react';

interface QuantityBalloonProps {
  quantity: string;
}

export function QuantityBalloon({ quantity }: QuantityBalloonProps) {
  return (
    <Flex
      bg="red.500"
      w="1.5rem"
      h="1.5rem"
      borderRadius="50%"
      justify="center"
      align="center"
      position="absolute"
      right="0.5rem"
      bottom="0.5rem"
    >
      <Text fontSize="0.75rem">{quantity}</Text>
    </Flex>
  );
}
