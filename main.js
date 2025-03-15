// Left parts functionality for Freelaner site (hero, categories, featured, how-it-works)

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchBar = document.querySelector('.search-bar');
    const searchInput = searchBar.querySelector('input');
    const searchButton = searchBar.querySelector('button');
    const categoryCards = document.querySelectorAll('.category-card');
    const freelancerCards = document.querySelectorAll('.freelancer-card');
    
    // Search functionality
    const initSearch = () => {
        // Popular search suggestions
        const searchSuggestions = [
            'Web Development', 
            'Logo Design', 
            'Content Writing',
            'WordPress', 
            'Mobile App Development',
            'SEO Optimization',
            'Video Editing',
            'Data Entry',
            'Graphic Design'
        ];
        
        // Create suggestions container
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        Object.assign(suggestionsContainer.style, {
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            maxHeight: '250px',
            overflowY: 'auto',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '0 0 4px 4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '50',
            display: 'none'
        });
        
        // Add suggestions to DOM
        searchBar.style.position = 'relative';
        searchBar.appendChild(suggestionsContainer);
        
        // Show suggestions on focus
        searchInput.addEventListener('focus', () => {
            // Only show if input is empty or has minimal content
            if (searchInput.value.length < 3) {
                updateSuggestions(searchSuggestions);
                suggestionsContainer.style.display = 'block';
            }
        });
        
        // Filter suggestions as user types
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            
            if (query.length === 0) {
                updateSuggestions(searchSuggestions);
                suggestionsContainer.style.display = 'block';
            } else if (query.length >= 2) {
                const filteredSuggestions = searchSuggestions.filter(
                    suggestion => suggestion.toLowerCase().includes(query)
                );
                
                if (filteredSuggestions.length > 0) {
                    updateSuggestions(filteredSuggestions);
                    suggestionsContainer.style.display = 'block';
                } else {
                    suggestionsContainer.style.display = 'none';
                }
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // Function to update suggestions
        function updateSuggestions(suggestions) {
            suggestionsContainer.innerHTML = '';
            suggestions.forEach(suggestion => {
                const suggestionElement = document.createElement('div');
                suggestionElement.className = 'suggestion-item';
                suggestionElement.textContent = suggestion;
                
                Object.assign(suggestionElement.style, {
                    padding: '10px 15px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0'
                });
                
                suggestionElement.addEventListener('mouseenter', () => {
                    suggestionElement.style.backgroundColor = '#f5f7fa';
                });
                
                suggestionElement.addEventListener('mouseleave', () => {
                    suggestionElement.style.backgroundColor = 'transparent';
                });
                
                suggestionElement.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    suggestionsContainer.style.display = 'none';
                    // Optional: auto-submit on selection
                    // searchButton.click();
                });
                
                suggestionsContainer.appendChild(suggestionElement);
            });
        }
        
        // Handle search submission
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                // In a real application, you would redirect to search results page
                console.log(`Searching for: ${query}`);
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
                // For now we'll just simulate with an alert
                alert(`Searching for: ${query}`);
            }
        });
        
        // Allow search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                searchButton.click();
            }
        });
    };
    
    // Category cards functionality
    const initCategories = () => {
        // Category data mapping (for demonstration)
        const categoryData = {
            'Web Development': {
                icon: '💻',
                subcategories: [
                    'Frontend Development', 
                    'Backend Development', 
                    'Full Stack Development',
                    'WordPress Development',
                    'E-commerce Development'
                ]
            },
            'Design & Creative': {
                icon: '🎨',
                subcategories: [
                    'Logo Design',
                    'Graphic Design',
                    'UI/UX Design',
                    'Illustration',
                    'Animation'
                ]
            },
            'Writing': {
                icon: '📝',
                subcategories: [
                    'Content Writing',
                    'Copywriting',
                    'Technical Writing',
                    'Editing & Proofreading',
                    'Translation'
                ]
            },
            'Marketing': {
                icon: '📊',
                subcategories: [
                    'Social Media Marketing',
                    'SEO',
                    'Email Marketing',
                    'Content Marketing',
                    'PPC & Paid Advertising'
                ]
            },
            'Mobile Development': {
                icon: '📱',
                subcategories: [
                    'iOS Development',
                    'Android Development',
                    'Cross-Platform Development',
                    'App Design',
                    'App Testing'
                ]
            },
            'Data Science': {
                icon: '📈',
                subcategories: [
                    'Data Analysis',
                    'Machine Learning',
                    'Data Visualization',
                    'Big Data',
                    'Statistics'
                ]
            }
        };
        
        // Add hover effects and click handler to category cards
        categoryCards.forEach(card => {
            const categoryName = card.querySelector('h3').textContent;
            const categoryInfo = categoryData[categoryName];
            
            // Hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            });
            
            // Click handler to show subcategories
            card.addEventListener('click', () => {
                // Create modal for subcategories
                const modal = document.createElement('div');
                modal.className = 'category-modal';
                
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-button">&times;</span>
                        <div class="modal-header">
                            <div class="category-icon-large">${categoryInfo.icon}</div>
                            <h2>${categoryName}</h2>
                        </div>
                        <div class="subcategories-list">
                            <h3>Popular in ${categoryName}</h3>
                            <ul>
                                ${categoryInfo.subcategories.map(sub => `
                                    <li><a href="/search?category=${encodeURIComponent(categoryName)}&subcategory=${encodeURIComponent(sub)}">${sub}</a></li>
                                `).join('')}
                            </ul>
                        </div>
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
                    maxWidth: '500px',
                    width: '90%'
                });
                
                // Modal header styles
                const modalHeader = modal.querySelector('.modal-header');
                Object.assign(modalHeader.style, {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '2rem'
                });
                
                // Large icon styles
                const categoryIconLarge = modal.querySelector('.category-icon-large');
                Object.assign(categoryIconLarge.style, {
                    fontSize: '3rem',
                    marginRight: '1rem'
                });
                
                // Subcategories list styles
                const subcategoriesList = modal.querySelector('.subcategories-list ul');
                Object.assign(subcategoriesList.style, {
                    listStyle: 'none',
                    padding: '0'
                });
                
                const subcategoryItems = modal.querySelectorAll('.subcategories-list li');
                subcategoryItems.forEach(item => {
                    Object.assign(item.style, {
                        margin: '1rem 0'
                    });
                    
                    const link = item.querySelector('a');
                    Object.assign(link.style, {
                        textDecoration: 'none',
                        color: 'var(--text)',
                        display: 'block',
                        padding: '0.8rem',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
                    });
                    
                    link.addEventListener('mouseenter', () => {
                        link.style.backgroundColor = 'var(--background)';
                        link.style.color = 'var(--primary)';
                    });
                    
                    link.addEventListener('mouseleave', () => {
                        link.style.backgroundColor = 'transparent';
                        link.style.color = 'var(--text)';
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
                
                // Close when clicking outside modal content
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
                
                // Add modal to body
                document.body.appendChild(modal);
            });
        });
    };
    
    // Featured freelancers functionality
    const initFeaturedFreelancers = () => {
        freelancerCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            });
            
            // Add click handler to view profile
            card.addEventListener('click', () => {
                const freelancerName = card.querySelector('h3').textContent;
                const freelancerTitle = card.querySelector('.freelancer-title').textContent;
                
                // In a real application, you'd redirect to the freelancer's profile
                // For now, simulate with an alert
                alert(`Viewing profile of ${freelancerName}, ${freelancerTitle}`);
                
                // Optionally, you could use this to build a more detailed modal
                // similar to the category modal above
            });
        });
    };
    
    // How it works section functionality
    const initHowItWorks = () => {
        // Add animation on scroll
        const steps = document.querySelectorAll('.step');
        
        // Simple animation when steps come into view
        const animateOnScroll = () => {
            steps.forEach(step => {
                const stepPosition = step.getBoundingClientRect();
                
                // If step is in viewport
                if (stepPosition.top <= window.innerHeight * 0.8 && stepPosition.bottom >= 0) {
                    if (!step.classList.contains('animated')) {
                        step.classList.add('animated');
                        
                        // Animation styles
                        step.style.animation = 'fadeIn 0.8s ease forwards';
                        step.style.opacity = '0';
                        
                        // Set a delay based on step number
                        const stepNumber = step.querySelector('.step-number').textContent;
                        step.style.animationDelay = `${(parseInt(stepNumber) - 1) * 0.2}s`;
                    }
                }
            });
        };
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Initial check and scroll listener
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
        
        // Add click handlers to steps for more info
        steps.forEach(step => {
            // Make steps interactive
            step.style.cursor = 'pointer';
            
            step.addEventListener('click', () => {
                const stepNumber = step.querySelector('.step-number').textContent;
                const stepTitle = step.querySelector('h3').textContent;
                
                // Actions based on which step was clicked
                switch(stepNumber) {
                    case '1':
                        window.location.href = '/post-job';
                        break;
                    case '2':
                        window.location.href = '/browse-freelancers';
                        break;
                    case '3':
                        window.location.href = '/how-it-works';
                        break;
                }
                
                // For development, show alert
                alert(`Learn more about: ${stepTitle}`);
            });
        });
    };
    
    // Initialize all components
    const initLeftParts = () => {
        initSearch();
        initCategories();
        initFeaturedFreelancers();
        initHowItWorks();
        
        // Add general scroll to top button
        const scrollButton = document.createElement('button');
        scrollButton.textContent = '↑';
        scrollButton.className = 'scroll-to-top';
        
        Object.assign(scrollButton.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: '99'
        });
        
        // Show button when scrolled down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });
        
        // Scroll to top when clicked
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollButton);
    };
    
    // Data layer for featured freelancers
    const loadFeaturedFreelancers = () => {
        // This would normally fetch data from your backend API
        // Here we're simulating with static data
        
        const featuredFreelancersData = [
            {
                id: 1,
                name: 'Alex Johnson',
                title: 'Full Stack Developer',
                rating: 5.0,
                reviewCount: 124,
                hourlyRate: 45,
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
                imageUrl: '/api/placeholder/400/320',
                location: 'San Francisco, CA'
            },
            {
                id: 2,
                name: 'Sarah Miller',
                title: 'UX/UI Designer',
                rating: 4.9,
                reviewCount: 87,
                hourlyRate: 55,
                skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
                imageUrl: '/api/placeholder/400/320',
                location: 'New York, NY'
            },
            {
                id: 3,
                name: 'Michael Chen',
                title: 'Content Strategist',
                rating: 4.8,
                reviewCount: 103,
                hourlyRate: 35,
                skills: ['Content Writing', 'SEO', 'Social Media', 'Email Marketing', 'Brand Voice'],
                imageUrl: '/api/placeholder/400/320',
                location: 'Chicago, IL'
            },
            {
                id: 4,
                name: 'Rebecca Taylor',
                title: 'Digital Marketer',
                rating: 4.7,
                reviewCount: 92,
                hourlyRate: 40,
                skills: ['SEO', 'PPC', 'Social Media Marketing', 'Analytics', 'Content Marketing'],
                imageUrl: '/api/placeholder/400/320',
                location: 'Austin, TX'
            }
        ];
        
        // When clicking on a freelancer card, show detailed modal
        const showFreelancerDetails = (freelancer) => {
            const modal = document.createElement('div');
            modal.className = 'freelancer-modal';
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <div class="freelancer-profile">
                        <div class="freelancer-header">
                            <img src="${freelancer.imageUrl}" alt="${freelancer.name}">
                            <div class="freelancer-header-info">
                                <h2>${freelancer.name}</h2>
                                <p class="freelancer-title">${freelancer.title}</p>
                                <p class="freelancer-location">${freelancer.location}</p>
                                <div class="freelancer-rating">
                                    <span class="star">★★★★★</span>
                                    <span>${freelancer.rating} (${freelancer.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="freelancer-details">
                            <div class="freelancer-rate">
                                <h3>Rate</h3>
                                <p class="price">$${freelancer.hourlyRate}/hr</p>
                            </div>
                            
                            <div class="freelancer-skills">
                                <h3>Skills</h3>
                                <div class="skills-list">
                                    ${freelancer.skills.map(skill => `
                                        <span class="skill-tag">${skill}</span>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="freelancer-actions">
                                <button class="button button-primary">Contact</button>
                                <button class="button button-outline">View Full Profile</button>
                            </div>
                        </div>
                    </div>
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
                maxWidth: '700px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto'
            });
            
            // Freelancer header styles
            const freelancerHeader = modal.querySelector('.freelancer-header');
            Object.assign(freelancerHeader.style, {
                display: 'flex',
                gap: '2rem',
                marginBottom: '2rem'
            });
            
            // Image styles
            const freelancerImage = modal.querySelector('.freelancer-header img');
            Object.assign(freelancerImage.style, {
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover'
            });
            
            // Skills list styles
            const skillsList = modal.querySelector('.skills-list');
            Object.assign(skillsList.style, {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '0.5rem'
            });
            
            // Skill tag styles
            const skillTags = modal.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                Object.assign(tag.style, {
                    padding: '0.3rem 0.8rem',
                    backgroundColor: 'var(--background)',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                });
            });
            
            // Action buttons styles
            const freelancerActions = modal.querySelector('.freelancer-actions');
            Object.assign(freelancerActions.style, {
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
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
            
            // Action button handlers
            const contactButton = modal.querySelector('.button-primary');
            contactButton.addEventListener('click', () => {
                // Check if user is logged in
                const currentUser = localStorage.getItem('currentUser');
                
                if (currentUser) {
                    // Would redirect to messaging interface in real app
                    alert(`Starting conversation with ${freelancer.name}`);
                } else {
                    // Prompt login
                    document.querySelector('.button-outline').click(); // Trigger login modal
                    document.body.removeChild(modal);
                }
            });
            
            // View Profile button
            const viewProfileButton = modal.querySelector('.button-outline');
            viewProfileButton.addEventListener('click', () => {
                window.location.href = `/freelancer/${freelancer.id}`;
                // For development, just alert
                alert(`Viewing full profile of ${freelancer.name}`);
            });
            
            // Close when clicking outside modal content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Add modal to body
            document.body.appendChild(modal);
        };
        
        // Add click events to freelancer cards
        const freelancerCards = document.querySelectorAll('.freelancer-card');
        freelancerCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                showFreelancerDetails(featuredFreelancersData[index]);
            });
        });
    };
    
    // Footer functionality (since you mentioned "left parts")
    const initFooter = () => {
        // Get all footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        // Add smooth hover effect to footer links
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.color = 'var(--primary-light)';
                link.style.paddingLeft = '5px';
                link.style.transition = 'all 0.3s';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.color = 'var(--gray)';
                link.style.paddingLeft = '0';
            });
        });
        
        // Add newsletter signup form to footer
        const footerContent = document.querySelector('.footer-content');
        
        // Create newsletter section if it doesn't exist
        if (!document.querySelector('.footer-newsletter')) {
            const newsletterSection = document.createElement('div');
            newsletterSection.className = 'footer-section footer-newsletter';
            
            newsletterSection.innerHTML = `
                <h3>Stay Connected</h3>
                <p>Subscribe to our newsletter for the latest opportunities and tips.</p>
                <form class="newsletter-form">
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit" class="button button-primary">Subscribe</button>
                </form>
                <div class="social-media">
                    <a href="#" class="social-icon">📘</a>
                    <a href="#" class="social-icon">📱</a>
                    <a href="#" class="social-icon">📸</a>
                    <a href="#" class="social-icon">🐦</a>
                </div>
            `;
            
            // Style the newsletter section
            Object.assign(newsletterSection.style, {
                flex: '1.5',
                minWidth: '250px'
            });
            
            // Style the form
            const newsletterForm = newsletterSection.querySelector('.newsletter-form');
            Object.assign(newsletterForm.style, {
                display: 'flex',
                marginTop: '1rem',
                marginBottom: '1rem'
            });
            
            // Style form input
            const emailInput = newsletterForm.querySelector('input');
            Object.assign(emailInput.style, {
                flex: '1',
                padding: '0.8rem',
                border: 'none',
                borderRadius: '4px 0 0 4px'
            });
            
            // Style form button
            const subscribeButton = newsletterForm.querySelector('button');
            Object.assign(subscribeButton.style, {
                padding: '0.8rem 1rem',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer'
            });
            
            // Style social media icons
            const socialMedia = newsletterSection.querySelector('.social-media');
            Object.assign(socialMedia.style, {
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem'
            });
            
            const socialIcons = socialMedia.querySelectorAll('.social-icon');
            socialIcons.forEach(icon => {
                Object.assign(icon.style, {
                    fontSize: '1.5rem',
                    textDecoration: 'none',
                    transition: 'transform 0.3s'
                });
                
                icon.addEventListener('mouseenter', () => {
                    icon.style.transform = 'scale(1.2)';
                });
                
                icon.addEventListener('mouseleave', () => {
                    icon.style.transform = 'scale(1)';
                });
            });
            
            // Form submission
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = emailInput.value;
                
                // Validate email
                if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    // In a real app, you would send this to your API
                    console.log(`Newsletter signup: ${email}`);
                    
                    // Success message
                    const successMessage = document.createElement('p');
                    successMessage.textContent = 'Thanks for subscribing!';
                    successMessage.style.color = '#4CAF50';
                    
                    // Replace form with success message temporarily
                    const formParent = newsletterForm.parentNode;
                    formParent.replaceChild(successMessage, newsletterForm);
                    
                    // Restore form after 3 seconds
                    setTimeout(() => {
                        formParent.replaceChild(newsletterForm, successMessage);
                        emailInput.value = '';
                    }, 3000);
                } else {
                    // Show error styling
                    emailInput.style.border = '1px solid #FF5555';
                    emailInput.style.backgroundColor = 'rgba(255, 85, 85, 0.1)';
                    
                    // Reset styling after 2 seconds
                    setTimeout(() => {
                        emailInput.style.border = 'none';
                        emailInput.style.backgroundColor = 'white';
                    }, 2000);
                }
            });
            
            // Add to footer content
            footerContent.appendChild(newsletterSection);
        }
        
        // Add language selector to footer
        if (!document.querySelector('.language-selector')) {
            const copyright = document.querySelector('.copyright');
            
            const languageSelector = document.createElement('div');
            languageSelector.className = 'language-selector';
            
            languageSelector.innerHTML = `
                <select id="language-select">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                </select>
            `;
            
            // Style the language selector
            Object.assign(languageSelector.style, {
                margin: '1rem auto',
                textAlign: 'center'
            });
            
            const select = languageSelector.querySelector('select');
           Object.assign(select.style, {
                padding: '0.5rem',
                backgroundColor: 'transparent',
                color: 'var(--gray)',
                border: '1px solid var(--gray)',
                borderRadius: '4px',
                cursor: 'pointer'
            });
            
            // Handle language change
            select.addEventListener('change', (e) => {
                const selectedLanguage = e.target.value;
                
                // In a real app, this would change the site language
                console.log(`Language changed to: ${selectedLanguage}`);
                
                // Simulate language change with alert
                const languages = {
                    en: 'English',
                    es: 'Spanish',
                    fr: 'French',
                    de: 'German',
                    zh: 'Chinese'
                };
                
                alert(`Language changed to: ${languages[selectedLanguage]}`);
                
                // We would normally save this preference to localStorage
                localStorage.setItem('preferredLanguage', selectedLanguage);
            });
            
            // Insert before copyright text
            copyright.parentNode.insertBefore(languageSelector, copyright);
        }
        
        // Add cookie consent banner if not already shown
        if (!localStorage.getItem('cookieConsent') && !document.querySelector('.cookie-banner')) {
            const cookieBanner = document.createElement('div');
            cookieBanner.className = 'cookie-banner';
            
            cookieBanner.innerHTML = `
                <div class="cookie-content">
                    <p>We use cookies to improve your experience. By using our site, you agree to our use of cookies.</p>
                    <div class="cookie-buttons">
                        <button class="button cookie-accept">Accept</button>
                        <button class="button cookie-settings">Cookie Settings</button>
                    </div>
                </div>
            `;
            
            // Style the cookie banner
            Object.assign(cookieBanner.style, {
                position: 'fixed',
                bottom: '0',
                left: '0',
                width: '100%',
                backgroundColor: 'var(--text)',
                color: 'white',
                padding: '1rem',
                zIndex: '1000',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.2)'
            });
            
            // Style cookie content
            const cookieContent = cookieBanner.querySelector('.cookie-content');
            Object.assign(cookieContent.style, {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                flexWrap: 'wrap',
                gap: '1rem'
            });
            
            // Style buttons
            const cookieButtons = cookieBanner.querySelectorAll('.cookie-buttons button');
            cookieButtons.forEach(button => {
                Object.assign(button.style, {
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '0.5rem'
                });
            });
            
            const acceptButton = cookieBanner.querySelector('.cookie-accept');
            Object.assign(acceptButton.style, {
                backgroundColor: 'var(--primary)',
                color: 'white'
            });
            
            const settingsButton = cookieBanner.querySelector('.cookie-settings');
            Object.assign(settingsButton.style, {
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: 'white'
            });
            
            // Handle button clicks
            acceptButton.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                document.body.removeChild(cookieBanner);
            });
            
            settingsButton.addEventListener('click', () => {
                // Show cookie settings modal
                showCookieSettings();
            });
            
            // Add banner to body
            document.body.appendChild(cookieBanner);
            
            // Function to show cookie settings
            function showCookieSettings() {
                const modal = document.createElement('div');
                modal.className = 'cookie-settings-modal';
                
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-button">&times;</span>
                        <h2>Cookie Settings</h2>
                        
                        <div class="cookie-options">
                            <div class="cookie-option">
                                <div class="option-header">
                                    <h3>Essential Cookies</h3>
                                    <label class="switch">
                                        <input type="checkbox" checked disabled>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <p>These cookies are necessary for the website to function and cannot be disabled.</p>
                            </div>
                            
                            <div class="cookie-option">
                                <div class="option-header">
                                    <h3>Performance Cookies</h3>
                                    <label class="switch">
                                        <input type="checkbox" id="performance-cookies" checked>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <p>These cookies help us understand how visitors interact with our website.</p>
                            </div>
                            
                            <div class="cookie-option">
                                <div class="option-header">
                                    <h3>Marketing Cookies</h3>
                                    <label class="switch">
                                        <input type="checkbox" id="marketing-cookies" checked>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <p>These cookies are used to track effectiveness of marketing campaigns.</p>
                            </div>
                        </div>
                        
                        <div class="cookie-actions">
                            <button class="button save-preferences">Save Preferences</button>
                            <button class="button accept-all">Accept All</button>
                        </div>
                    </div>
                `;
                
                // Modal styles
                Object.assign(modal.style, {
                    position: 'fixed',
                    zIndex: '1001',
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
                    maxWidth: '600px',
                    width: '90%'
                });
                
                // Style cookie options
                const cookieOptions = modal.querySelectorAll('.cookie-option');
                cookieOptions.forEach(option => {
                    Object.assign(option.style, {
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        backgroundColor: 'var(--background)',
                        borderRadius: '8px'
                    });
                });
                
                // Style option headers
                const optionHeaders = modal.querySelectorAll('.option-header');
                optionHeaders.forEach(header => {
                    Object.assign(header.style, {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                    });
                });
                
                // Style switches
                const switches = modal.querySelectorAll('.switch');
                switches.forEach(switchEl => {
                    Object.assign(switchEl.style, {
                        position: 'relative',
                        display: 'inline-block',
                        width: '50px',
                        height: '24px'
                    });
                    
                    const input = switchEl.querySelector('input');
                    Object.assign(input.style, {
                        opacity: '0',
                        width: '0',
                        height: '0'
                    });
                    
                    const slider = switchEl.querySelector('.slider');
                    Object.assign(slider.style, {
                        position: 'absolute',
                        cursor: 'pointer',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: '#ccc',
                        borderRadius: '24px',
                        transition: '0.4s'
                    });
                    
                    slider.insertAdjacentHTML('beforeend', '<span class="slider-button"></span>');
                    const sliderButton = slider.querySelector('.slider-button');
                    Object.assign(sliderButton.style, {
                        position: 'absolute',
                        content: '""',
                        height: '16px',
                        width: '16px',
                        left: '4px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '.4s'
                    });
                    
                    // Style active state
                    input.addEventListener('change', function() {
                        if (this.checked) {
                            slider.style.backgroundColor = 'var(--primary)';
                            sliderButton.style.transform = 'translateX(26px)';
                        } else {
                            slider.style.backgroundColor = '#ccc';
                            sliderButton.style.transform = 'translateX(0)';
                        }
                    });
                    
                    // Initial state
                    if (input.checked) {
                        slider.style.backgroundColor = 'var(--primary)';
                        sliderButton.style.transform = 'translateX(26px)';
                    }
                });
                
                // Style actions
                const cookieActions = modal.querySelector('.cookie-actions');
                Object.assign(cookieActions.style, {
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    marginTop: '2rem'
                });
                
                // Action buttons
                const savePreferences = modal.querySelector('.save-preferences');
                Object.assign(savePreferences.style, {
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                });
                
                const acceptAll = modal.querySelector('.accept-all');
                Object.assign(acceptAll.style, {
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                });
                
                // Close button
                const closeButton = modal.querySelector('.close-button');
                Object.assign(closeButton.style, {
                    cursor: 'pointer',
                    float: 'right',
                    fontSize: '1.5rem'
                });
                
                // Handle actions
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                savePreferences.addEventListener('click', () => {
                    const performanceCookies = document.getElementById('performance-cookies').checked;
                    const marketingCookies = document.getElementById('marketing-cookies').checked;
                    
                    // Save preferences to localStorage
                    localStorage.setItem('cookieConsent', 'custom');
                    localStorage.setItem('performanceCookies', performanceCookies);
                    localStorage.setItem('marketingCookies', marketingCookies);
                    
                    // Remove banner and modal
                    document.body.removeChild(cookieBanner);
                    document.body.removeChild(modal);
                });
                
                acceptAll.addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'accepted');
                    localStorage.setItem('performanceCookies', true);
                    localStorage.setItem('marketingCookies', true);
                    
                    // Remove banner and modal
                    document.body.removeChild(cookieBanner);
                    document.body.removeChild(modal);
                });
                
                // Close when clicking outside
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
                
                // Add modal to body
                document.body.appendChild(modal);
            }
        }
        
        // Back to top button
        const footer = document.querySelector('footer');
        const backToTopButton = document.createElement('a');
        backToTopButton.textContent = '↑ Back to Top';
        backToTopButton.href = '#';
        backToTopButton.className = 'back-to-top-link';
        
        Object.assign(backToTopButton.style, {
            display: 'block',
            textAlign: 'center',
            marginTop: '2rem',
            color: 'var(--gray)',
            textDecoration: 'none',
            padding: '0.5rem'
        });
        
        backToTopButton.addEventListener('mouseenter', () => {
            backToTopButton.style.color = 'var(--primary-light)';
        });
        
        backToTopButton.addEventListener('mouseleave', () => {
            backToTopButton.style.color = 'var(--gray)';
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add before copyright
        const copyright = footer.querySelector('.copyright');
        footer.insertBefore(backToTopButton, copyright);
    };
    
    // Initialize all functionality
    loadFeaturedFreelancers();
    initLeftParts();
    initFooter();
});