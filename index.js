const express = require('express');
const app = express();
const path = require('path');
const fs  = require('fs');

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname , "public")));

app.get('/', function (req, res) {
    fs.readdir('./files', function (err, files) {
      if (err) {
        console.error('Error reading files:', err);
        return res.status(500).send('Failed to load tasks.');
      }
      console.log('Files:', files); // Check the array of filenames
      res.render('index', { files: files });
    });
  });
  

app.post('/create', function (req, res) {
    const fileName = req.body.title.split(' ').join('');
    const filePath = `./files/${fileName}.txt`;
  
    fs.writeFile(filePath, req.body.details, function (err) {
      if (err) {
        console.error('Error creating file:', err);
        return res.status(500).send('Failed to create task.');
      }
      res.redirect('/');
    });
  });
  

app.listen(4000);