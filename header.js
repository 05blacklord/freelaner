// Header functionality for Freelaner site

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const loginButton = authButtons.querySelector('.button-outline');
    const signupButton = authButtons.querySelector('.button-primary');
    
    // Mobile navigation toggle
    const createMobileMenu = () => {
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const mobileMenuToggle = document.createElement('div');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.innerHTML = '☰';
            mobileMenuToggle.style.fontSize = '1.8rem';
            mobileMenuToggle.style.cursor = 'pointer';
            mobileMenuToggle.style.display = 'none';
            
            // Mobile menu functionality
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                
                // When mobile menu is open, change display properties
                if (navLinks.style.display === 'flex') {
                    navLinks.style.position = 'absolute';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.width = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.top = '60px';
                    navLinks.style.padding = '1rem';
                    navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                }
            });
            
            // Insert before auth buttons
            header.querySelector('nav').insertBefore(mobileMenuToggle, authButtons);
            
            // Handle responsive view for mobile
            const handleResize = () => {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.style.display = 'block';
                    navLinks.style.display = 'none';
                    authButtons.style.marginLeft = 'auto';
                } else {
                    mobileMenuToggle.style.display = 'none';
                    navLinks.style.display = 'flex';
                    navLinks.style.position = 'static';
                    navLinks.style.flexDirection = 'row';
                    navLinks.style.width = 'auto';
                    navLinks.style.padding = '0';
                    navLinks.style.boxShadow = 'none';
                }
            };
            
            // Initial call and event listener
            handleResize();
            window.addEventListener('resize', handleResize);
        }
    };
    
    // Header scroll effect
    const handleHeaderScroll = () => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.15)';
                header.style.padding = '0.7rem 2rem';
                header.style.transition = 'all 0.3s ease';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.padding = '1rem 2rem';
            }
        });
    };
    
    // Authentication handlers
    const setupAuthButtons = () => {
        // Login button click handler
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create login modal
            const modal = document.createElement('div');
            modal.className = 'auth-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <h2>Log In to Freelaner</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" required>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="button button-primary">Log In</button>
                        </div>
                        <div class="form-footer">
                            <a class="button button-outline" href="#" id="forgot-password">Forgot Password?</a>
                            <p>Don't have an account? <a href="#" id="switch-to-signup">Sign Up</a></p>
                        </div>
                    </form>
                </div>
            `;
            
            // Modal styles
            Object.assign(modal.style, {
                position: 'fixed',
                zIndex: '1000',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            });
            
            // Modal content styles
            const modalContent = modal.querySelector('.modal-content');
            Object.assign(modalContent.style, {
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '90%'
            });
            
            // Form styles
            const formGroups = modal.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                Object.assign(group.style, {
                    marginBottom: '1.5rem'
                });
            });
            
            const inputs = modal.querySelectorAll('input');
            inputs.forEach(input => {
                Object.assign(input.style, {
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    marginTop: '0.5rem'
                });
            });
            
            // Close button
            const closeButton = modal.querySelector('.close-button');
            Object.assign(closeButton.style, {
                cursor: 'pointer',
                float: 'right',
                fontSize: '1.5rem'
            });
            
            closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Add modal to body
            document.body.appendChild(modal);
            
            // Handle login form submission
            const loginForm = document.getElementById('login-form');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Here you would typically make an API call to your backend
                console.log(`Login attempt with: ${email}`);
                
                // Simulating authentication
                setTimeout(() => {
                    // On successful login
                    const user = { email, name: email.split('@')[0] };
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    updateHeaderForLoggedInUser(user);
                    document.body.removeChild(modal);
                }, 1000);
            });
        });
        
        // Sign up button click handler
        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Similar modal creation for signup
            // This would be similar to login but with additional fields
            alert('Sign Up functionality to be implemented');
        });
    };
    
    // Update header when user is logged in
    const updateHeaderForLoggedInUser = (user) => {
        // Clear auth buttons
        authButtons.innerHTML = '';
        
        // Create user dropdown
        const userDropdown = document.createElement('div');
        userDropdown.className = 'user-dropdown';
        
        userDropdown.innerHTML = `
            <div class="user-button">
                <span>${user.name}</span>
                <span class="dropdown-arrow">▼</span>
            </div>
            <div class="dropdown-menu">
                <a href="#">Dashboard</a>
                <a href="#">Profile</a>
                <a href="#">Settings</a>
                <a href="#" id="logout-button">Logout</a>
            </div>
        `;
        
        // Style dropdown
        Object.assign(userDropdown.style, {
            position: 'relative',
            cursor: 'pointer'
        });
        
        const userButton = userDropdown.querySelector('.user-button');
        Object.assign(userButton.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: '4px'
        });
        
        const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
        Object.assign(dropdownMenu.style, {
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'none',
            minWidth: '150px',
            zIndex: '100'
        });
        
        const dropdownLinks = dropdownMenu.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            Object.assign(link.style, {
                display: 'block',
                padding: '0.8rem 1rem',
                textDecoration: 'none',
                color: 'var(--text)',
                borderBottom: '1px solid var(--gray)'
            });
            
            link.addEventListener('mouseenter', () => {
                link.style.backgroundColor = 'var(--background)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.backgroundColor = 'transparent';
            });
        });
        
        // Toggle dropdown
        userButton.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Handle logout
        const logoutButton = dropdownMenu.querySelector('#logout-button');
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            location.reload(); // Reload page to reset state
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
        
        // Add to header
        authButtons.appendChild(userDropdown);
    };
    
    // Check for logged in user on page load
    const checkLoggedInUser = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            updateHeaderForLoggedInUser(JSON.parse(currentUser));
        }
    };
    
    // Initialize all header functionality
    const initHeader = () => {
        createMobileMenu();
        handleHeaderScroll();
        setupAuthButtons();
        checkLoggedInUser();
        
        // Logo click leads to home
        logo.addEventListener('click', () => {
            window.location.href = '/';
        });
    };
    
    // Start the header functionality
    initHeader();
});