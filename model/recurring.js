const { Model } = require('objection');

class Recurring extends Model {
    static get tableName() {
        return 'recurring';
    }
}

module.exports = Recurring;