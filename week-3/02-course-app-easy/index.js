const express = require('express');
const app = express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication=(req,res,next)=>{
  const {username,password}=req.headers;
  const admin=ADMINS.find(a=>a.username===username && a.password===password)
  console.log(admin)
  if(admin)
  next();
else
res.send("Unauthorised");
}

const userAuthentication=(req,res,next)=>{
  const {username,password}=req.headers;
  const exist=USERS.find(a=>a.username ===username && a.password===password)
  if(exist)
  {
    next();
  }
  else{
    res.send("Unauthorised");
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  var new_admin=req.body;
    const exist=ADMINS.find(a=>a.username===new_admin.username)
    if(exist){
      console.log(ADMINS)
      res.send("Account already exist");
    }
    else{
      ADMINS.push(new_admin);
      console.log(ADMINS[0]);
      res.send("Account created successfully")
    }
});

app.post('/admin/login', adminAuthentication,(req, res) => {
  // logic to log in admin
  res.send("Logged in successfully");
});

app.post('/admin/courses', adminAuthentication,(req, res) => {
  // logic to create a course
  const course=req.body;
  if(!course.title || !course.description || !course.price || !course.imageLink || !course.published){
    return res.json("Please fill all the details")
  }
  const id=Date.now();
  course.id=id;
  COURSES.push(course);
  res.send("Course created successfully"); 
});

app.put('/admin/courses/:courseid',adminAuthentication, (req, res) => {
  // logic to edit a course
  console.log("Entering put");
  const id=parseInt(req.params.courseid);
  const exist=COURSES.find(a=> a.id===id);
  console.log(exist);
  if(exist){
    Object.assign(exist,req.body);
    res.send("Course updated successfully");
  }
  else
  {
    res.send("Course Not found");
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// // User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user={
    username:req.body.username,
    password:req.body.password,
    purchasedCourses:[]
  }
  const exist=USERS.find(a => a.username===username && a.password === password)
  console.log(exist);
  if(exist)
  {
    res.send("USername already exist");
  }
  else{
    USERS.push(req.body);
    res.send("Account created successfully");
  }
});

app.post('/users/login', userAuthentication,(req, res) => {
  // logic to log in user
  res.send("Logged in successfully");
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  res.send(COURSES);
});



app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  const id=req.params.courseId;
  const exist=COURSES.find(a=>a.id===id)
  if(exist){
    req.user.purchasedCourses.push(exist);
    res.send("Course purchased successfully");
  }
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
  res.send(purchasedCourses);
});



app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
