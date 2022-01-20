import express, {Request, Response, Express, NextFunction} from "express"
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


const app = express()
const port = 3000
//Middleware
app.use( (req: Request, res: Response, next: NextFunction)=> {
  console.log("Middle wareee");
  next();
});

//Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/posts', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello Posts!')
})
app.post('/add', add)

function add(req: Request, res: Response) {
  res.send(req)
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})