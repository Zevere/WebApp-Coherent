const $ = require('shelljs');
const fs = require('fs');
const path = require('path');
const {
  logStep,
  logInfo
} = require('../logging');

$.config.fatal = true
const rootDir = path.resolve(`${__dirname}/../..`)

logStep('Pre-Deploy: Staging')


logInfo('Read Docker settings')
if (!$.env['MY_DOCKER_SETTINGS']) {
  throw 'Environment variable "MY_DOCKER_SETTINGS" is not set.'
}
const dockerSettings = JSON.parse($.env['MY_DOCKER_SETTINGS'])
const dockerCertsDir = `${rootDir}/deploy/docker-certs`

logInfo(`Write Docker certificates to: ${dockerCertsDir}`)
if (!fs.existsSync(dockerCertsDir)) {
  $.mkdir(dockerCertsDir)
}
fs.writeFileSync(dockerCertsDir + "/ca.pem", dockerSettings.ca)
fs.writeFileSync(dockerCertsDir + "/cert.pem", dockerSettings.cert)
fs.writeFileSync(dockerCertsDir + "/key.pem", dockerSettings.key)

logInfo(`Write Docker Compose deployment settings`)
const configs = {
  docker: {
    host: dockerSettings.host,
    certsDir: dockerCertsDir
  }
}
fs.writeFileSync(`${rootDir}/deploy/docker-compose.config.json`, JSON.stringify(configs, undefined, 2))
