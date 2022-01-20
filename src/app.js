const express = require('express');

const app = express();

//routes
app.get('/',(req,res) =>{
    res.send("Heyyooo");
});

//listen to the server
app.listen(3000);