const { sumArray, arrProp } = require('./functions')
const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});
app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});
app.post('/sum', (req, res) => {
  res.send({result: req.body.a + req.body.b});
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  let {array, num} = req.body
if(!array || !num){
  return res.sendStatus(400)
}else{

  return res.json({result : sumArray(array, num)});
}
});

app.post('/numString', (req, res) => {
  let {string } = req.body
if(string === '' || typeof string !== 'string'){
  return res.sendStatus(400)
}else{
  return res.json({result : string.split('').length});
}
});

app.post('/pluck', (req, res) => {
  let {array, string } = req.body
if(string === '' || !Array.isArray(array)){
  return res.sendStatus(400)
}else{
  return res.json({result : arrProp(array, string)});
}
});


module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
