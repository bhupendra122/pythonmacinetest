const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3006;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// To handle app APIs
app.use('/api', require('./apis'));

app.get('/', (req, res) => {
  return res.send({ success: true })
});

app.listen(port, () => console.log(`Avda app listening on port ${port}!`));