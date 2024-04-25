import { CalendarDays, Eye } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import type { UnwrapArray } from '@/util/types';
import type { AdAccountsQuery, InsightsQuery } from '@/graphql/generated/schema-server';
import Spend from '@/app/[locale]/(logged-in)/insights/spend';
import Device from '@/app/[locale]/(logged-in)/insights/device';
import Publisher from '@/app/[locale]/(logged-in)/insights/publisher';
import Position from '@/app/[locale]/(logged-in)/insights/position';
import AdId from '@/app/[locale]/(logged-in)/insights/ad-id';

export default function Insight({
  spend,
  date,
  device,
  position,
  publisher,
  impressions,
  account,
  adId,
}: UnwrapArray<InsightsQuery['insights']['edges']> & {
  account: UnwrapArray<UnwrapArray<AdAccountsQuery['integrations']>['adAccounts']>;
}): React.ReactElement | null {
  const format = useFormatter();
  const t = useTranslations('Insights');
  return (
    <div className="flex flex-col rounded-[12px] border border-gray-600">
      <div className="flex grow gap-2 border-b border-gray-400 p-6">iFrame Placeholder</div>
      <div className="flex flex-row">
        <Spend spend={spend} currency={account.currency} />
        <Eye />
        <div>{impressions}</div>
        {date ? (
          <div className="flex flex-row">
            <CalendarDays />
            <div>{format.dateTime(new Date(date), { month: 'numeric', day: 'numeric' })}</div>
          </div>
        ) : null}
        <Device device={device} />
        <Publisher publisher={publisher} />
      </div>
      <AdId adId={adId} />
      <Position position={position} tooltipPosition={t('tooltipPosition')} />
    </div>
  );
}
