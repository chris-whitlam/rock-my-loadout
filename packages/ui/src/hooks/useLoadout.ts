import { useAppSelector } from './store';
import { FetchState, usePost } from './useFetch';

interface SaveLoadoutResponse {
  uuid: string;
}

export type useLoadoutHook = () => [
  FetchState<SaveLoadoutResponse>,
  () => Promise<void>
];

const constructAttachments = (attachments: any) => {
  return Object.values(attachments).map((attachment: any) => ({
    uuid: attachment.uuid,
    tuning: attachment.tuning
  }));
};

export const useLoadout: useLoadoutHook = () => {
  const [state, makeRequest] = usePost();
  const { loadout } = useAppSelector((state) => state);

  const saveLoadout = async () => {
    const body = {
      primaryWeapon: {
        uuid: loadout.primary?.uuid,
        attachments: constructAttachments(loadout.primary?.attachments)
      },
      secondaryWeapon: {
        uuid: loadout.secondary?.uuid,
        attachments: constructAttachments(loadout.secondary?.attachments)
      }
    };

    makeRequest('http://localhost:4001/api/v1/loadouts', body);
  };

  return [state, saveLoadout];
};
