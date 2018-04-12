const $ = require('shelljs');
const fs = require('fs');
const path = require('path');
const {
    logInfo,
    logWarn
} = require('./logging');

$.config.fatal = true
const rootDir = path.resolve(`${__dirname}/..`)


function tryLoadConfigs() {
    logInfo('Load deployment configurations')
    const configsFile = `${rootDir}/deploy/docker-compose.config.json`
    if (!fs.existsSync(configsFile)) {
        logWarn(`Deployment configurations not found`)
        return
    }
    const configs = JSON.parse(fs.readFileSync(configsFile))

    $.env['DOCKER_HOST'] = configs.docker.host
    $.env['DOCKER_CERT_PATH'] = configs.docker.certsDir
    $.env['DOCKER_TLS_VERIFY'] = 1
}


function checkDockerConnection() {
    logInfo('Check Docker connection')
    $.exec(`docker version --format '{{.Server.Version}}'`)

    logInfo('Check Docker Compose installation')
    $.exec('docker-compose version')
}


function publishDockerContainer() {

    function removeContainers() {
        logInfo('Remove Docker compose containers')
        $.cd(`${rootDir}/deploy`)
        $.exec(`docker-compose rm -f`)
    }

    removeContainers()

    logInfo('Build Docker compose containers')
    $.cp(`${rootDir}/deploy/Coherent.Dockerfile`, `${rootDir}/deploy/dist/`)
    $.exec('docker-compose build --force-rm --no-cache')


    logInfo('Start Docker compose containers')
    $.exec('docker-compose up')

    removeContainers()
}


tryLoadConfigs()
checkDockerConnection()
publishDockerContainer()
