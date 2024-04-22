import cloudinary from 'cloudinary';
import { envs } from './envs';

const cloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: envs.CLOUD_NAME,
    api_key: envs.CLOUD_API_KEY,
    api_secret: envs.CLOUD_API_SECRET,
    secure: envs.SECURE
  });
};

export default cloudinaryConfig;