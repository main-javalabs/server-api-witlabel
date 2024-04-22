import 'dotenv/config';
import { get } from 'env-var';
import cloudinary from 'cloudinary';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),
  NODE_ENV: get('NODE_ENV').default('development').asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  CLIENT_URL: get('CLIENT_URL').required().asString().replace(/\/$/, ""),
  SECRET_KEY_ONE: get('SECRET_KEY_ONE').required().asString(),
  SECRET_KEY_TWO: get('SECRET_KEY_TWO').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
  CLOUD_NAME: get('CLOUD_NAME').required().asString(),
  CLOUD_API_KEY: get('CLOUD_API_KEY').required().asString(),
  CLOUD_API_SECRET: get('CLOUD_API_SECRET').required().asString(),
  SECURE: get('SECURE').default('true').asBool(),
  

  
};


