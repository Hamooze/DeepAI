// (c) DUCK

// --- "Cookie Eater" - Session Persistence Check --- 
// This should ONLY run on login.html or signup.html to redirect *away* if already logged in.
const currentPageForAuthJs = window.location.pathname.split('/').pop();
if (currentPageForAuthJs === 'login.html' || currentPageForAuthJs === 'signup.html') {
    console.log(`LOGIN/SIGNUP PAGE LOAD (${currentPageForAuthJs}): serviceRequests on page entry:`, localStorage.getItem('serviceRequests')); // DEBUG
    const loggedInUserOnAuthPages = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUserOnAuthPages) {
        if (loggedInUserOnAuthPages.role === 'admin') {
            window.location.href = 'admin_dashboard.html';
        } else if (loggedInUserOnAuthPages.role === 'user' || loggedInUserOnAuthPages.role === 'guest') {
            window.location.href = 'user_dashboard.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginError = document.getElementById('loginError');
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const facebookSignInBtn = document.getElementById('facebookSignInBtn');
    const appleSignInBtn = document.getElementById('appleSignInBtn');

    // --- Credentials --- 
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123"; // In a real app, passwords should be hashed.
    const GUEST_EMAIL = "guest@gmail.com";
    const GUEST_PASSWORD = "guest"; // Simple password for guest

    // Login form logic only relevant if on login page
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (loginError) loginError.style.display = 'none';

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            let userRole = 'user'; // Default role
            let userId = 'user' + Date.now().toString().slice(-4);
            let redirectTo = 'user_dashboard.html';
            let loginSuccess = false;
            let userDataForStorage = {}; // Prepare an object for localStorage

            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                userRole = 'admin';
                userId = 'admin001';
                redirectTo = 'admin_dashboard.html';
                userDataForStorage = { email: email, role: userRole, id: userId, fullName: 'DUCKTECH Admin' };
                loginSuccess = true;
            } else if (email === GUEST_EMAIL && password === GUEST_PASSWORD) {
                userRole = 'guest'; 
                userId = 'guest' + Date.now().toString().slice(-4);
                redirectTo = 'user_dashboard.html'; 
                userDataForStorage = { email: email, role: userRole, id: userId, fullName: 'Guest User' };
                loginSuccess = true;
            } else {
                // Attempt to find a registered user from userAccounts
                const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
                const foundUser = userAccounts.find(u => u.email === email && u.password === password); // WARNING: Plain text password check!

                if (foundUser) {
                    userRole = foundUser.role || 'user';
                    userId = foundUser.userId;
                    redirectTo = 'user_dashboard.html';
                    userDataForStorage = { email: foundUser.email, role: userRole, id: userId, fullName: foundUser.fullName };
                    loginSuccess = true;
                } else if (email && password && email.includes('@')) { 
                    // Fallback for generic attempt if no specific user found - show error for now
                    // Previously, this allowed any email/pass as a generic user.
                    // Now, we require users to be in userAccounts (i.e., registered).
                    if (loginError) {
                        loginError.textContent = 'Email or password incorrect, or user not registered.';
                        loginError.style.display = 'block';
                    }
                    return; 
                } else {
                     if (loginError) {
                        loginError.textContent = 'Invalid email or password format.';
                        loginError.style.display = 'block';
                    }
                    return; 
                }
            }

            if (loginSuccess) {
                localStorage.setItem('loggedInUser', JSON.stringify(userDataForStorage));
                window.location.href = redirectTo;
            } else {
                // This specific else might not be strictly necessary if all paths return or set loginSuccess
                if (loginError && !loginError.style.display || loginError.style.display === 'none') { // Avoid overwriting specific errors
                    loginError.textContent = 'Login failed. Please check your credentials.';
                    loginError.style.display = 'block';
                }
            }
        });
    }

    // Social sign-in button listeners only relevant if on login page
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', () => {
            alert('Google Sign-In clicked (Not Implemented Yet)!');
        });
    }
    if (facebookSignInBtn) {
        facebookSignInBtn.addEventListener('click', () => {
            alert('Facebook Sign-In clicked (Not Implemented Yet)!');
        });
    }
    if (appleSignInBtn) {
        appleSignInBtn.addEventListener('click', () => {
            alert('Apple Sign-In clicked (Not Implemented Yet)!');
        });
    }

    // Signup form logic only relevant if on signup page
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            alert('Registration submitted (Placeholder)!\nName: ' + fullName + '\nEmail: ' + email + '\nRedirecting to login...');
            window.location.href = 'login.html';
        });
    }
});

// Make logout function globally accessible
window.logout = function() {
    console.log('LOGOUT START: serviceRequests before removing loggedInUser:', localStorage.getItem('serviceRequests')); // DEBUG
    localStorage.removeItem('loggedInUser');
    console.log('LOGOUT END: serviceRequests after removing loggedInUser:', localStorage.getItem('serviceRequests')); // DEBUG
    window.location.href = 'login.html';
} 