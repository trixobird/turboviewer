import React, { type JSX, Suspense } from 'react';
import { cookies } from 'next/headers';
import { TOKEN_KEY } from '@/env.mjs';
import { AvUrqProvider } from '@/app/[locale]/(logged-in)/urql-provider';
import InitialSetupSubscription from '@/app/[locale]/(logged-in)/initial-setup-subscription';
import Toaster from '@/app/[locale]/(logged-in)/toaster';

export default function LoggedInLayout({ children }: React.PropsWithChildren): JSX.Element {
  const token = cookies().get(TOKEN_KEY)?.value;
  return (
    <div>
      <AvUrqProvider token={token}>
        <InitialSetupSubscription />
        {children}
      </AvUrqProvider>
      <Suspense>
        <Toaster />
      </Suspense>
    </div>
  );
}
