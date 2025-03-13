import PocketBase from 'pocketbase';
import config from './config.json';

const pb = new PocketBase(config.pocketbase.url);

export const logout = async () => {
  await pb.authStore.clear();
};

export default pb;
