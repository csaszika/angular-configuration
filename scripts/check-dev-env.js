const exec = require('child_process').exec;

const nodeVersion = getVersionOf('nodeVersion');
const npmVersion = getVersionOf('npmVersion');

const relevantProcessVersion = getMajorAndMinorVersionOfNode();

if (!relevantProcessVersion.endsWith(`v${nodeVersion}`)) {

    throw new Error(`Install node version v${nodeVersion}! Your version is: ${relevantProcessVersion}`);
}

exec('npm --version', (error, stdin) => {
    if (error) {
        console.error(error);
        return;
    }

    if (!stdin.toString().trim().endsWith(npmVersion)) {
        throw new Error(`Install npm version ${npmVersion}! Your version is: ${stdin}`);
    }
});

exec('npm config get registry', (error, stdin) => {
    if (error) {
        console.error(error);
        return;
    }

    // if (!stdin.toString().trim().startsWith('your.artifactory')) {
    //     throw new Error('Use your artifactory!');
    // }
});

function getVersionOf(entity) {
    const versionPlace = 1;
    return process.argv
        .find(param => param.startsWith(entity))
        .split('=')[versionPlace];
}

function getMajorAndMinorVersionOfNode() {
    return process.version.split('.').slice(0, 2).join('.');
}

