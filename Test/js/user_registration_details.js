document.addEventListener('DOMContentLoaded', () => {
    const userDetailsForm = document.getElementById('userDetailsForm');
    const displayLicensePlate = document.getElementById('displayLicensePlate');
    const registrationMessage = document.getElementById('registrationMessage');

    // Load the verified license plate data
    const plateToRegisterData = JSON.parse(localStorage.getItem('plateToRegister'));

    if (!plateToRegisterData || plateToRegisterData.isRegistered) {
        // If no plate data found, or if somehow a registered plate got here, redirect
        showMessage('Invalid registration attempt or plate already registered. Redirecting...', 'error');
        setTimeout(() => {
            window.location.href = 'verify_license.html';
        }, 3000);
        return;
    }

    if (displayLicensePlate) {
        displayLicensePlate.textContent = plateToRegisterData.fullPlate;
    }

    userDetailsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        registrationMessage.style.display = 'none';
        registrationMessage.className = 'message';

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const carType = document.getElementById('carType').value;
        const carColor = document.getElementById('carColor').value;
        const location = document.getElementById('location').value;

        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }

        if (password.length < 6) { // Basic password length check
            showMessage('Password must be at least 6 characters long.', 'error');
            return;
        }

        // Simulate user ID generation (in a real app, backend would do this)
        const userId = 'usr_' + plateToRegisterData.digits + '_' + Date.now().toString().slice(-3);

        const firstCar = {
            plate: plateToRegisterData.fullPlate,
            emirate: plateToRegisterData.emirate,
            digits: plateToRegisterData.digits,
            prefix: plateToRegisterData.prefix,
            type: carType,      // From the form
            color: carColor,    // From the form
            dateAdded: new Date().toISOString()
        };

        const newUser = {
            userId: userId,
            fullName: fullName,
            email: email,
            password: password, // WARNING: Plain text
            cars: [firstCar], // Initialize with the first car as an array
            role: 'user',
            registrationDate: new Date().toISOString(),
            location: location // Location of living is user-specific, not car-specific
        };

        // --- Storing User Data & Updating License Plate Status (localStorage simulation) ---
        let users = JSON.parse(localStorage.getItem('userAccounts')) || [];
        
        if (users.some(user => user.email === email)) {
            showMessage('This email address is already registered.', 'error');
            return;
        }
        
        users.push(newUser);
        localStorage.setItem('userAccounts', JSON.stringify(users));

        // Mark the license plate as registered
        let provisionedPlates = JSON.parse(localStorage.getItem('provisionedLicensePlates')) || [];
        const plateIndex = provisionedPlates.findIndex(p => p.fullPlate === plateToRegisterData.fullPlate);
        if (plateIndex > -1) {
            provisionedPlates[plateIndex].isRegistered = true;
            provisionedPlates[plateIndex].registeredUserId = userId; 
            provisionedPlates[plateIndex].carType = firstCar.type; // Optionally store car type on provisioned plate too
            provisionedPlates[plateIndex].carColor = firstCar.color; // Optionally store car color
            localStorage.setItem('provisionedLicensePlates', JSON.stringify(provisionedPlates));
        } else {
            showMessage('Error: Could not find the provisioned plate to update. Please contact support.', 'error');
            return;
        }

        // Clear the temporary plateToRegister from localStorage
        localStorage.removeItem('plateToRegister');

        showMessage('Registration successful! You can now log in.', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });

    function showMessage(message, type) {
        registrationMessage.textContent = message;
        registrationMessage.className = `message ${type}`;
        registrationMessage.style.display = 'block';
    }
}); 