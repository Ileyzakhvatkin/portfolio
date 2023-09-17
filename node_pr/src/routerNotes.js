const express = require('express');
const bodyParser = require('body-parser');
const { mwAuth } = require('./mwAuth');
const {
  getNotesList,
  getNoteById,
  createNote,
  editNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  deleteAllArchived,
  createPdfUrl
} = require('./bdNotes');


const router = express.Router();

router.get('/list', mwAuth(), async (req, res) => {
  if (!req.user) res.redirect('/');
  try {
    const data = await getNotesList(
      req.user.id,
      req.query.age ? req.query.age : '1month',
      req.query.search ? req.query.search : '',
      req.query.page ? req.query.page : 1
    );
    res.json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.get('/note/:id', mwAuth(), async (req, res) => {
  if (!req.user) res.redirect('/');
  const id = Number(req.params.id);
  try {
    const note = await getNoteById(id);
    res.json(note);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.post('/create', mwAuth(), bodyParser.urlencoded({ extended: false }), async (req, res) => {
  if (!req.user) res.redirect('/');
  const { title, text } = req.body;
  try {
    const note = await createNote(req.user.id, title, text);
    res.json(note);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/edit/:id', mwAuth(), bodyParser.urlencoded({ extended: false }), async (req, res) => {
  if (!req.user) res.redirect('/');
  const { title, text } = req.body;
  const id = Number(req.params.id);
  try {
    const nodeId = await editNote(id, title, text);
    res.json({_id: nodeId, status: 'edited'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/archive/:id', mwAuth(), async (req, res) => {
  if (!req.user) res.redirect('/');
  const id = Number(req.params.id);
  try {
    const nodeId = await archiveNote(id);
    res.json({_id: nodeId, status: 'archived'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/unarchive/:id', mwAuth(), async (req, res) => {
  if (!req.user) res.redirect('/');
  const id = Number(req.params.id);
  try {
    const nodeId = await unarchiveNote(id);
    res.json({_id: nodeId, status: 'unarchived'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/delete/:id', mwAuth(), async (req, res) => {
  if (!req.user) res.redirect('/');
  const id = Number(req.params.id);
  try {
    const nodeId = await deleteNote(id);
    res.json({_id: nodeId, status: 'deleted'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/deleteallarchived', mwAuth(), async (req, res) => {
  if (!req.user) res.redirect('/');
  try {
    await deleteAllArchived(req.user.id);
    res.json({status: 'allDeleted'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/create-pdf/:id', mwAuth(), async (req, res) => {
  if (!req.user) res.redirect('/');
  const id = Number(req.params.id);
  try {
    await createPdfUrl(id);
    res.json({ url: `./note-${id}.pdf` });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
