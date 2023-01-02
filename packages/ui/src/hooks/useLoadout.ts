import { useAppSelector } from './store';
import { FetchState, usePost } from './useFetch';

interface SaveLoadoutResponse {
  uuid: string;
}

export type useLoadoutHook = () => [
  FetchState<SaveLoadoutResponse>,
  () => Promise<void>
];

export const useLoadout: useLoadoutHook = () => {
  const [state, makeRequest] = usePost();
  const { loadout } = useAppSelector((state) => state);

  const saveLoadout = async () => {
    const body = {
      primaryWeapon: {
        uuid: loadout.primary?.uuid,
        attachments: loadout.primary?.attachments // TO DO: REWORK STRUCUTRE HERE
      },
      secondaryWeapon: {
        uuid: loadout.secondary?.uuid,
        attachments: loadout.secondary?.attachments
      }
    };

    makeRequest('http://localhost:4001/equipment/v1/loadouts', body);
  };

  return [state, saveLoadout];
};
