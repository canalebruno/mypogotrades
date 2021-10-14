import { Flex, Img, Text } from '@chakra-ui/react';
import { QuantityBalloon } from './QuantityBalloon';
import { ShinyLabel } from './ShinyLabel';
import { UnregisteredLabel } from './UnregisteredLabel';

interface PokemonBoxProps {
  pokemon: {
    name: string;
    dex: string;
    src: string;
    quantity: string;
    unregistered?: boolean;
    shiny?: boolean;
  };
}

export function PokemonBox({ pokemon }: PokemonBoxProps) {
  const { name, src, quantity, unregistered, shiny } = pokemon;

  return (
    <Flex direction="column" w="7rem" align="center">
      <Flex
        bg="gray.700"
        w="7rem"
        h="7rem"
        borderRadius="1rem"
        p="0.75rem"
        _hover={{ bg: 'gray.600' }}
        position="relative"
      >
        {unregistered && <UnregisteredLabel />}
        {quantity !== null && <QuantityBalloon quantity={quantity} />}
        {shiny && <ShinyLabel />}
        <Img
          src={src}
          alt={name}
          filter={unregistered && 'grayscale(100%) opacity(50%)'}
        />
      </Flex>
      <Text flex="1" textAlign="center" mt="0.5rem">
        {name}
      </Text>
    </Flex>
  );
}
