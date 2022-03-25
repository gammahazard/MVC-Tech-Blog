
// path directory for utilities on directory paths and files, express/express session for connection, handlebars for styling, controllers for routing purposes
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// sequelize for db connection, importing helpers and connection info
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
// define ports and express
const app = express();
const PORT = process.env.PORT || 3001;
// define session to store sequelize info
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// start express
app.use(session(sess));

const hbs = exphbs.create({ helpers });
// enable handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// enable routing for api
app.use(routes);
// confirmation of successful connection
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is running @ http://localhost:${PORT}`));
});
