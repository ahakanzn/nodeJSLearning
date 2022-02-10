import { Console } from "console";
import express, { Request, Response, Express, NextFunction, response } from "express"


import { TypeFormatFlags } from "typescript";
//Make a simple calculator
/*
1- create 4 endpoint
2- post /add
3- post /substract
4- post /multiply
5- post /divide

All end points will accept 2 argument in their request body
1- apple
2- pear

All endpoints will return result in the format given below;
{
  result?: number
  status: boolean  
}
*/
const dbURL = 'mongodb+srv://ahakanzn:Ahmet123.@cluster0.gc27e.mongodb.net/History?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(dbURL, {useNewUrlParse: true, useUnifiedTopology: true})
  .then((result: Function)=> console.log('Connection success'))
  .catch((err: Function)=> console.log('Error!!'))

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT ?? 3000;

var calculator = require('./calculator');



const add = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.addFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};

const sub = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.subFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};

const multiply = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.multiplyFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};

const divide = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.divideFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};


//Routes
app.post('/add', add)

app.post('/sub', sub)

app.post('/mul', multiply)

app.post('/div', divide)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})