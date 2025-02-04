const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./config/db.js');
const bodyParser = require('body-parser')
const cors = require('cors')



dotenv.config();

const app = express();


let url = process.env.LOCAL_FRONTEND;
if (process.env.IS_DELPOYED == "true") {
    url = process.env.DEPLOYED_FRONTEND;
}
// Allow requests from the specified origin
const corsOptions = {
    origin: url, // Allow only this origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

connectToMongo();

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/auth.js'));

app.listen(PORT, () => {
    console.log(`Express server running at port ${PORT}`);
});