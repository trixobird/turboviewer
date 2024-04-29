import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';
import { Fallback } from '@repo/ui/fallback';
import * as changeCase from 'change-case';
import { DeviceEnum, InsightsColumnsGroupBy, PublisherEnum } from '@/graphql/generated/schema-server';
import AccountId from '@/app/[locale]/(logged-in)/insights/account-id';
import { GroupedByCheckbox } from '@/components/filters/grouped-checkbox';
import MultiFilter from '@/components/filters/multi-filter';

export default function Filters(): React.ReactElement {
  const t = useTranslations('filters');
  const positions = [
    'facebook_reels',
    'instagram_explore_grid_home',
    'marketplace',
    'instagram_reels',
    'feed',
    'facebook_reels_overlay',
    'instagram_explore',
    'video_feeds',
    'instagram_stories',
  ].map((pos) => ({ value: pos, label: changeCase.noCase(pos) }));

  return (
    <div>
      <h3>{t('title')}</h3>
      <Suspense fallback={<Fallback height={48} />}>
        <AccountId />
      </Suspense>
      <MultiFilter options={positions} groupKey="position" />
      <MultiFilter options={Object.values(DeviceEnum)} groupKey="device" />
      <MultiFilter options={Object.values(PublisherEnum)} groupKey="publisher" />
      <h4>{t('groupedBy')}</h4>
      <GroupedByCheckbox label={t('account')} id="adAccountId" groupByColumn={InsightsColumnsGroupBy.adAccountId} />
      <GroupedByCheckbox label={t('adId')} id="groupBy.adId" groupByColumn={InsightsColumnsGroupBy.adId} />
      <GroupedByCheckbox label={t('device')} id="groupBy.device" groupByColumn={InsightsColumnsGroupBy.device} />
      <GroupedByCheckbox label={t('date')} id="groupBy.date" groupByColumn={InsightsColumnsGroupBy.date} />
      <GroupedByCheckbox
        label={t('publisher')}
        id="groupBy.publisher"
        groupByColumn={InsightsColumnsGroupBy.publisher}
      />
      <GroupedByCheckbox label={t('position')} id="groupBy.position" groupByColumn={InsightsColumnsGroupBy.position} />
    </div>
  );
}
