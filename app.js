// importing and setup 
const express = require('express'); // I import the Express.js framework - it's like getting my construction tools
const cors = require('cors'); // NEW: Enable frontend-backend communication
const app = express(); // I create my application instance - this is the actual building I'm constructing
const PORT = 3000; // I set the port to 3000 - this is like choosing the office address where my server will operate

// NEW: Enable CORS for frontend communication and JSON parsing
app.use(cors()); // Allow frontend to connect to backend or security bridge
app.use(express.json()); // Parse JSON data from frontend or the language translator
app.use(express.static('public'));  // Serve static files from the public folder or file server

// professional logging middleware
// This is my security camera system - it logs every visitor to my API
app.use((req, res, next) => { 
  // For every request, it records the time, method (GET/POST), and which endpoint was accessed
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} request to ${req.url}`);
  next(); // The next() function tells Express to continue to the actual route handler
}); 

// Business Data Variables
const companyName = "Galaxy ITT,"; // I use const for data that never changes, like company name and birth year
let visitorCount = 0; // I use let for data that changes, like visitor count that increases with each visit
const birthYear = 1990; // this is the birth year of the company 

// contact API Endpoints
// This endpoint provides contact information in JSON format
// When someone visits /api/contact, they get my phone numbers
app.get('/api/contact', (req, res) => {
   res.json({
	phone_1: "08156751856",
	phone_2: "07047495488"
       });
});	

// Home page routen or The Test Route
// This is the main entrance - when you visit the root URL
app.get('/', (req, res) => {
  visitorCount = visitorCount + 1; // It demonstrates dynamic content by increasing the visitor counter
  res.send(`Server is working! Visitors: ${visitorCount}`); // This proves the server is alive and tracking usage
});

// Personal Info. API Endpoint - ENHANCED WITH POST SUPPORT
// This is the main task requirement - an API that returns my personal info"
// It combines both constant data (name, email) and dynamic data (visitor count)
app.get('/api/Abdullahi', (req, res) => {
  res.json({
    name: "Abdullahi H Nayaya",
    email: "ahnayaya@galaxyitt.com.ng",
    task: "API development",
    company: companyName,
    visitors: visitorCount
  });
});

app.post('/api/submit', (req, res) => {
  // Console.log the received data as required by the task
  console.log('📨 Received form data from frontend:', req.body);
  
  // Return ONLY the received data to the UI
  res.json({
    receivedData: req.body,
    message: "Data successfully received by server!",
    timestamp: new Date().toLocaleString(),
    status: "success"
  });
});

// Professional Error Handling
// This the safety net that catches any invalid URLs and provides a helpful feedback instead of confusing errors.
// the user get a JSON response with status code "404" and the list of available endponits to guide the user.
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: "The requested API endpoint does not exist",
    available_endpoints: [
	'/', 
	'/api/Abdullahi',
	'/api/contact'
        ]
  });
});

// Start server
// This starts the server and makes it listen for incoming requests
// It confirms successful startup in the terminal
app.listen(PORT, () => {
  console.log('Server running on http://localhost:3000');
  console.log('✅ Backend enhanced with POST support and CORS!');
}); 
// The server stays running until we stop it with Ctrl+C