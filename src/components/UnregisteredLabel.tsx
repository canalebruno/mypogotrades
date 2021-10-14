import { Flex, Text } from '@chakra-ui/react';

export function UnregisteredLabel() {
  return (
    <Flex
      bg="red.500"
      w="fit-content"
      h="fit-content"
      py="0.15rem"
      px="0.5rem"
      borderRadius="2rem"
      mx="auto"
      right="0"
      left="0"
      justify="center"
      align="center"
      position="absolute"
      alignSelf="center"
      bottom="0.5rem"
      zIndex="1"
    >
      <Text fontSize="0.75rem">Unregistered</Text>
    </Flex>
  );
}
