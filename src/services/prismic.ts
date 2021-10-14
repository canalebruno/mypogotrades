import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

const apiEndpoint = 'https://mypogotrade.prismic.io/api/v2';

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(apiEndpoint, {
    req,
  });

  return prismic;
}