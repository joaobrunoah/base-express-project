const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../database/knexfile');

// Initialize knex.
const knexObj = Knex(knexConfig);

// Give the knex instance to objection.
Model.knex(knexObj);

class ExampleModel extends Model {

  static get tableName() {
    return 'roles';
  }

  static get idColumn() {
    return 'id_role';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["role"],
      properties: {
        id_role: { type: "string" },
        role: { type: "string" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      }
    }
  }
}

module.exports = ExampleModel;
