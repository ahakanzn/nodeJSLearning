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
class CalculatorRequest {
  apple: number;
  pear: number;

  constructor(apple: number, pear: number) {
    this.apple = apple;
    this.pear = pear;
  }

  add(): number {
    return this.apple + this.pear;
  }

  substract(): number {
    return this.apple - this.pear;
  }

  multiply(): number {
    return this.apple*this.pear;
  }

  divide(): number {
    return this.apple/this.pear;
  }
}


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3000


//const hello = (req: Request<any, any, { apple: number, pear: number }>, res: Response) => {
const addFunction = (req: Request<any, any, CalculatorRequest>, res: Response) => {
  const calculator = new CalculatorRequest(req.body.apple, req.body.pear)
  res.json({ result: calculator.add(), status: true });
};

const substractFunction = (req: Request<any, any, CalculatorRequest>, res: Response) => {
  const calculator = new CalculatorRequest(req.body.apple, req.body.pear)
  res.json({ result: calculator.substract(), status: true });
};

const multiplyFunction = (req: Request<any, any, CalculatorRequest>, res: Response) => {
  const calculator = new CalculatorRequest(req.body.apple, req.body.pear)
  res.json({ result: calculator.multiply(), status: true });
};

const divideFunction = (req: Request<any, any, CalculatorRequest>, res: Response) => {
  const calculator = new CalculatorRequest(req.body.apple, req.body.pear)
  res.json({ result: calculator.divide(), status: true });
};
//Routes
app.post('/add', addFunction)

app.post('/sub', substractFunction)

app.post('/mul', multiplyFunction)

app.post('/div', divideFunction)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})