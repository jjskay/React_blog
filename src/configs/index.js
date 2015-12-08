import userConfig from './development.json';

var baseConfig = {
    userProfileExpire: 20
};

var config = Object.assign(baseConfig, userConfig);

export default config;