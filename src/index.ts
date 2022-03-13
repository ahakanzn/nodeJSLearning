import express, { Request, response, Response } from "express"

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
const dbURL = process.env.DATABASE_URI!

import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb+srv://ahakanzn:Ahmet123.@cluster0.gc27e.mongodb.net/History?retryWrites=true&w=majority");
const db = client.db('History');

const AdditionCollection = db.collection("AdditionCollections")
async function insertAdditionToDB(req: Request, total: number) {
  try {
    const result = await AdditionCollection.insertOne({
      apple: req.body.apple,
      pear: req.body.pear,
      total: total
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err: any) {
    console.log(err.stack);
  }
}

const substractionCollection = db.collection("substractionCollection")
async function insertSubstractionToDB(req: Request, total: number) {
  try {
    const result = await substractionCollection.insertOne({
      apple: req.body.apple,
      pear: req.body.pear,
      total: total
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err: any) {
    console.log(err.stack);
  }
}

const multiplicationCollection = db.collection("AdditionCollections")
async function insertMulToDB(req: Request, total: number) {
  try {
    const result = await multiplicationCollection.insertOne({
      apple: req.body.apple,
      pear: req.body.pear,
      total: total
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err: any) {
    console.log(err.stack);
  }
}

const divisionCollection = db.collection("AdditionCollections")
async function insertDivisionToDB(req: Request, total: number) {
  try {
    const result = await divisionCollection.insertOne({
      apple: req.body.apple,
      pear: req.body.pear,
      total: total
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err: any) {
    console.log(err.stack);
  }
}




const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT ?? 3000;

var calculator = require('./calculator');



const add = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.addFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    insertAdditionToDB(req, calResult).catch(console.dir);
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};

const sub = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.subFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    insertSubstractionToDB(req, calResult).catch(console.dir);
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};

const multiply = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.multiplyFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    insertMulToDB(req, calResult).catch(console.dir);
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};

const divide = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
  var calResult = calculator.divideFunction(req.body.apple, req.body.pear);
  if (!isNaN(calResult)) {
    insertDivisionToDB(req, calResult).catch(console.dir);
    res.json({ result: calResult, status: "OK" });
  }
  else {
    res.json({ result: calResult, status: "Hata" });
  }
};

const getCalculatorHistory = async (res: Response) => {
  const additions = AdditionCollection.find({}).toArray();
  try {
    res.json({res: "zort"});
  } catch (error) {
    //res.json({res: "hata"})
  }
  
};

//Routes
app.post('/add', add)

app.post('/sub', sub)

app.post('/mul', multiply)

app.post('/div', divide)

app.get('/getAddtitionHistory', getCalculatorHistory)

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
