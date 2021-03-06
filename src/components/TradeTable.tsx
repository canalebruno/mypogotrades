import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { CopyButton } from './CopyButton';
import { PokemonBox } from './PokemonBox';
import { createBreakpoints } from '@chakra-ui/theme-tools';

interface Pokemon {
  name: string;
  dex: string;
  src: string;
  quantity: string;
  type?: string;
}

interface PokemonTypes {
  global: Pokemon[];
  regional: Pokemon[];
  legendary: Pokemon[];
}

interface Trade {
  title: string;
  description: string;
  pokemon: Pokemon[];
}

interface TradeTableProps {
  list: Trade;
}

export function TradeTable({ list }: TradeTableProps) {
  const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  });

  function handleConvertToText(list: Trade) {
    const copyList = list.pokemon.map((pkmn) => {
      return `${pkmn.quantity}x ${pkmn.name}`;
    });

    navigator.clipboard.writeText(`${list.title}: ${copyList.join(', ')}`);
  }

  return (
    <AccordionItem>
      <Flex direction="column" py="2.5rem" align="center">
        <Flex align="center">
          <Text as="h2" mr="1rem">
            {list.title}
          </Text>
          <CopyButton
            label="Copy List"
            onClickFunction={(e) => handleConvertToText(list)}
          />
        </Flex>
        <AccordionButton>
          <Text>{list.description}</Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <SimpleGrid
            templateColumns={['repeat(3,1fr)', null, null, 'repeat(6,1fr)']}
            gridGap="1rem"
            mt="2rem"
          >
            {list.pokemon.map((pkmn) => {
              return <PokemonBox key={pkmn.dex} pokemon={pkmn} />;
            })}
          </SimpleGrid>
        </AccordionPanel>
      </Flex>
    </AccordionItem>
  );
}
