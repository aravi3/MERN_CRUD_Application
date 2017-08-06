// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', router);
app.set('view engine', 'ejs');
let db;

MongoClient.connect('mongodb://ar2au:Sairam#101@ds057224.mlab.com:57224/funny-quotes', (err, database) => {
  if (err) {
    console.log(err);
    return;
  }

  db = database;

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

console.log("May Node be with you");

app.get('/', (req, res) => {
  // res.send('hello world');
  // res.sendFile(__dirname + '/index.html');

  db.collection('quotes').find().toArray((err, result) => {
    if (err)  {
      console.log(err);
      return;
    }

    res.render('index.ejs', {quotes: result});
  });
});

app.post('/quotes', (req, res) => {
  // console.log('Hellooooooooooooooooo!');
  // console.log(req.body);

  db.collection('quotes').save(req.body, (err, result) => {
    if (err)  {
      console.log(err);
      return;
    }

    console.log('saved to database');
    res.redirect('/');
  });
});

app.patch('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate({name: 'Yoda'},
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  {
    sort: {_id: -1},
    upsert: true
  },
  (err, result) => {
    if (err) {
      return res.send(err);
    }

    res.send(result);
  });
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) {
        return res.send(500, err);
      }

      // res.send({message: 'A darth vadar quote got deleted'});
      res.send(result.value);
  });
});
