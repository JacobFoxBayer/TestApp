const moment = require('moment')

module.exports = {
    Query: {
        getData() {
            return {
                result: 'success',
                now: moment().format()
            }
        }
    }
}