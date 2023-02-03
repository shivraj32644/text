import { useGetProfile } from '../../../../../shared/api/src/index';

/** throws error if no profile, to be used inside authenticated screens only */
export function useAuth() {
  const { data: profile, refetch } = useGetProfile();

  if (!profile) {
    throw new Error('User is not logged in!');
  }

  return { profile, refetch };
}
