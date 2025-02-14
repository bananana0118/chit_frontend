'use client';

import { useParams } from 'next/navigation';

const useParamsParser = () => {
  const params = useParams();
  const getParams = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    channelId: getParams('channelId'),
    sessionCode: getParams('sessionCode'),
    getParams,
  };
};

export default useParamsParser;
