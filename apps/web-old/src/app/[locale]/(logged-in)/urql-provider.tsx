'use client';

import { type JSX, useMemo } from 'react';
import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
  subscriptionExchange,
  UrqlProvider,
} from '@urql/next';
import { createClient as createSSEClient } from 'graphql-sse';
import { env } from '@/env.mjs';
import { makeAuthExchange } from '@/lib/urql/urql-auth';

export function AvUrqProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}): JSX.Element {
  const wsClient = createSSEClient({
    url: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const urql = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    });
    const client = createClient({
      url: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      exchanges: [
        cacheExchange,
        makeAuthExchange(token),
        ssr,
        fetchExchange,
        subscriptionExchange({
          forwardSubscription(request) {
            const operation = { ...request, query: request.query ?? '' };
            return {
              subscribe(sink) {
                const unsubscribe = wsClient.subscribe(operation, sink);
                return { unsubscribe };
              },
            };
          },
        }),
      ],
      suspense: true,
    });

    return { client, ssr };
  }, [token, wsClient]);

  return (
    <UrqlProvider client={urql.client} ssr={urql.ssr}>
      {children}
    </UrqlProvider>
  );
}
