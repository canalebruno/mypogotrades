import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CopyButton } from './CopyButton';
import { PokemonBox } from './PokemonBox';

interface Pokemon {
  name: string;
  dex: string;
  src: string;
  quantity: string;
  type?: string;
  unregistered?: boolean;
  shiny?: boolean;
}

interface PokemonTypes {
  global?: Pokemon[];
  regional?: Pokemon[];
  legendary?: Pokemon[];
}

interface Trade {
  title: string;
  description: string;
  pokemon: PokemonTypes;
}

interface TradeTableProps {
  list: Trade;
}

export function TradeTableTypes({ list }: TradeTableProps) {
  function handleConvertToText(list: Trade) {
    if (list.pokemon.global.length > 0) {
      var copyGlobalList = list.pokemon.global.map((pkmn) => {
        return (
          (pkmn.quantity !== null ? `${pkmn.quantity}x ` : '') + `${pkmn.name}`
        );
      });
    }

    if (list.pokemon.regional.length > 0) {
      var copyRegionalList = list.pokemon.regional.map((pkmn) => {
        return (
          (pkmn.quantity !== null ? `${pkmn.quantity}x ` : '') + `${pkmn.name}`
        );
      });
    }

    if (list.pokemon.legendary.length > 0) {
      var copyLegendaryList = list.pokemon.legendary.map((pkmn) => {
        return (
          (pkmn.quantity !== null ? `${pkmn.quantity}x ` : '') + `${pkmn.name}`
        );
      });
    }

    const copyFullList = `${list.title}\n\n${
      copyGlobalList ? `Global: ${copyGlobalList.join(', ')}\n\n` : ''
    }${copyRegionalList ? `Regional: ${copyRegionalList.join(', ')}\n\n` : ''}${
      copyLegendaryList ? `Legendary: ${copyLegendaryList.join(', ')}\n\n` : ''
    }`;

    navigator.clipboard.writeText(copyFullList);
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
          <Stack spacing="2rem">
            {list.pokemon.global.length > 0 && (
              <Stack>
                <Text mt="2rem" flex="1" borderBottom="1px solid">
                  Globals
                </Text>
                <SimpleGrid
                  templateColumns="repeat(6,1fr)"
                  gridGap="1rem"
                  mt="2rem"
                >
                  {list.pokemon.global.map((pkmn) => {
                    return <PokemonBox key={pkmn.dex} pokemon={pkmn} />;
                  })}
                </SimpleGrid>
              </Stack>
            )}
            {list.pokemon.regional.length > 0 && (
              <Stack>
                <Text mt="2rem" flex="1" borderBottom="1px solid">
                  Regionals
                </Text>
                <SimpleGrid
                  templateColumns="repeat(6,1fr)"
                  gridGap="1rem"
                  mt="2rem"
                >
                  {list.pokemon.regional.map((pkmn) => {
                    return <PokemonBox key={pkmn.dex} pokemon={pkmn} />;
                  })}
                </SimpleGrid>
              </Stack>
            )}
            {list.pokemon.legendary.length > 0 && (
              <Stack>
                <Text mt="2rem" flex="1" borderBottom="1px solid">
                  Legendaries
                </Text>
                <SimpleGrid
                  templateColumns="repeat(6,1fr)"
                  gridGap="1rem"
                  mt="2rem"
                >
                  {list.pokemon.legendary.map((pkmn) => {
                    return <PokemonBox key={pkmn.dex} pokemon={pkmn} />;
                  })}
                </SimpleGrid>
              </Stack>
            )}
          </Stack>
        </AccordionPanel>
      </Flex>
    </AccordionItem>
  );
}
