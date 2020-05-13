require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const keys = require('../config/keys');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
	console.log('Connected to Mongo instance');
});
mongoose.connection.on('error', (err) => {
	console.error('Error connecting to Mongo', err);
});

app.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(3090, () => {
	console.log('Listening on port 3090');
});
