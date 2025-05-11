// This script should be included in pages that require authentication.

(function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser'));
    const currentPage = window.location.pathname.split('/').pop(); // e.g., 'admin_dashboard.html'

    if (!loggedInUser) {
        // No user logged in, redirect to login page
        if (currentPage !== 'login.html' && currentPage !== 'signup.html') {
            window.location.href = 'login.html';
        }
        return;
    }

    // User is logged in, check if they are on the correct dashboard
    if (loggedInUser.role === 'admin' && currentPage !== 'admin_dashboard.html' && currentPage !== 'index.html') {
        // Admin is on a non-admin page (e.g., user_dashboard), redirect to admin dashboard
        // Allow index.html for admins as it's part of their tools
        // window.location.href = 'admin_dashboard.html'; 
        // Commenting out for now to allow easier navigation during development
        // In production, you might enforce this redirection.
    } else if (loggedInUser.role === 'user' && currentPage !== 'user_dashboard.html') {
        // User is on a non-user page, redirect to user dashboard
        // window.location.href = 'user_dashboard.html';
        // Commenting out for now.
    }

    // Display user email and setup logout for dashboard pages
    if (currentPage === 'admin_dashboard.html') {
        const adminEmailSpan = document.getElementById('adminEmail');
        const logoutBtnAdmin = document.getElementById('logoutBtnAdmin');
        if (adminEmailSpan) adminEmailSpan.textContent = loggedInUser.email;
        // Ensure logout function is available from auth.js (now global)
        if (logoutBtnAdmin && typeof window.logout === 'function') {
            logoutBtnAdmin.addEventListener('click', window.logout);
        } else if (logoutBtnAdmin) {
            console.error('Logout function not found for admin dashboard.');
        }
    }

    if (currentPage === 'user_dashboard.html') {
        const userEmailSpan = document.getElementById('userEmail');
        const logoutBtnUser = document.getElementById('logoutBtnUser');
        const welcomeHeading = document.querySelector('.dashboard-container h2'); // Assuming H2 is the welcome message

        if (userEmailSpan) userEmailSpan.textContent = loggedInUser.email;
        
        if (welcomeHeading && loggedInUser.fullName) {
            const firstName = loggedInUser.fullName.split(' ')[0]; // Get first name
            welcomeHeading.textContent = `Welcome, ${firstName}!`;
        } else if (welcomeHeading) {
            welcomeHeading.textContent = `Welcome, User!`; // Fallback
        }

        // Ensure logout function is available from auth.js (now global)
        if (logoutBtnUser && typeof window.logout === 'function') {
            logoutBtnUser.addEventListener('click', window.logout);
        } else if (logoutBtnUser) {
            console.error('Logout function not found for user dashboard.');
        }
    }
})();

// Fallback 'logout' definition removed as it's now globally defined in auth.js
// Let's add a check to make sure `logout` is defined before trying to attach it.
if (typeof logout === 'undefined') {
    window.logout = function() {
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    }
} 