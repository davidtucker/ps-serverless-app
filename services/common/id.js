import KSUID from 'ksuid';

export const generateID = () => {
  return KSUID.randomSync().string;
};
