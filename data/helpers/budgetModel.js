const db = require("../dbConfig");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(query, id) {
  if (id) {
    return db("accounts")
      .where("id", id)
      .first();
  }

  let { limit = "ALL", sortby = "id", sortdir = "asc" } = query;
  let finalQuery = db("accounts")
    .orderBy(sortby, sortdir)
    .limit(limit);

  return finalQuery;
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
