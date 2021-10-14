import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { TradeTable } from '../components/TradeTable';
import { TradeTableTypes } from '../components/TradeTableTypes';
import { getPrismicClient } from '../services/prismic';
import { CopyButton } from '../components/CopyButton';

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

interface SimpleTrade {
  title: string;
  description: string;
  pokemon: Pokemon[];
}

interface TypeTrade {
  title: string;
  description: string;
  pokemon: PokemonTypes;
}

interface HomeProps {
  giveaway: SimpleTrade;
  mirrorTrade: TypeTrade;
  forTrade: TypeTrade;
  lookingFor: TypeTrade;
}

export default function Home({
  giveaway,
  mirrorTrade,
  forTrade,
  lookingFor,
}: HomeProps) {
  function handleCopyFriendCode() {
    const friendCode = '2671 7145 2443';
    navigator.clipboard.writeText(friendCode);
  }

  return (
    <>
      <Flex direction="column" align="center" w="100vw" my="5rem">
        <Head>
          <title>My PoGo Trade</title>
        </Head>
        <Text as="h1">My PoGo Trade</Text>
        <Flex align="center">
          <Text textAlign="center" mr="1rem">
            2671 7145 2443 <br /> GnuViajante
          </Text>
          <CopyButton label="Copy FC" onClickFunction={handleCopyFriendCode} />
        </Flex>
        {!giveaway ? (
          <Spinner />
        ) : (
          <Stack>
            <TradeTable list={giveaway} />
            <TradeTableTypes list={mirrorTrade} />
            <TradeTableTypes list={forTrade} />
            <TradeTableTypes list={lookingFor} />
          </Stack>
        )}
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const giveawayResponse = await prismic.getByUID('trades', 'giveaway', {});
  const mirrorTradeResponse = await prismic.getByUID(
    'trades',
    'mirrortrade',
    {}
  );

  const forTradeResponse = await prismic.getByUID('trades', 'fortrade', {});

  const lookingForResponse = await prismic.getByUID('trades', 'lookingfor', {});

  const giveaway = {
    title: giveawayResponse.data.title,
    description: giveawayResponse.data.description,
    pokemon: giveawayResponse.data.pokemon.map((pkmn) => {
      return {
        name: pkmn.name,
        dex: pkmn.dex,
        src: `https://www.serebii.net/pokemongo/pokemon/${pkmn.dex}.png`,
        quantity: pkmn.quantity,
      };
    }),
  };

  const mirrorTradePokemon = mirrorTradeResponse.data.pokemon.map((pkmn) => {
    return {
      name: pkmn.name,
      dex: pkmn.dex,
      src: `https://www.serebii.net/pokemongo/pokemon/${pkmn.dex}.png`,
      quantity: pkmn.quantity,
      type: pkmn.type,
    };
  });

  const forTradePokemon = forTradeResponse.data.pokemon.map((pkmn) => {
    return {
      name: pkmn.name,
      dex: pkmn.dex,
      src: `https://www.serebii.net/pokemongo/pokemon/${
        pkmn.shiny ? 'shiny/' : ''
      }${pkmn.dex}.png`,
      quantity: pkmn.quantity,
      type: pkmn.type,
      shiny: pkmn.shiny,
    };
  });

  const lookingForPokemon = lookingForResponse.data.pokemon.map((pkmn) => {
    return {
      name: pkmn.name,
      dex: pkmn.dex,
      src: `https://www.serebii.net/pokemongo/pokemon/${pkmn.dex}.png`,
      quantity: pkmn.quantity,
      type: pkmn.type,
      unregistered: pkmn.unregistered,
    };
  });

  const mirrorTrade = {
    title: mirrorTradeResponse.data.title,
    description: mirrorTradeResponse.data.description,
    pokemon: {
      global: mirrorTradePokemon.filter((pkmn) => {
        return pkmn.type === 'global';
      }),
      regional: mirrorTradePokemon.filter((pkmn) => {
        return pkmn.type === 'regional';
      }),
      legendary: mirrorTradePokemon.filter((pkmn) => {
        return pkmn.type === 'legendary';
      }),
    },
  };

  const forTrade = {
    title: forTradeResponse.data.title,
    description: forTradeResponse.data.description,
    pokemon: {
      global: forTradePokemon.filter((pkmn) => {
        return pkmn.type === 'global';
      }),
      regional: forTradePokemon.filter((pkmn) => {
        return pkmn.type === 'regional';
      }),
      legendary: forTradePokemon.filter((pkmn) => {
        return pkmn.type === 'legendary';
      }),
    },
  };

  const lookingFor = {
    title: lookingForResponse.data.title,
    description: lookingForResponse.data.description,
    pokemon: {
      global: lookingForPokemon.filter((pkmn) => {
        return pkmn.type === 'global';
      }),
      regional: lookingForPokemon.filter((pkmn) => {
        return pkmn.type === 'regional';
      }),
      legendary: lookingForPokemon.filter((pkmn) => {
        return pkmn.type === 'legendary';
      }),
    },
  };

  return {
    props: {
      giveaway,
      mirrorTrade,
      forTrade,
      lookingFor,
    },
  };
};
