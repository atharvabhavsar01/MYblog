//jshint esversion:6

const express = require("express");//my express app
const bodyParser = require("body-parser");//manipulate html
const ejs = require("ejs");//you can write js in html
const _ = require('lodash');//requiring lodash ,used in routing 

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


//creating app
const app = express();

// declarring published post array
const posts = [];

//app.set
app.set('view engine', 'ejs');

//app.use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//creating a get request 
app.get('/',function(req,res){
  res.render('home.ejs',{
    homeStartingContent:homeStartingContent,
    posts: posts
  });
});

//creating about page
app.get('/about',function(req,res){
  res.render('about.ejs',{
    aboutContent:aboutContent,
    posts: posts
  });
});

//creating contact page
app.get('/contact',function(req,res){
  res.render('contact.ejs',{
    contactContent:contactContent,
    posts: posts

  });
});

 //composeing new blogs page
 app.get('/compose',function(req,res){
    res.render('compose.ejs');
     
 });


 //form input 
 app.post("/compose",function(req,res){
  const post_title=req.body.post_title;
  const post_text=req.body.post_text;
    const post={
      title :post_title,
        text:  post_text
    };

    posts.push(post);
    res.redirect('/');

    
  
});



//creating routing majedar
app.get('/posts/:topic', (req, res) => {
    const title = _.lowerCase(req.params.topic);

    posts.forEach(function(post){
        const iterating_title = _.lowerCase(post.title);
        const iterating_text = _.lowerCase(post.text);
        if(iterating_title === title){
          res.render('post',{
            title:post.title,
            text : post.text
          });
        }else{
          console.log("match not found!");
        }
    })
})//whenever you create page route you don't have to specify each time you create path
//so this is very powerful way you can create websites 






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
