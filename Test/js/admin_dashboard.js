// Placeholder for admin_dashboard.html specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Dashboard JS Loaded');
    const clearDataBtn = document.getElementById('clearDataBtn');

    const GUEST_EMAIL = "guest@gmail.com";
    const GUEST_PASSWORD = "guest"; // As defined in auth.js
    const GUEST_FULLNAME = "Guest User";
    const GUEST_USER_ID = "guest_default_001"; // A consistent ID for the guest user

    // Ensure AMG models have "AMG" in their string for correct image path generation
    const mercedesModels = [
        "C200", "C300", "CLA250", "S580", "S500", 
        "G63 AMG", "S63 AMG", "E200", "E350", "E63 AMG"
    ];
    const defaultCarColors = ["Black", "White", "Silver", "Grey", "Blue", "Red"];

    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (!confirm('Are you sure you want to clear all user data and reset guest cars? This cannot be undone. The admin account will remain logged in.')) {
                return;
            }

            console.log('Clearing and resetting application data...');

            // 1. Preserve current admin login (if any)
            const currentAdminUser = JSON.parse(localStorage.getItem('loggedInUser'));

            // 2. Clear relevant localStorage items
            localStorage.removeItem('userAccounts');
            localStorage.removeItem('provisionedLicensePlates');
            localStorage.removeItem('plateToRegister');
            localStorage.removeItem('newlyVerifiedCarPlate');
            // localStorage.removeItem('serviceRequests'); // DO NOT REMOVE these if they should persist past this reset
            // localStorage.removeItem('carsForSale');     // DO NOT REMOVE these if they should persist
            
            // 3. Re-initialize provisioned plates and user accounts arrays (but get existing service/sale data)
            let provisionedPlates = []; // Cleared and repopulated for guest
            let userAccounts = [];    // Cleared and repopulated for guest
            // Keep existing service requests and cars for sale, or fetch them if they should be empty IF NOT for guest? This implies they should persist.
            // For this request, we assume they should just persist as they are, and guest setup below will ADD to provisionedPlates
            // without clearing plates belonging to sold cars if their metadata is still in carsForSale.
            // This gets complex if we want to keep carsForSale but clear provisionedPlates that are NOT related to guest.
            // Safest for now: clear and repopulate guest-specific items, others persist.

            // 4. Setup Guest Account and Cars (this will re-add guest cars to the (now empty) userAccounts and provisionedPlates)
            const guestCars = [];
            let dubaiPlateCode = 'A'; 
            let plateDigitCounter = 1;

            mercedesModels.forEach((model, index) => {
                if (plateDigitCounter > 99999) plateDigitCounter = 1; 
                if (dubaiPlateCode.charCodeAt(0) > 'Z'.charCodeAt(0)) dubaiPlateCode = 'A'; 
                
                const plateDigits = String(plateDigitCounter).padStart(1, '0'); 
                const fullPlate = `${dubaiPlateCode} ${plateDigits}`.toUpperCase();
                const carColor = defaultCarColors[index % defaultCarColors.length];

                const newPlateData = {
                    fullPlate: fullPlate,
                    digits: plateDigits,
                    emirate: 'dubai',
                    prefix: dubaiPlateCode,
                    isRegistered: true, 
                    registeredUserId: GUEST_USER_ID,
                    carType: model,
                    carColor: carColor,
                    provisionedAt: new Date().toISOString()
                };
                // Check if this plate already exists from a persistent carsForSale or serviceRequest, to avoid overwriting if logic allows
                // For simplicity of this reset, we assume provisionedPlates is for active/new provisioning.
                // If a car is in carsForSale, its plate *should* ideally remain in provisionedPlates with some status.
                // Current reset clears provisionedPlates and rebuilds for guest.
                provisionedPlates.push(newPlateData);

                guestCars.push({
                    plate: fullPlate,
                    emirate: 'dubai',
                    digits: plateDigits,
                    prefix: dubaiPlateCode,
                    type: model,
                    color: carColor,
                    dateAdded: new Date().toISOString()
                });
                
                plateDigitCounter++;
                if (plateDigitCounter % 10 === 0) { 
                    dubaiPlateCode = String.fromCharCode(dubaiPlateCode.charCodeAt(0) + 1);
                }
            });

            const guestAccount = {
                userId: GUEST_USER_ID,
                fullName: GUEST_FULLNAME,
                email: GUEST_EMAIL,
                password: GUEST_PASSWORD, 
                cars: guestCars,
                role: 'guest',
                registrationDate: new Date().toISOString(),
                location: 'DUCKTECH Showroom'
            };
            userAccounts.push(guestAccount);

            localStorage.setItem('userAccounts', JSON.stringify(userAccounts)); // Only guest now
            localStorage.setItem('provisionedLicensePlates', JSON.stringify(provisionedPlates)); // Only guest car plates now

            if (currentAdminUser && currentAdminUser.role === 'admin') {
                localStorage.setItem('loggedInUser', JSON.stringify(currentAdminUser));
            }

            alert('User accounts (except guest) and their specific provisioned plates have been cleared. Guest account reset. Service Requests and Cars For Sale list persist.');
            // Optionally, refresh or update parts of the admin dashboard if they display this data.
            // For now, an alert is sufficient.
        });
    }
}); 