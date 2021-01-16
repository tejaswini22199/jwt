const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
app.get('/api',(req,res)=>
{
    res.json(
        {
            message:'welcome to the api'
        }
    );
});
app.post('/api/posts',AuthToken ,(req,res)=>
{
    jwt.verify(req.token,'secretkey',(err,authData)=>
    {
        if(err)
        res.sendStatus(403);
        else {
            res.json(
            {
                message:'post request created',
                authData
            }
        );
    }
    }
);
});
app.post('/api/login', (req,res)=>
{
    const user={
        id:'1',
        username:'powercoder',
        email:'tejaswini22199@gmail.com'
    }
    jwt.sign({user:user},'secretkey',(err,token)=>
    {
        res.json(
            {
                token
            });
    })
})
function AuthToken(req,res,next)
{
    const header_b=req.headers['authorization'];
    if(typeof header_b!=='undefined'){
    const header_bearer=header_b.split(' ');
    const token=header_bearer[1];
    req.token=token;
    next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(3000,()=>console.log('app working on port 3000'));
