require('dotenv').config();

const express = require('express');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const { mwAuth } = require('./src/mwAuth');
const { getNoteById } = require('./src/bdNotes');
const showdown  = require('showdown');

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use('/', require('./src/routerAuth'));
app.use('/apinotes', require('./src/routerNotes'));

app.get("/", mwAuth(), (req, res) => {
  // Инемменно через обработкуошибки или _http_outgoing.js:561 throw new ERR_HTTP_HEADERS_SENT('set');
  try {
    res.render('index', {
      user: req.user,
      authError: req.query.authError === 'true' ? 'Неверный логин или пароль' : req.query.authError,
      enterError: req.query.enterError === 'true' ? 'Не удалось зарегистрировать войти. Возможно вы указали слишком длинный логин.' : req.query.enterError,
      createError: req.query.createError === 'true' ? 'Не удалось зарегистрировать пользователя и войти. Возможно вы указали слишком длинный логин.' : req.query.createError,
    });
  } catch (error) {
    return res.redirect('./');
  }

});

app.get('/dashboard', mwAuth(), (req, res) => {
  // Инемменно через обработкуошибки или _http_outgoing.js:561 throw new ERR_HTTP_HEADERS_SENT('set');
  try {
    res.render('dashboard', { username: req.user.username });
  } catch (error) {
    return res.redirect('./');
  }
});

app.get('/page-pdf/:id', async (req, res) => {
  try {
    const converter = new showdown.Converter();
    const { title, html } = await getNoteById(Number(req.params.id));
    res.render('pdf', { title, html: converter.makeHtml(html) });
  } catch (error) {
    return res.status(error.status || 500);
  }
});

app.get('*', mwAuth(), (req, res) => {
  try {
    req.user ? res.redirect('/dashboard') : res.render('page-404');
  } catch (error) {
    return res.redirect('./');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
