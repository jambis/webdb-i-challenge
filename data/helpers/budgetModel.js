const db = require("../dbConfig");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  let query = db("accounts");

  if (id) {
    return query.where("id", id).first();
  }

  return query;
}

function insert(budget) {
  return db("accounts")
    .insert(budget, "id")
    .then(([id]) => this.get(id));
}

function update(id, changes) {
  return db("accounts")
    .where("id", id)
    .update(changes)
    .then(count => (count ? this.get(id) : null));
}

function remove(id) {
  return db("accounts")
    .where("id", id)
    .del();
}
