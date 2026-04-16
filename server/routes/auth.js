import e from "express";

const router = e.Router() 

router.post('/register', (req, res) => {
  // Handle user registration logic here
  res.send('User registration endpoint');
});

router.post('/login', (req, res) => {
  // Handle user login logic here
  res.send('User login endpoint');
}); 

router.post('/logout', (req, res) => {
  // Handle user logout logic here
  res.send('User logout endpoint');
}); 

router.get('/profile', (req, res) => {
  // Handle fetching user profile logic here
  res.send('User profile endpoint');
});


export default router