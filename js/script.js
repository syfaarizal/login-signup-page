document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const container = document.getElementById('container');
    const goToLogin = document.getElementById('goToLogin');
    const goToSignup = document.getElementById('goToSignup');
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const loginPassword = document.getElementById('loginPassword');
    const signupPassword = document.getElementById('signupPassword');
    const forgotPassword = document.getElementById('forgotPassword');
    
    // Toggle between login and signup forms
    goToLogin.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
            
    goToSignup.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
            
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });
            
    // Toggle password visibility
    toggleLoginPassword.addEventListener('click', function() {
        const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPassword.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
            
    toggleSignupPassword.addEventListener('click', function() {
        const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        signupPassword.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
            
    // Form submission handling
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
                
        // In a real application, you would send this data to a server
        console.log('Login attempt:', { email, password });
        alert('Login successful! (This is a demo)');
                
        // Reset form
        loginForm.reset();
    });
            
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
                
        // Simple validation
        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
                
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
                
        // In a real application, you would send this data to a server
        console.log('Signup attempt:', { username, email, password });
        alert('Signup successful! (This is a demo)');
            
        // Reset form and go to login
        signupForm.reset();
        container.classList.remove('right-panel-active');
    });
            
    // Forgot password handling
    forgotPassword.addEventListener('click', function() {
        const email = prompt('Please enter your email to reset password:');
        if (email) {
            // In a real application, you would send a reset email
            console.log('Password reset requested for:', email);
            alert('If an account exists with this email, you will receive a password reset link. (This is a demo)');
        }
    });
            
    // Mobile toggle form visibility
    if (window.innerWidth <= 768) {
        // Add mobile-specific toggle buttons
        const loginContainer = document.querySelector('.login-container');
        const signupContainer = document.querySelector('.sign-up-container');
        
        const loginToggle = document.createElement('div');
        loginToggle.className = 'toggle-form';
        loginToggle.innerHTML = '<p>Create An Account <a id="mobileGoToSignup">Sign Up</a></p>';
        loginContainer.appendChild(loginToggle);
                
        const signupToggle = document.createElement('div');
        signupToggle.className = 'toggle-form';
        signupToggle.innerHTML = '<p>Already Have Account? <a id="mobileGoToLogin">Login</a></p>';
        signupContainer.appendChild(signupToggle);
                
        // Add event listeners for mobile toggles
        document.getElementById('mobileGoToSignup').addEventListener('click', () => {
            signupContainer.style.display = 'flex';
            loginContainer.style.display = 'none';
        });
                
        document.getElementById('mobileGoToLogin').addEventListener('click', () => {
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'flex';
        });
                
        // Initially hide signup form on mobile
        signupContainer.style.display = 'none';
    }
});document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const container = document.getElementById('container');
    const goToLogin = document.getElementById('goToLogin');
    const goToSignup = document.getElementById('goToSignup');
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const loginPassword = document.getElementById('loginPassword');
    const signupPassword = document.getElementById('signupPassword');
    const forgotPassword = document.getElementById('forgotPassword');
    
    // Add floating animation to icons
    document.querySelectorAll('.form-header i, .overlay-panel i').forEach(icon => {
        icon.classList.add('floating');
    });
    
    // Add fade-in animation to forms
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.add('fade-in');
    });
    
    // Toggle between login and signup forms
    const showLogin = () => {
        container.classList.remove('right-panel-active');
    };
    
    const showSignup = () => {
        container.classList.add('right-panel-active');
    };
    
    goToLogin.addEventListener('click', showLogin);
    goToSignup.addEventListener('click', showSignup);
    signInButton.addEventListener('click', showLogin);
    signUpButton.addEventListener('click', showSignup);
    
    // Toggle password visibility with animation
    const togglePassword = (passwordField, toggleIcon) => {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        
        // Add animation
        toggleIcon.style.transform = 'translateY(-50%) scale(1.2)';
        setTimeout(() => {
            toggleIcon.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
        
        toggleIcon.classList.toggle('fa-eye');
        toggleIcon.classList.toggle('fa-eye-slash');
    };
    
    toggleLoginPassword.addEventListener('click', () => {
        togglePassword(loginPassword, toggleLoginPassword);
    });
    
    toggleSignupPassword.addEventListener('click', () => {
        togglePassword(signupPassword, toggleSignupPassword);
    });
    
    // Form submission handling with validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!password) {
            showMessage('Please enter your password', 'error');
            return;
        }
        
        // Simulate API call
        simulateApiCall('login', { email, password })
            .then(() => {
                showMessage('Login successful! Welcome back!', 'success');
                loginForm.reset();
            })
            .catch(() => {
                showMessage('Invalid credentials. Please try again.', 'error');
            });
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        
        if (!username || username.length < 3) {
            showMessage('Username must be at least 3 characters long', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }
        
        // Simulate API call
        simulateApiCall('signup', { username, email, password })
            .then(() => {
                showMessage('Account created successfully! Welcome!', 'success');
                signupForm.reset();
                showLogin();
            })
            .catch(() => {
                showMessage('Email already exists. Please use a different email.', 'error');
            });
    });
    
    // Forgot password handling
    forgotPassword.addEventListener('click', function() {
        const email = prompt('📧 Enter your email to reset password:');
        if (email && validateEmail(email)) {
            simulateApiCall('forgot-password', { email })
                .then(() => {
                    showMessage('Password reset link sent to your email!', 'success');
                })
                .catch(() => {
                    showMessage('Email not found. Please try again.', 'error');
                });
        } else if (email) {
            showMessage('Please enter a valid email address', 'error');
        }
    });
    
    // Utility functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(message, type) {
        // Remove existing messages
        const existingMsg = document.querySelector('.message');
        if (existingMsg) existingMsg.remove();
        
        // Create message element
        const msgEl = document.createElement('div');
        msgEl.className = `message ${type}`;
        msgEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <i class="fas fa-times close-message"></i>
        `;
        
        // Style the message
        msgEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 12px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #ff6b6b, #ff5252)'};
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add close button functionality
        msgEl.querySelector('.close-message').addEventListener('click', () => {
            msgEl.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => msgEl.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (msgEl.parentNode) {
                msgEl.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => msgEl.remove(), 300);
            }
        }, 5000);
        
        document.body.appendChild(msgEl);
        
        // Add CSS for animations
        if (!document.querySelector('#message-styles')) {
            const style = document.createElement('style');
            style.id = 'message-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function simulateApiCall(endpoint, data) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                console.log(`API Call to ${endpoint}:`, data);
                
                // For demo purposes, randomly succeed or fail
                const shouldSucceed = Math.random() > 0.3;
                
                if (shouldSucceed) {
                    resolve({ success: true, message: 'Operation successful' });
                } else {
                    reject({ success: false, message: 'Operation failed' });
                }
            }, 1000);
        });
    }
    
    // Mobile-specific handling
    if (window.innerWidth <= 768) {
        const loginContainer = document.querySelector('.login-container');
        const signupContainer = document.querySelector('.sign-up-container');
        
        // Create mobile toggle button for login page
        const loginToggleBtn = document.createElement('button');
        loginToggleBtn.className = 'mobile-toggle-btn';
        loginToggleBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create New Account';
        loginToggleBtn.addEventListener('click', () => {
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'flex';
            signupContainer.classList.add('fade-in');
        });
        loginContainer.appendChild(loginToggleBtn);
        
        // Create mobile toggle button for signup page
        const signupToggleBtn = document.createElement('button');
        signupToggleBtn.className = 'mobile-toggle-btn';
        signupToggleBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Already have account?';
        signupToggleBtn.addEventListener('click', () => {
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'flex';
            loginContainer.classList.add('fade-in');
        });
        signupContainer.appendChild(signupToggleBtn);
        
        // Hide signup container initially on mobile
        signupContainer.style.display = 'none';
    }
    
    // Add decorative hearts for desktop
    if (window.innerWidth > 768) {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: ${20 + Math.random() * 15}px;
                color: #ff69b4;
                opacity: ${0.1 + Math.random() * 0.2};
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                z-index: -1;
            `;
            document.body.appendChild(heart);
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Show both forms for desktop
            document.querySelector('.login-container').style.display = 'flex';
            document.querySelector('.sign-up-container').style.display = 'flex';
        }
    });
});