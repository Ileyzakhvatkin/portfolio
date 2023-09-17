const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { mwAuth } = require('./mwAuth');
const { findUserByUsername, signupUser, createSession, deleteSession } = require('./bdAuth');
const { createNote } = require('./bdNotes');

const router = express.Router();

router.post('/login', bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user || user.password !== crypto.createHash('sha256').update(password).digest('hex')) {
      return res.redirect('./?authError=true');
    }
    const sessionId = await createSession(user.id);
    res.cookie('sessionId', sessionId, { httpOnly: true }).redirect('/dashboard');
  } catch (error) {
    return res.redirect('./?createError=true');
  }
});

router.post('/signup', bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await signupUser(username, password);
    if (user) {
      const sessionId = await createSession(user.id);
      await createNote(user.id, 'Демонстрационная заметка', 'Текст демонстрационной заметки');
      res.cookie('sessionId', sessionId, { httpOnly: true }).redirect('/dashboard');
    } else {
      return res.redirect('./?authError=true');
    }
  } catch (error) {
    return res.redirect('./?createError=true');
  }
});

router.get('/logout', mwAuth(), async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  await deleteSession(req.sessionId);
  res.clearCookie("sessionId").redirect("/");
});

module.exports = router;
