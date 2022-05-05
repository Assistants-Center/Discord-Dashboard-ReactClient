const exec = require('await-exec');

class DiscordDashboardReactClient {
    constructor(settings) {
        this.buildSettings = settings;
    }

    startDev = async () => {
        const buildSettings = this.buildSettings;
        delete buildSettings.OAuth2Client.secret;
        delete buildSettings.OAuth2Client.token;
        delete buildSettings.OAuth2Client.mongoUrl;
        const thisBuild = {
            settings: buildSettings,
            version: require('./package.json').version,
        };
        require('fs').writeFileSync(`${__dirname}/src/buildSettings.json`, JSON.stringify(thisBuild), 'utf-8');
        await exec(`cd ${__dirname} & npx react-scripts start`);
    }

    build = async () => {
        const buildSettings = this.buildSettings
        buildSettings.serverUrl ? void(0) : buildSettings.serverUrl = 'http://localhost';
        const lastBuild = require('fs').readFileSync(`${__dirname}/src/buildSettings.json`, 'utf-8');
        const thisBuild = {
            settings: buildSettings,
            version: require('./package.json').version,
        };
        if(lastBuild !== JSON.stringify(thisBuild)){
            console.log('New version, settings or first build detected. Please wait for Discord-Dashboard-ReactNative Client to build website. This may take a while...');
            require('fs').writeFileSync(`${__dirname}/src/buildSettings.json`, JSON.stringify(thisBuild), 'utf-8');
            await exec(`cd ${__dirname} & npx react-scripts build`);
            console.log('Discord-Dashboard-ReactClient is finished now. Access buildPath files via <Discord-Dashboard-ReactClient>.buildPath');
        }

        return true;
    }

    buildPath = `${__dirname}/build`;

    getSettings = () => this.buildSettings;
}

module.exports = DiscordDashboardReactClient;
