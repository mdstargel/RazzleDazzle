const express = require('express');
const app = express();
app.use(express.json());

const async = require('async');
const { Get_All_News } = require('../src/News/Get_News');


app.get('/Public_News', async function(req, res) {
	var public_news = await Get_All_News();
	res.send(public_news);
})

module.exports = app;