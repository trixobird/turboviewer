import Image from 'next/image';
import { SimpleGrid } from '@mantine/core';
import { type ReactNode } from 'react';
import metaLogo from '@/assets/images/meta-logo.png';
import tiktokLogo from '@/assets/images/tiktok-logo.png';
import linkedinLogo from '@/assets/images/linkedin-logo.png';
import { IntegrationStatus, IntegrationType, type SettingsChannelsQuery } from '@/graphql/generated/schema-server';
import IntegrationCard from './integration-card';

interface IntegrationProps {
  integrations: SettingsChannelsQuery['settingsChannels'];
}

export default function IntegrationsGrid(props: IntegrationProps): ReactNode {
  // (backend response needs refactor to return object with IntegrationType as key)
  const isIntegrationAvailable = (status: IntegrationStatus): boolean => {
    if (status !== IntegrationStatus.ComingSoon) {
      return true;
    }
    return false;
  };

  const isIntegrationConnected = (status: IntegrationStatus): boolean => {
    if (status === IntegrationStatus.Connected) {
      return true;
    }
    return false;
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
      <IntegrationCard
        title="Meta"
        description="Connect your Meta account and view analytics for your ad campaigns on every Meta Platforms application!"
        integrationType={IntegrationType.META}
        isConnected={isIntegrationConnected(props.integrations[0].status)}
        isAvailable={isIntegrationAvailable(props.integrations[0].status)}
        image={<Image src={metaLogo} alt="Meta" width={300} priority />}
      />
      <IntegrationCard
        title="TikTok"
        description="Connect your TikTok account and manage all your TikTok advertisments!"
        integrationType={IntegrationType.TIKTOK}
        isConnected={isIntegrationConnected(props.integrations[1].status)}
        isAvailable={isIntegrationAvailable(props.integrations[1].status)}
        image={<Image src={tiktokLogo} alt="TikTok" width={300} priority />}
      />
      <IntegrationCard
        title="LinkedIn"
        description="Connect your LinkedIn account and manage all your LinkedIn advertisments!"
        integrationType={IntegrationType.LINKEDIN}
        isConnected={isIntegrationConnected(props.integrations[2].status)}
        isAvailable={isIntegrationAvailable(props.integrations[2].status)}
        image={<Image src={linkedinLogo} alt="LinkedIn" width={300} priority />}
      />
    </SimpleGrid>
  );
}