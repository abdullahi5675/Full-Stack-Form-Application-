// Get the form and response elements
const form = document.getElementById('userForm');
const responseDiv = document.getElementById('response');

// Handle form submission
form.addEventListener('submit', async function(event) {
    // Prevent the form from refreshing the page
    event.preventDefault();
    
    // Show loading state
    responseDiv.innerHTML = '<p class="placeholder">🔄 Sending data to API...</p>';
    responseDiv.className = 'response-box';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        task: document.getElementById('task').value
    };
    
    try {
        // Send POST request to your API
        const response = await fetch('http://localhost:3000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Display the successful response
        displayResponse(data, true);
        
    } catch (error) {
        // Display error message
        displayResponse({ error: error.message }, false);
    }
});

function displayResponse(data, isSuccess) {
    if (isSuccess) {
        responseDiv.className = 'response-box success';
        responseDiv.innerHTML = `
            <h3>✅ Success! Data Received:</h3>
            <div class="response-details">
                <p><strong>Name:</strong> ${data.receivedData.name}</p>
                <p><strong>Email:</strong> ${data.receivedData.email}</p>
                <p><strong>Task:</strong> ${data.receivedData.task}</p>
            </div>
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Time:</strong> ${data.timestamp}</p>
        `;
    } else {
        // Error display remains the same
        responseDiv.className = 'response-box error';
        responseDiv.innerHTML = `
            <h3>❌ Error:</h3>
            <p>${data.error}</p>
            <p>Make sure your backend server is running on port 3000!</p>
        `;
    }
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Clear response when user starts typing again
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            responseDiv.innerHTML = '<p class="placeholder">Submit the form to see API response here...</p>';
            responseDiv.className = 'response-box';
        });
    });
    
    console.log('🚀 Frontend loaded and ready!');
});