//using express
const express = require('express');
const { create, result } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('express/lib/response');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//connect to db
const dbURI = 'mongodb+srv://blog:blog321@cluster0.6zhde.mongodb.net/nodeNinja?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db');
        app.listen(3000); // listen to req once db connection is established
    })
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

//redirect
// router.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// })

//404
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html', {root:__dirname});
    res.status(404).render('404',{title:'404'});
})