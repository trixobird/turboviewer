import { CalendarDays, Eye } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { IFrame } from '@repo/ui/iframe';
import type { UnwrapArray } from '@/util/types';
import { type InsightsQuery } from '@/graphql/generated/schema-server';
import Spend from '@/app/[locale]/(logged-in)/insights/spend';
import Device from '@/app/[locale]/(logged-in)/insights/device';
import Publisher from '@/app/[locale]/(logged-in)/insights/publisher';
import Position from '@/app/[locale]/(logged-in)/insights/position';
import AdName from '@/app/[locale]/(logged-in)/insights/ad-name';

export default function Insight({
  datapoints,
  device,
  position,
  publisher,
  adName,
  currency,
  iFrame,
}: UnwrapArray<InsightsQuery['insights']['edges']>): React.ReactElement | null {
  const format = useFormatter();
  const t = useTranslations('insights');
  return (
    <div className="flex flex-col rounded-[12px] border border-gray-600">
      <div className="flex grow gap-2 border-b border-gray-400 p-6">{iFrame ? <IFrame {...iFrame} /> : null}</div>
      <div className="flex flex-col">
        {datapoints.map((datapoint) => {
          const { spend, impressions, date } = datapoint;
          return (
            <div key={`${String(spend)}-${String(impressions)}-${String(date)}`}>
              <div className="flex flex-row">
                <Spend spend={spend} currency={currency} />
                <Eye />
                <div>{format.number(impressions, { style: 'decimal' })}</div>
                <CalendarDays />
                <div>{format.dateTime(new Date(date), { month: 'numeric', day: 'numeric' })}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        <Device device={device} />
        <Publisher publisher={publisher} />
        <AdName adName={adName} />
        <Position position={position} tooltipPosition={t('tooltipPosition')} />
      </div>
    </div>
  );
}
