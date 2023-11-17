const express = require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const app = express();

app.use(express.json());

const secretKey='mySecret';//This should be in a environment variable

//Define mongoose schemas
const userSchema=new mongoose.Schema({
  username:String,
  password:String,
  purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
})

const adminSchema=new mongoose.Schema({
  username:String,
  password:String
})

const courseSchema=new mongoose.Schema({
  title:String,
  description:String,
  price:Number,
  imagelink:String,
  published:Boolean
})

//Define mongoose model
const user=mongoose.model('Users',userSchema);
const admin=mongoose.model('Admins',adminSchema);
const course=mongoose.model('Courses',courseSchema);

//authentication
const authenticatejwt=(req,res,next)=>{
  const token=req.headers.authorization;
  if(token){
    jwt.verify(token,secretKey,(err,user)=>{
      if(err){
        return res.sendStatus(403); //FORBIDDEN need necessary permission
      }
      req.user=user;
      next();
    })
  }
  else{
    res.sendStatus(401);//credentials are wrong
  }
}

//Connect to MongoDB
mongoose.connect('mongodb+srv://monisazeem:monisazeem@cluster0.94aobgx.mongodb.net/Course-selling-website')




// Admin routes
app.post('/admin/signup', async(req, res) => {
  // logic to sign up admin

  const {username,password}=req.body;
  const exist=await admin.findOne({username});
  if(exist){
    res.status(403).json({message:'Admin already exists'})
  }
  else{
    const newAdmin=new admin({username,password});
    await newAdmin.save();
    const token=jwt.sign({username,role:'admin'},secretKey,{expiresIn:'1h'});
    res.json({
      message:'Admin Account created Successfully',
      Authorization:token
  })
  }
});

app.post('/admin/login', async(req, res) => {
  // logic to log in admin
  const {username,password}=req.headers;
  const exist=await admin.findOne({username,password});
  if(exist){
    const token=jwt.sign({username,role:'admin'},secretKey,{expiresIn:'1h'});
    res.json({message:'Logged in successfully',Authorization:token});
  }
  else{
    res.status(403).json({message:'Invalid username or password'});
  }
});

app.post('/admin/courses', authenticatejwt,async(req, res) => {
  // logic to create a course
  const newCourse=new course(req.body);
  await newCourse.save();
  res.json({
    message:'Course created successfully',
    courseid:course.id
  })
});

app.put('/admin/courses/:courseid', authenticatejwt,async(req, res) => {
  // logic to edit a course
  const exist=await course.findByIdAndUpdate(req.params.courseid,req.body,{new:true});
  if(exist){
    res.json({
      message:'Course edited successfully'
    })
  }
  else{
    res.status(404).send({
      message:'Course not found'
    })
  }
});

app.get('/admin/courses', authenticatejwt,async(req, res) => {
  // logic to get all courses
  const allCourses=await course.find({});
  res.json(allCourses);
});



// User routes
app.post('/users/signup', async(req, res) => {
  // logic to sign up user
  const {username,password}=req.body;
  const exist=await user.findOne({username});
  if(exist){
    res.status(403).json({
      message:'Username already exist'
    })
  }
  else{
    const newUser=await new user(req.body);
    await newUser.save();
    const token=jwt.sign({username,role:'user'},secretKey,{expiresIn:'1h'});
    res.send({
      message:'User created successfully',
      Authorization:token
    })
  }
});

app.post('/users/login', async(req, res) => {
  // logic to log in user
  const {username,password}=req.headers
  const exist=await user.findOne({username,password});
  if(exist){
    const token=jwt.sign({username,role:'user'},secretKey,{expiresIn:'1h'});
    res.json({
      message:'Logged in successfully',
      Authorization:token
    })
  }
  else{
    res.status(403).json({
      message:'Invalid username or password'
    })
  }
});

app.get('/users/courses', authenticatejwt,async(req, res) => {
  // logic to list all courses
  const allCourses=await course.find({published:true});
  res.json(allCourses);
});

app.post('/users/courses/:courseid',authenticatejwt,async(req, res) => {
  // logic to purchase a course
  const exist=await course.findById(req.params.courseid);
  if(exist){
    const rightUser=await user.findOne({username:req.user.username})
    if(rightUser){
      console.log(exist.id);
    rightUser.purchasedCourses.push(exist.id);
    await rightUser.save();
    res.json({
      message:'Course purchased Successfully'
    })
    }
    else{
      res.status(403).json({
        message:'User not found'
      })
    }
  }
  else{
    res.status(404).send('Course not found');
  }
});

app.get('/users/purchasedCourses', authenticatejwt,async(req, res) => {
  // logic to view purchased courses
  const rightUser=await user.findOne({username:req.user.username}).populate('purchasedCourses');
  if(rightUser){
    res.send(rightUser.purchasedCourses);
  }
  else{
  res.status(403).send('User not found');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
