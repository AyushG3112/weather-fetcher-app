const express = require('express');
const bodyParser = require('body-parser');
const utility = require('./lib/utils');
const app = express();
app.use(bodyParser.json({ extended: true }))

app.get('/current',function(req,res) {
    let functionToCall;
    let params = [];
    if(req.query.lat || req.query.long) {
        functionToCall = utility.getCurrentWeatherByLatLong;
        params[0] = Number(req.query.lat);
        params[1] = Number(req.query.long);
    }

    if(req.query.name) {
        functionToCall = utility.getCurrentWeatherByCityName;
        params[0] = req.query.name;
    }

    if(req.query.id) {
        functionToCall = utility.getCurrentWeatherByCityId;
        params[0] = Number(req.query.id);
    }

    try{
        functionToCall(...params)
        .then((result) => {
            res.send(result.data);
        }).catch(e => console.log(e))
    } catch(e) {
        res.status(400).json({
            'code':e.code,
            'message':e.message
        })
    }
});

app.get('/citylist',function(req,res) {
    res.status(200).json(utility.getCityList());
});
app.listen(9000)