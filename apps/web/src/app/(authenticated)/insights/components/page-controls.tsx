'use client';

import { Button, Flex } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { addOrReplaceURLParams, pageKey } from '@/util/url-query-utils';

interface PropsType {
  hasNextPage: boolean;
}

export default function PageControls(props: PropsType): React.ReactNode {
  const t = useTranslations('insights');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (type: 'next' | 'prev'): void => {
    if (type === 'next') {
      const nextPage = String(Number(searchParams.get(pageKey) ?? '1') + 1);
      router.replace(addOrReplaceURLParams(pathname, searchParams, pageKey, nextPage));
      return;
    }
    const prevPage = String(Number(searchParams.get(pageKey) ?? '1') - 1);
    router.replace(addOrReplaceURLParams(pathname, searchParams, pageKey, prevPage));
  };

  return (
    <Flex justify="space-between" my="lg" gap="sm">
      <Button
        disabled={!searchParams.get(pageKey) || searchParams.get(pageKey) === '1'}
        leftSection={<IconArrowLeft size={14} />}
        variant="default"
        onClick={() => {
          handlePageChange('prev');
        }}
      >
        {t('prevPage')}
      </Button>
      <Button
        disabled={!props.hasNextPage}
        rightSection={<IconArrowRight size={14} />}
        variant="default"
        onClick={() => {
          handlePageChange('next');
        }}
      >
        {t('nextPage')}
      </Button>
    </Flex>
  );
}
