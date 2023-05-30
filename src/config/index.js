
const {Config, source, env} = require('@monsantoit/config')
// @monsantoit/config module docs here: https://config.phoenix-tools-np.io/



const config = new Config({
    sources: [
        source.fromJS({src: `${__dirname}/files/${process.env.NODE_ENV || 'default'}.js`}),
        source.fromCloudFoundry()
    ],
    processors: [
    ],
    required: []
})

module.exports = config