const { knex } = require('./knex');
const puppeteer = require('puppeteer');
const { calcPeriodMounth } = require('./utility');

const getNotesList = async (user_id, age, search, page) => {
  page = Number(page);
  let notes = {};
  const limit = 3;
  let hasMore = false;

  const calcNodesMore = (data) => {
    Object.keys(data).length > (page * limit) ? hasMore = true : hasMore = false;
    notes = data.slice(page * limit - limit, page * limit);
  }

  if (search !== '') {
    notes = await knex('notes')
      .where({ user_id, isActive: true })
      .whereRaw(`LOWER(title) LIKE ?`, [`%${search}%`])
      .orderBy('created')
      .select();
    calcNodesMore(notes);
  } else {
    switch (age) {
      case '1month':
        notes = await knex('notes')
          .where({ user_id, isActive: true, isArchived: false })
          .where('created', '>', calcPeriodMounth(1))
          .orderBy('created').select();
        calcNodesMore(notes);
        break;
      case '3months':
        notes = await knex('notes')
          .where({ user_id, isActive: true, isArchived: false})
          .where('created', '>', calcPeriodMounth(3))
          .orderBy('created').select();
        calcNodesMore(notes);
        break;
      case 'alltime':
        notes = await knex('notes')
          .where({ user_id, isActive: true, isArchived: false })
          .orderBy('created').select();
        calcNodesMore(notes);
        break;
      case 'archive':
        notes = await knex('notes')
          .where({ user_id, isActive: true, isArchived: true })
          .orderBy('created').select();
        calcNodesMore(notes);
        break;
    }
  }

  return { notes, hasMore };
}

const getNoteById = async (_id) =>
  knex('notes')
    .select()
    .where({ _id })
    .limit(1)
    .then((results) => results[0]);

const createNote = async (user_id, title, text) => {
  const [ nodeId ] = await knex('notes')
    .insert({ user_id, isActive: true, isArchived: false, title, html: text })
    .returning('_id');
  return getNoteById(nodeId._id);
}

const editNote = async (_id, title, text) =>
  await knex('notes').where({ _id }).update({ title, html: text }).returning('_id');

const archiveNote = async (_id) =>
  await knex('notes').where({ _id }).update({ isArchived: true }).returning('_id');

const unarchiveNote = async (_id) =>
  await knex('notes').where({ _id }).update({ isArchived: false }).returning('_id');

const deleteNote = async (_id) =>
  await knex('notes').where({ _id }).update({ isActive: false }).returning('_id');

const deleteAllArchived = async (user_id) =>
  await knex('notes').where({ user_id, isArchived: true }).update({ isActive: false });

const createPdfUrl = async (_id) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disabled-setupid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/page-pdf/${_id}`);
  await page.setViewport({ width: 2480, height: 3508 });
  await page.waitForSelector('#main');
  await page.pdf({ path: `./public/note-${_id}.pdf` });
  await browser.close();
};

module.exports.getNotesList = getNotesList;
module.exports.getNoteById = getNoteById;
module.exports.createNote = createNote;
module.exports.editNote = editNote;
module.exports.archiveNote = archiveNote;
module.exports.unarchiveNote = unarchiveNote;
module.exports.deleteNote = deleteNote;
module.exports.deleteAllArchived = deleteAllArchived;
module.exports.createPdfUrl = createPdfUrl;
