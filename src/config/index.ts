type IConfig = {
  env: string;
  jwt: {
    secret: string;
  };
};

const config: IConfig = {
  env: 'development',
  jwt: {
    secret: 'thisisasamplesecret',
  },
};

export { IConfig, config };
