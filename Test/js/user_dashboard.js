// Placeholder for user_dashboard.html specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log('User Dashboard JS Loaded');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    
    const viewMyCarsOption = document.getElementById('viewMyCarsOption');
    const myCarsSection = document.getElementById('myCarsSection');
    const carsDisplayArea = document.getElementById('carsDisplayArea');
    
    const profileSettingsOption = document.getElementById('profileSettingsOption');
    const settingsSection = document.getElementById('settingsSection');
    const settingsFormArea = document.getElementById('settingsFormArea');

    // Service Request Modal Elements
    const serviceRequestModal = document.getElementById('serviceRequestModal');
    const closeServiceModalBtn = document.getElementById('closeServiceModal');
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    const modalCarInfo = document.getElementById('modalCarInfo');
    const modalLicensePlate = document.getElementById('modalLicensePlate');
    const serviceTypeSelect = document.getElementById('serviceType');
    const otherServiceGroup = document.getElementById('otherServiceGroup');
    const otherServiceDetails = document.getElementById('otherServiceDetails');
    const preferredDateInput = document.getElementById('preferredDate');
    const modalMessage = document.getElementById('modalMessage');

    // Modify Car Modal Elements
    const modifyCarModal = document.getElementById('modifyCarModal');
    const closeModifyCarModalBtn = document.getElementById('closeModifyCarModal');
    const modifyCarForm = document.getElementById('modifyCarForm');
    const modifyCarTypeDisplay = document.getElementById('modifyCarTypeDisplay');
    const modifyLicensePlateDisplay = document.getElementById('modifyLicensePlateDisplay');
    const originalCarPlateInput = document.getElementById('originalCarPlate');
    const carIndexToModifyInput = document.getElementById('carIndexToModify');
    const modifyCarColorInput = document.getElementById('modifyCarColor');
    const modifyModalMessage = document.getElementById('modifyModalMessage');

    // Sell Car Modal Elements
    const sellCarModal = document.getElementById('sellCarModal');
    const closeSellCarModalBtn = document.getElementById('closeSellCarModal');
    const sellCarForm = document.getElementById('sellCarForm');
    const sellCarTypeDisplay = document.getElementById('sellCarTypeDisplay');
    const sellLicensePlateDisplay = document.getElementById('sellLicensePlateDisplay');
    const carPlateToSellInput = document.getElementById('carPlateToSell');
    const carIndexToSellInput = document.getElementById('carIndexToSell');
    const sellingPriceInput = document.getElementById('sellingPrice');
    const sellModalMessage = document.getElementById('sellModalMessage');
    const aiAnalyzeBtnModal = document.querySelector('.ai-analyze-btn-modal'); // Assumes one such button in sell modal

    // Service Requests Elements
    const serviceRequestsSection = document.getElementById('serviceRequestsSection');
    const serviceRequestsDisplayArea = document.getElementById('serviceRequestsDisplayArea');

    if (!loggedInUser) {
        console.error('No loggedInUser found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }
    console.log('Logged In User:', loggedInUser);

    const currentUserData = userAccounts.find(user => user.userId === loggedInUser.id || user.email === loggedInUser.email);
    console.log('Current User Data from userAccounts:', currentUserData);

    function displayUserCars() {
        console.log('displayUserCars function called.');
        if (!myCarsSection || !carsDisplayArea) {
            console.error('MyCarsSection or CarsDisplayArea DOM element not found!');
            return;
        }
        myCarsSection.style.display = 'block';
        if (settingsSection) settingsSection.style.display = 'none'; 

        carsDisplayArea.innerHTML = ''; 

        if (currentUserData && currentUserData.cars && currentUserData.cars.length > 0) {
            console.log(`Found ${currentUserData.cars.length} car(s) for user.`);
            currentUserData.cars.forEach((car, index) => {
                console.log(`Processing car ${index + 1}:`, car);
                if (!car || typeof car.type !== 'string') {
                    console.error('Invalid car data or car.type is not a string:', car);
                    return; // Skip this car
                }

                const carTypeString = car.type ? car.type : 'default'; // Fallback if car.type is empty string after check
                const carModelForImage = carTypeString.toLowerCase().replace(/\s+/g, '_');
                const carImage = `assets/cars/${carModelForImage}.src`;
                
                console.log(`Attempting to load image for car type '${car.type}' (processed as '${carModelForImage}'): ${carImage}`);

                const carCardHTML = `
                    <div class="car-card" data-car-plate="${car.plate}">
                        <img id="carImage_${index}" src="${carImage}" 
                             alt="${car.type || 'Car Image'}" 
                             onerror="this.style.display='none'; console.error('Failed to load primary image: ${carImage}. Attempting fallback.'); const defaultImg = document.createElement('img'); defaultImg.src='assets/cars/default.src'; defaultImg.alt='Default Car Image'; defaultImg.style.cssText=this.style.cssText; this.parentNode.insertBefore(defaultImg, this.nextSibling); this.remove();" 
                             style="width:100%; max-width:300px; border-radius: 6px; margin-bottom:15px;">
                        <h3>${car.type || 'N/A'}</h3>
                        <p><strong>License Plate:</strong> ${car.plate}</p>
                        <p><strong>Color:</strong> ${car.color || 'N/A'}</p>
                        <p><strong>Added:</strong> ${car.dateAdded ? new Date(car.dateAdded).toLocaleDateString() : 'N/A'}</p>
                        <div class="car-card-actions">
                            <button type="button" class="btn-submit request-service-btn" data-plate="${car.plate}" data-cartype="${car.type}" style="background-color: #007bff;">Request Service</button>
                            <button type="button" class="btn-submit modify-car-btn" data-plate="${car.plate}" data-index="${index}" style="background-color: #546e7a;">Modify Details</button>
                            <button type="button" class="btn-submit sell-car-btn" data-plate="${car.plate}" data-index="${index}" data-cartype="${car.type}" style="background-color: #c62828;">Sell This Car</button>
                        </div>
                    </div>
                `;
                carsDisplayArea.insertAdjacentHTML('beforeend', carCardHTML);
            });

            // Add event listeners to new buttons
            document.querySelectorAll('.request-service-btn').forEach(button => {
                button.addEventListener('click', openServiceRequestModal);
            });
            document.querySelectorAll('.sell-car-btn').forEach(button => {
                button.addEventListener('click', openSellCarModal);
            });
            // Add event listeners to new Modify Car buttons
            document.querySelectorAll('.modify-car-btn').forEach(button => {
                button.addEventListener('click', handleModifyCarDetailsForm);
            });

        } else {
            console.log('No cars found for user or currentUserData is problematic.', currentUserData);
            carsDisplayArea.innerHTML = '<p>You currently have no cars registered in your DUCKTECH account. Add one via settings!</p>';
        }
    }

    function displaySettings() {
        if (settingsSection) settingsSection.style.display = 'block';
        if (myCarsSection) myCarsSection.style.display = 'none';

        if (!currentUserData) {
            settingsFormArea.innerHTML = '<p>Could not load user data for settings.</p>';
            return;
        }

        // Form for basic info change
        settingsFormArea.innerHTML = `
            <h4>Update Profile Information</h4>
            <form id="profileUpdateForm">
                <div class="form-group">
                    <label for="updateFullName">Full Name</label>
                    <input type="text" id="updateFullName" value="${currentUserData.fullName || ''}" required>
                </div>
                <div class="form-group">
                    <label for="updateEmail">Email (cannot be changed for this demo)</label>
                    <input type="email" id="updateEmail" value="${currentUserData.email || ''}" readonly disabled>
                </div>
                <button type="submit" class="btn-submit">Update Profile</button>
            </form>
            <hr style="margin: 30px 0; border-color: #44445a;">
            <h4>Change Password</h4>
            <form id="passwordChangeForm">
                <div class="form-group">
                    <label for="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" required>
                </div>
                <div class="form-group">
                    <label for="newPassword">New Password</label>
                    <input type="password" id="newPassword" required>
                </div>
                <div class="form-group">
                    <label for="confirmNewPassword">Confirm New Password</label>
                    <input type="password" id="confirmNewPassword" required>
                </div>
                <button type="submit" class="btn-submit">Change Password</button>
            </form>
            <hr style="margin: 30px 0; border-color: #44445a;">
            <h4>Manage Cars</h4>
            <button type="button" id="initiateAddCarBtn" class="btn-submit" style="background-color: #00695c; margin-bottom: 15px;">Register Another Provisioned Car</button>
            <div id="manageCarsArea">
                <!-- List of cars with modify options will go here (now populated by displayUserCars) -->
                <p>Your cars are listed in the "My Garage" section. Use options there to manage them.</p>
            </div>
            <div id="settingsMessage" class="message" style="display:none;"></div>
        `;

        // Add event listeners for the new forms
        const profileUpdateForm = document.getElementById('profileUpdateForm');
        if (profileUpdateForm) {
            profileUpdateForm.addEventListener('submit', handleProfileUpdate);
        }
        const passwordChangeForm = document.getElementById('passwordChangeForm');
        if (passwordChangeForm) {
            passwordChangeForm.addEventListener('submit', handlePasswordChange);
        }
        const initiateAddCarBtn = document.getElementById('initiateAddCarBtn');
        if(initiateAddCarBtn) {
            initiateAddCarBtn.addEventListener('click', () => {
                // User wants to add a new car, they need to verify its license plate first.
                // We can clear any previous plateToRegister to be safe.
                localStorage.removeItem('plateToRegister');
                window.location.href = 'verify_license.html?flow=addCar'; // Use a query param to indicate flow
            });
        }
    }

    function handleProfileUpdate(event) {
        event.preventDefault();
        const newFullName = document.getElementById('updateFullName').value;
        const settingsMessage = document.getElementById('settingsMessage');
        
        const userIndex = userAccounts.findIndex(u => u.userId === currentUserData.userId);
        if (userIndex > -1) {
            userAccounts[userIndex].fullName = newFullName;
            localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
            
            // Update loggedInUser as well for immediate welcome message update on next page load
            if(loggedInUser.id === currentUserData.userId) {
                loggedInUser.fullName = newFullName;
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            }
            showModalMessage('Profile updated successfully!', 'success', settingsMessage);
        } else {
            showModalMessage('Error updating profile.', 'error', settingsMessage);
        }
    }

    function handlePasswordChange(event) {
        event.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        const settingsMessage = document.getElementById('settingsMessage');

        if (currentUserData.password !== currentPassword) {
            showModalMessage('Current password incorrect.', 'error', settingsMessage);
            return;
        }
        if (newPassword.length < 6) {
            showModalMessage('New password must be at least 6 characters.', 'error', settingsMessage);
            return;
        }
        if (newPassword !== confirmNewPassword) {
            showModalMessage('New passwords do not match.', 'error', settingsMessage);
            return;
        }

        const userIndex = userAccounts.findIndex(u => u.userId === currentUserData.userId);
        if (userIndex > -1) {
            userAccounts[userIndex].password = newPassword; // WARNING: Storing plain text passwords!
            localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
            showModalMessage('Password changed successfully!', 'success', settingsMessage);
            document.getElementById('passwordChangeForm').reset();
        } else {
            showModalMessage('Error changing password.', 'error', settingsMessage);
        }
    }
    
    function showModalMessage(message, type, element, persist = false) { 
        if (!element) {
            // Try to find a general message display area on the dashboard if no specific modal message element is provided
            element = document.getElementById('dashboardGeneralMessage'); 
            if (!element) {
                 // Fallback to creating one if really needed, though it's better to have a dedicated spot
                console.warn("No specific message element, and no #dashboardGeneralMessage found. Message not shown prominently.")
                alert(message); // Last resort
                return;
            }
        }
        
        if(element){
            element.textContent = message;
            element.className = `message ${type}`;
            element.style.display = 'block';
            if (!persist) {
                setTimeout(() => { element.style.display = 'none'; }, 3000);
            }
        }
    }

    function handleSellCar(event) {
        const plateToSell = event.target.dataset.plate;
        const settingsMessage = document.getElementById('settingsMessage') || document.getElementById('carsDisplayArea'); // Use a relevant message area

        if (!confirm(`Are you sure you want to mark license plate ${plateToSell} as sold? This action cannot be undone from here.`)) {
            return;
        }

        // Find user and the car in userAccounts
        const userIndex = userAccounts.findIndex(u => u.userId === currentUserData.userId);
        if (userIndex === -1) {
            showModalMessage('Error: User not found.', 'error', settingsMessage);
            return;
        }
        const carIndex = userAccounts[userIndex].cars.findIndex(c => c.plate === plateToSell);
        if (carIndex === -1) {
            showModalMessage('Error: Car not found in your account.', 'error', settingsMessage);
            return;
        }

        // 1. Remove car from user's array
        const soldCar = userAccounts[userIndex].cars.splice(carIndex, 1)[0];
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts));

        // 2. Update provisionedLicensePlates: mark as not registered by this user, available again (or sold status)
        let provisionedPlates = JSON.parse(localStorage.getItem('provisionedLicensePlates')) || [];
        const provPlateIndex = provisionedPlates.findIndex(p => p.fullPlate === plateToSell);
        if (provPlateIndex > -1) {
            provisionedPlates[provPlateIndex].isRegistered = false; // Or add a new status like 'sold_by_user'
            provisionedPlates[provPlateIndex].registeredUserId = null;
            // Optionally, keep carType/Color for historical reasons or clear them
            // provisionedPlates[provPlateIndex].carType = null;
            // provisionedPlates[provPlateIndex].carColor = null;
            localStorage.setItem('provisionedLicensePlates', JSON.stringify(provisionedPlates));
        }

        showModalMessage(`Car with plate ${plateToSell} marked as sold and removed from your garage. The license plate is now available for re-provisioning/re-registration.`, 'success', settingsMessage);
        displayUserCars(); // Refresh car list
    }

    function handleModifyCarDetailsForm(event) {
        const button = event.target;
        const plate = button.dataset.plate;
        const carIndex = parseInt(button.dataset.index); // Ensure it's an integer
        const carData = currentUserData.cars[carIndex];

        if (!carData || carData.plate !== plate) {
            showModalMessage('Error: Could not find car data to modify.', 'error', modifyModalMessage);
            return;
        }

        if (modifyCarTypeDisplay) modifyCarTypeDisplay.textContent = carData.type;
        if (modifyLicensePlateDisplay) modifyLicensePlateDisplay.textContent = carData.plate;
        if (originalCarPlateInput) originalCarPlateInput.value = carData.plate;
        if (carIndexToModifyInput) carIndexToModifyInput.value = carIndex;
        if (modifyCarColorInput) modifyCarColorInput.value = carData.color;
        
        if (modifyModalMessage) modifyModalMessage.style.display = 'none';
        if (modifyCarModal) modifyCarModal.style.display = 'block';
    }

    if (viewMyCarsOption) {
        viewMyCarsOption.addEventListener('click', (e) => {
            e.preventDefault();
            displayUserCars();
        });
        // Display cars by default when dashboard loads
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            displayUserCars();
        } else {
            document.addEventListener('DOMContentLoaded', displayUserCars);
        }
    }

    if (profileSettingsOption) {
        profileSettingsOption.addEventListener('click', (e) => {
            e.preventDefault();
            displaySettings();
        });
    }
    
    // Check if URL indicates to view service requests
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('view') && urlParams.get('view') === 'service_requests') {
        displayServiceRequests();
        // Clean URL if you want
        // window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.has('newCarPlate')) {
        const newPlateVerified = localStorage.getItem('newlyVerifiedCarPlate');
        if (newPlateVerified) {
            showModalMessage(`New car with plate ${newPlateVerified} ready to be added to your profile (feature in development).`, 'success', document.getElementById('settingsMessage') || document.body, true);
            localStorage.removeItem('newlyVerifiedCarPlate');
            displaySettings(); 
        }
    } else {
        displayUserCars(); // Default view: display cars
    }

    // New function to open and populate the service request modal
    function openServiceRequestModal(event) {
        const button = event.target;
        const plate = button.dataset.plate;
        const carType = button.dataset.cartype;

        if (modalCarInfo) modalCarInfo.textContent = carType || 'N/A';
        if (modalLicensePlate) modalLicensePlate.textContent = plate || 'N/A';
        
        // Store plate and carType on the form for submission
        if (serviceRequestForm) {
            serviceRequestForm.dataset.plate = plate;
            serviceRequestForm.dataset.cartype = carType;
        }

        if (serviceRequestModal) serviceRequestModal.style.display = 'block';
        if (otherServiceGroup) otherServiceGroup.style.display = 'none'; // Reset other field
        if (serviceRequestForm) serviceRequestForm.reset(); // Reset form fields
        if (modalMessage) modalMessage.style.display = 'none'; // Hide previous messages
    }

    // Handle showing 'Other' service details textarea
    if (serviceTypeSelect) {
        serviceTypeSelect.addEventListener('change', function() {
            if (otherServiceGroup) {
                otherServiceGroup.style.display = this.value === 'Other' ? 'block' : 'none';
                if(this.value === 'Other') {
                    otherServiceDetails.required = true;
                } else {
                    otherServiceDetails.required = false;
                }
            }
        });
    }

    // Close modal functionality
    if (closeServiceModalBtn) {
        closeServiceModalBtn.onclick = function() {
            if (serviceRequestModal) serviceRequestModal.style.display = "none";
        }
    }
    // Close modal if user clicks outside of it
    window.onclick = function(event) {
        if (event.target == serviceRequestModal) {
            serviceRequestModal.style.display = "none";
        }
    }

    // Handle service request form submission
    if (serviceRequestForm) {
        serviceRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            modalMessage.style.display = 'none';
            modalMessage.className = 'message';

            const plate = this.dataset.plate;
            const carType = this.dataset.cartype;
            const serviceType = serviceTypeSelect.value;
            let details = serviceType;
            if (serviceType === 'Other') {
                details = otherServiceDetails.value.trim();
                if (!details) {
                    showModalMessage('Please specify details for "Other" service.', 'error');
                    return;
                }
            }
            const preferredDate = preferredDateInput.value;

            const requestId = `req_${Date.now()}`;
            const serviceRequest = {
                requestId,
                userId: loggedInUser.id,
                userEmail: loggedInUser.email,
                userFullName: currentUserData.fullName,
                licensePlate: plate,
                carType: carType,
                serviceType: serviceType,
                serviceDetails: details,
                preferredDate: preferredDate || null,
                requestDate: new Date().toISOString(),
                status: 'Pending Admin Approval' // Initial status
            };

            let serviceRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
            serviceRequests.push(serviceRequest);
            localStorage.setItem('serviceRequests', JSON.stringify(serviceRequests));
            console.log('USER SUBMITTED SR: serviceRequests in localStorage:', localStorage.getItem('serviceRequests')); // DEBUG

            showModalMessage('Service request submitted successfully! Pending admin approval.', 'success');
            setTimeout(() => {
                if (serviceRequestModal) serviceRequestModal.style.display = 'none';
            }, 2500);
        });
    }

    function displayServiceRequests() {
        if (!serviceRequestsSection || !serviceRequestsDisplayArea) return;

        // Hide other main sections
        if (myCarsSection) myCarsSection.style.display = 'none';
        if (settingsSection) settingsSection.style.display = 'none';
        serviceRequestsSection.style.display = 'block';

        const allServiceRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        const userServiceRequests = allServiceRequests.filter(req => req.userId === loggedInUser.id);

        serviceRequestsDisplayArea.innerHTML = ''; // Clear previous

        if (userServiceRequests.length === 0) {
            serviceRequestsDisplayArea.innerHTML = '<p style="color: #a0a0b0;">You have not made any service requests yet.</p>';
            return;
        }

        userServiceRequests.sort((a,b) => new Date(b.requestDate) - new Date(a.requestDate)); // Show newest first

        userServiceRequests.forEach(req => {
            let statusClass = req.status.toLowerCase().replace(/\s+/g, '-');
            if (statusClass === 'pending-admin-approval') statusClass = 'pending';

            const requestItemHTML = `
                <div class="service-request-item">
                    <h4>Service for: ${req.carType} (${req.licensePlate})</h4>
                    <p><strong>Service Type:</strong> ${req.serviceDetails}</p>
                    <p><strong>Requested Date:</strong> ${new Date(req.requestDate).toLocaleDateString()}</p>
                    <p><strong>Preferred Date:</strong> ${req.preferredDate ? new Date(req.preferredDate).toLocaleDateString() : 'Not specified'}</p>
                    <p><strong>Status:</strong> <span class="status ${statusClass}">${req.status}</span></p>
                </div>
            `;
            serviceRequestsDisplayArea.insertAdjacentHTML('beforeend', requestItemHTML);
        });
    }

    // Add a navigation link/button if it doesn't exist yet, or make an existing one functional
    // For example, if you have an existing placeholder link for service status in .dashboard-options:
    const serviceStatusLink = document.createElement('a'); // Or getElementById if it exists
    serviceStatusLink.href = "#";
    serviceStatusLink.textContent = "View Service Requests";
    serviceStatusLink.id = "viewServiceRequestsOption";
    serviceStatusLink.addEventListener('click', (e) => {
        e.preventDefault();
        displayServiceRequests();
    });
    // You might want to append this to .dashboard-options or make an existing placeholder work
    // Example: document.querySelector('.dashboard-options').appendChild(serviceStatusLink);
    // For now, the explore_network.html link already handles this via query param.

    // Add event listener for closing modify car modal
    if (closeModifyCarModalBtn) {
        closeModifyCarModalBtn.onclick = function() {
            if (modifyCarModal) modifyCarModal.style.display = "none";
        }
    }
    // Also close modify modal if user clicks outside (assuming window.onclick is already generic for modals)
    // If not, add: window.addEventListener('click', function(event) { if (event.target == modifyCarModal) modifyCarModal.style.display = "none"; });

    // Handle modify car form submission
    if (modifyCarForm) {
        modifyCarForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (modifyModalMessage) modifyModalMessage.style.display = 'none';

            const originalPlate = originalCarPlateInput.value;
            const carIdx = parseInt(carIndexToModifyInput.value);
            const newColor = modifyCarColorInput.value.trim();

            if (newColor === "") {
                showModalMessage('Car color cannot be empty.', 'error', modifyModalMessage);
                return;
            }

            const userIndex = userAccounts.findIndex(u => u.userId === currentUserData.userId);
            if (userIndex > -1 && userAccounts[userIndex].cars && userAccounts[userIndex].cars[carIdx] && userAccounts[userIndex].cars[carIdx].plate === originalPlate) {
                userAccounts[userIndex].cars[carIdx].color = newColor;
                localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
                
                // Also update currentUserData to reflect changes immediately if needed for other UI parts
                if (currentUserData.cars[carIdx]) {
                     currentUserData.cars[carIdx].color = newColor;
                }

                showModalMessage(`Car ${originalPlate} color updated to ${newColor}.`, 'success', modifyModalMessage);
                displayUserCars(); // Refresh car list in the main view
                setTimeout(() => {
                    if (modifyCarModal) modifyCarModal.style.display = 'none';
                }, 2000);
            } else {
                showModalMessage('Error updating car details. Car or user not found.', 'error', modifyModalMessage);
            }
        });
    }

    // New function to open and populate the Sell Car modal
    function openSellCarModal(event) {
        const button = event.target;
        const plate = button.dataset.plate;
        const carType = button.dataset.cartype;
        const carIndex = button.dataset.index;

        if (sellCarTypeDisplay) sellCarTypeDisplay.textContent = carType || 'N/A';
        if (sellLicensePlateDisplay) sellLicensePlateDisplay.textContent = plate || 'N/A';
        if (carPlateToSellInput) carPlateToSellInput.value = plate;
        if (carIndexToSellInput) carIndexToSellInput.value = carIndex;
        if (sellingPriceInput) sellingPriceInput.value = ''; // Clear previous price
        
        if (sellModalMessage) sellModalMessage.style.display = 'none';
        if (sellCarModal) sellCarModal.style.display = 'block';
    }

    // Add event listener for closing sell car modal
    if (closeSellCarModalBtn) {
        closeSellCarModalBtn.onclick = function() {
            if (sellCarModal) sellCarModal.style.display = "none";
        }
    }

    // AI Analyze button inside the Sell Car Modal
    if (aiAnalyzeBtnModal) {
        aiAnalyzeBtnModal.addEventListener('click', (e) => {
            const plate = carPlateToSellInput.value; // Get plate from the hidden input in sell modal
            alert(`AI Market Value Analysis for plate ${plate} is coming soon!`);
        });
    }

    // Replace the existing handleSellCar function with logic for the modal
    function handleSellCar(event) { // This function is now the SUBMIT HANDLER for the SELL CAR MODAL form
        event.preventDefault(); // Prevent default form submission
        if (sellModalMessage) sellModalMessage.style.display = 'none';

        const plateToSell = carPlateToSellInput.value;
        const carIdx = parseInt(carIndexToSellInput.value);
        const price = parseFloat(sellingPriceInput.value);

        if (isNaN(price) || price <= 0) {
            showModalMessage('Please enter a valid selling price.', 'error', sellModalMessage);
            return;
        }

        const userIndex = userAccounts.findIndex(u => u.userId === currentUserData.userId);
        if (userIndex === -1 || !userAccounts[userIndex].cars || !userAccounts[userIndex].cars[carIdx] || userAccounts[userIndex].cars[carIdx].plate !== plateToSell) {
            showModalMessage('Error: Car or user data not found. Cannot list for sale.', 'error', sellModalMessage);
            return;
        }

        // 1. Update car object with sale status and price
        const carToList = userAccounts[userIndex].cars[carIdx];
        carToList.status = 'For Sale';
        carToList.sellingPrice = price;
        carToList.listedDate = new Date().toISOString();
        
        // 2. Move car to a new 'carsForSale' list in localStorage (or update status in provisionedPlates)
        let carsForSale = JSON.parse(localStorage.getItem('carsForSale')) || [];
        // Prevent duplicates if re-listing, update existing if found
        const existingSaleIndex = carsForSale.findIndex(c => c.plate === carToList.plate);
        if (existingSaleIndex > -1) {
            carsForSale[existingSaleIndex] = { ...carsForSale[existingSaleIndex], ...carToList, sellerId: currentUserData.userId, sellerEmail: currentUserData.email }; 
        } else {
            carsForSale.push({ ...carToList, sellerId: currentUserData.userId, sellerEmail: currentUserData.email });
        }
        localStorage.setItem('carsForSale', JSON.stringify(carsForSale));

        // 3. Remove car from user's active garage
        userAccounts[userIndex].cars.splice(carIdx, 1);
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts));

        // 4. The provisionedPlate remains linked to the original registration, but is now part of a car being sold.
        // No change to provisionedPlates needed here unless you want to mark it as 'ForSale' there too.

        showModalMessage(`Car ${plateToSell} listed for sale at AED ${price.toLocaleString()}. Redirecting to Explore...`, 'success', sellModalMessage);
        
        setTimeout(() => {
            if (sellCarModal) sellCarModal.style.display = 'none';
            window.location.href = 'explore_network.html'; // Redirect to new explore page
        }, 2500);
    }

    // Attach the new handler to the sellCarForm
    if (sellCarForm) {
        sellCarForm.addEventListener('submit', handleSellCar);
    }

    // Generic modal closing: consolidate or ensure no redeclaration
    // Check if window.onclick is already assigned, if so, this might be tricky without careful management.
    // For simplicity, let's assume this is the primary place we set it or we ensure it's extensible.
    
    // Original window.onclick for serviceRequestModal (if it was set like this before)
    // window.onclick = function(event) {
    //     if (event.target == serviceRequestModal) {
    //         serviceRequestModal.style.display = "none";
    //     }
    // };

    // Consolidate window.onclick for all modals
    window.onclick = function(event) {
        if (event.target == serviceRequestModal) {
            if (serviceRequestModal) serviceRequestModal.style.display = "none";
        }
        if (event.target == modifyCarModal) {
            if (modifyCarModal) modifyCarModal.style.display = "none";
        }
        if (event.target == sellCarModal) {
            if (sellCarModal) sellCarModal.style.display = "none";
        }
    };
}); 