import { Suspense } from 'react';
import { UserProfileWindow } from '@/widgets/user-profile-window';

export default function Profile() {
  return (
    <Suspense>
      <UserProfileWindow />
    </Suspense>
  );
}
