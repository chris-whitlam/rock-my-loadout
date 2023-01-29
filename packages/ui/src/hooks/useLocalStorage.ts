import { useCallback } from 'react';

const LOCAL_STORAGE_NAMESPACE = 'rml';

export const useLocalStorage = () => {
  const saveItem = useCallback(
    (name: string, data: any) => {
      let parsedData = data;
      if (typeof parsedData === 'object') {
        parsedData = JSON.stringify(parsedData);
      }
      console.log({
        name: `${LOCAL_STORAGE_NAMESPACE}/${name}`,
        data: parsedData
      });

      localStorage.setItem(`${LOCAL_STORAGE_NAMESPACE}/${name}`, parsedData);
    },
    [localStorage]
  );

  const getItem = useCallback((name: string) => {
    const data = localStorage.getItem(`${LOCAL_STORAGE_NAMESPACE}/${name}`);

    if (!data) return data;

    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }, []);

  const deleteItem = useCallback((name: string) => {
    localStorage.removeItem(`${LOCAL_STORAGE_NAMESPACE}/${name}`);
  }, []);

  return { saveItem, getItem, deleteItem };
};
