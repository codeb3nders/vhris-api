const config = {
  dev: {
    port: parseInt(process.env.PORT, 10) || 4002,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    email: {
      domain: process.env.EMAIL_DOMAIN,
      host: process.env.EMAIL_SMTP,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      port: process.env.EMAIL_PORT,
    },
  },
  prod: {
    port: parseInt(process.env.PORT, 10) || 4002,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    email: {
      domain: process.env.EMAIL_DOMAIN,
      host: process.env.EMAIL_SMTP,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      port: process.env.EMAIL_PORT,
    },
  },
};

export default () => {
  const environment = process.env.NODE_ENV || 'development';
  return environment == 'development' ? config.dev : config.prod;
};
