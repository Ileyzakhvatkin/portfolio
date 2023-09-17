const { nanoid } = require('nanoid');
const crypto = require('crypto');
const { knex } = require('./knex');

/* Методы работа с базой данных USERS*/
const getAllUsers = async () => knex('users').select().then((results) => results);

const signupUser = async (username, password) => {
  if ((await findUserByUsername(username)) != undefined) {
    return;
  }
  const [ user ] = await knex('users')
    .insert({
      username,
      password: crypto.createHash('sha256').update(password).digest('hex'),
    })
    .returning('id');
  return user;
};

const findUserByUsername = async (username) =>
  knex('users')
    .select()
    .where({ username })
    .limit(1)
    .then((results) => results[0]);

const findUserBySessionId = async (sessionId) => {
  const session = await knex('sessions')
    .select('user_id')
    .where({ session_id: sessionId })
    .limit(1)
    .then((results) => results[0]);
  if (!session) {
    return;
  }
  return knex('users')
    .select()
    .where({ id: session.user_id })
    .limit(1)
    .then((results) => results[0]);
};

const createSession = async (userId) => {
  const sessionId = nanoid();
  await knex('sessions').insert({
    user_id: userId,
    session_id: sessionId,
  });
  return sessionId;
};

const deleteSession = async (sessionId) => {
  await knex('sessions').where({ session_id: sessionId }).delete();
};

module.exports.getAllUsers = getAllUsers;
module.exports.findUserByUsername = findUserByUsername;
module.exports.findUserBySessionId = findUserBySessionId;
module.exports.signupUser = signupUser;
module.exports.createSession = createSession;
module.exports.deleteSession = deleteSession;
