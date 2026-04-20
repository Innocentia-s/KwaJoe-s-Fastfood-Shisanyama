// Login Form Functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Password validation (minimum 6 characters)
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // If all validation passes, show success message
    alert('Login successful! Welcome to KwaJoe\'s Fast Food & Shisanyama');
    
    // Here you would typically send the credentials to a backend server
    // For now, we'll just clear the form
    this.reset();
    
    // Redirect to menu after successful login
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 500);
});

// Add enter key support
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});

// Forgot Password Functionality
document.querySelector('.remember-forgot a').addEventListener('click', function(e) {
    e.preventDefault();
    showForgotPasswordModal();
});

function showForgotPasswordModal() {
    const email = prompt('Enter your email address to reset your password:', '');
    
    if (email === null) {
        // User clicked cancel
        return;
    }
    
    if (email.trim() === '') {
        alert('Please enter a valid email address');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate sending password reset email
    alert(`Password reset link has been sent to ${email}.\n\nPlease check your email and follow the instructions to reset your password.\n\nIf you don't receive an email within 5 minutes, please check your spam folder.`);
    
    // In a real application, you would send this to your backend server
    console.log('Password reset requested for:', email);
}

