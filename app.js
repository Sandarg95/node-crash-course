const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// connect to mongoDBH
const dbURI= 'mongodb+srv://dsantana15:kezQJOjLKcCjJ0Mf@nodetest.pciif.mongodb.net/?retryWrites=true&w=majority&appName=NodeTest'
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

// // mongoose and mongo sandbox routes 
// app.get('/add-blog', (req, res) => {
//   const blog=new Blog({
//     title:'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });

//   blog.save()
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=> {
//     console.log(err);
//   });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) =>{
//     console.log(err)
//   });
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('66f8c6126d9a0cbc02390efe')
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) =>{
//     console.log(err)
//   });
// });



// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });

//routes 
app.get('/',(req,res)=>{
  // const blogs= [
  //     {title:'Yoshi finds eggs', snippet:'Lorem ipsum dolor sit amet consectetur'},
  //     {title:'Mario finds stars', snippet:'Lorem ipsum dolor sit amet consectetur'},
  //     {title:'How to defeat bowser', snippet:'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render('index', {title: 'Home', blogs});
  res.redirect('/blogs');
});

app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  res.render('index', {title: 'Home'});
});
  // app.use((req, res, next) => {
  //     console.log('In the next');
  //     next();
  // });

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.render('about',{title: 'About'});
});




//blor routes
app.use('/blogs', blogRoutes);

// // redirects


// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: '404'});
});