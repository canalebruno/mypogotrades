import { Flex, Img, Text } from '@chakra-ui/react';
import { QuantityBalloon } from './QuantityBalloon';
import { ShinyLabel } from './ShinyLabel';
import { UnregisteredLabel } from './UnregisteredLabel';

import { createBreakpoints } from '@chakra-ui/theme-tools';

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
  const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  });

  const { name, src, quantity, unregistered, shiny } = pokemon;

  return (
    <Flex direction="column" w={['5rem', '6rem', null, '7rem']} align="center">
      <Flex
        bg="gray.700"
        maxW="7rem"
        maxH="7rem"
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
