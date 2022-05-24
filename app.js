//using express
const express = require('express');
const { create, result } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('express/lib/response');

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

//mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res) =>{
//     const blog = new Blog ({
//         title:'new blog',
//         snippet:'about my new blog',
//         body:'more about my new blog'
//     });

//     blog.save()
//         .then((result) =>{
//             res.send(result)
//         })
//         .catch((err) =>{
//             console.log(err);
//         });
// })

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })

// app.get('single-blog',(req,res)=>{
//     Blog.findById('628b7fed5b71d8261a21c14b')
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// })

//routes
app.get('/',(req,res)=>{
    // res.send('<h1>Homepage</h1>');
    // res.sendFile('./views/index.html', {root:__dirname});
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index', {title:'Home',blogs});
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    // res.send('<h1>about page</h1>');
    res.render('about',{title:'About'});
});

//blog routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('index',{title:'All Blogs', blogs:result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
})

//redirect
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create a new Blog'});
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
            res.render('details', {blog:result, title:'Blog Details'});
        })
        .catch(err => console.log(err));
});

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result=>{
            res.json({redirect:'/blogs'})
        })
        .catch(err=> console.log(err));
});



//404
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html', {root:__dirname});
    res.status(404).render('404',{title:'404'});
})