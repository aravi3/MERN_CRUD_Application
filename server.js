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
  res.sendFile(__dirname + '/root.html');
});

app.get('/quotes', (req, res) => {
  // res.send('hello world');
  // res.sendFile(__dirname + '/index.html');

  db.collection('quotes').find().toArray((err, result) => {
    if (err)  {
      console.log(err);
      return;
    }

    res.send(result);
  });

  // res.render('root.ejs');
});

app.post('/quotes', (req, res) => {
  // console.log('Hellooooooooooooooooo!');
  // console.log(req.body);

  db.collection('quotes').save(req.body, (err, result) => {
    if (err)  {
      console.log(err);
      return;
    }

    // console.log(result);
    console.log(result.ops);

    res.send(result.ops);

    // res.redirect('/');
  });
});

app.patch('/quotes', (req, res) => {
  let newEntry = {
    name: req.body.name,
    quote: req.body.quote
  };
  db.collection('quotes').findOneAndUpdate(
  {
    name: req.body.name
  },
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  {
    new:  true,
    sort: {_id: -1},
  },
  (err, result) => {
    if (err) {
      return res.send(err);
    }
    newEntry['_id'] = result.value._id;
    res.send(newEntry);
  });
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) {
        return res.send(500, err);
      }
      console.log(result);
      // res.send({message: 'A darth vadar quote got deleted'});
      res.send(result.value);
  });
});
