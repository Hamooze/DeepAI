document.addEventListener('DOMContentLoaded', () => {
    const verifyForm = document.getElementById('verifyLicenseForm');
    const emirateSelect = document.getElementById('emirateVerify');
    const plateCodeGroup = document.getElementById('plateCodeGroupVerify');
    const plateCodeSelect = document.getElementById('plateCodeVerify');
    const plateNumberGroup = document.getElementById('plateNumberGroupVerify');
    const plateNumberInput = document.getElementById('plateNumberVerify');
    const plateDigitsInput = document.getElementById('plateDigitsVerify');
    const verifyMessage = document.getElementById('verifyMessage');

    // Populate Dubai Plate Codes (A-Z)
    for (let i = 65; i <= 90; i++) { // ASCII A-Z
        const letter = String.fromCharCode(i);
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter;
        plateCodeSelect.appendChild(option);
    }

    emirateSelect.addEventListener('change', function() {
        const selectedEmirate = this.value;
        plateCodeGroup.style.display = 'none';
        plateNumberGroup.style.display = 'none';
        plateCodeSelect.required = false;
        plateNumberInput.required = false;
        plateCodeSelect.value = ''; 
        plateNumberInput.value = ''; 

        if (selectedEmirate === 'dubai') {
            plateCodeGroup.style.display = 'block';
            plateCodeSelect.required = true;
        } else if (selectedEmirate === 'abudhabi') {
            plateNumberGroup.style.display = 'block';
            plateNumberInput.required = true;
        }
    });

    verifyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        verifyMessage.style.display = 'none';
        verifyMessage.className = 'message'; 

        const plateDigits = plateDigitsInput.value;
        const emirate = emirateSelect.value;
        let platePrefix = '';
        let fullPlate = '';

        if (!/^\d{1,5}$/.test(plateDigits)) {
            showMessage('Plate digits must be 1 to 5 numbers.', 'error');
            return;
        }

        if (emirate === 'dubai') {
            platePrefix = plateCodeSelect.value;
            if (!platePrefix) {
                showMessage('Please select a plate code for Dubai.', 'error');
                return;
            }
            fullPlate = `${platePrefix} ${plateDigits}`.toUpperCase();
        } else if (emirate === 'abudhabi') {
            platePrefix = plateNumberInput.value;
            const adPlateNum = parseInt(platePrefix, 10);
            if (isNaN(adPlateNum) || adPlateNum < 1 || adPlateNum > 50) {
                showMessage('Plate number for Abu Dhabi must be an integer between 1 and 50.', 'error');
                return;
            }
            fullPlate = `${adPlateNum} ${plateDigits}`.toUpperCase(); 
        } else {
            showMessage('Please select an Emirate.', 'error');
            return;
        }

        const provisionedPlates = JSON.parse(localStorage.getItem('provisionedLicensePlates')) || [];
        const matchedPlate = provisionedPlates.find(p => p.fullPlate === fullPlate);
        const urlParams = new URLSearchParams(window.location.search);
        const isAddingCarFlow = urlParams.get('flow') === 'addCar';

        if (matchedPlate) {
            if (matchedPlate.isRegistered) {
                showMessage(`License plate ${fullPlate} has already been registered to an account.`, 'error');
            } else {
                showMessage(`License plate ${fullPlate} verified! Proceeding...`, 'success');
                localStorage.setItem('plateToRegister', JSON.stringify(matchedPlate)); 
                
                if (isAddingCarFlow) {
                    // Store it specially for the add car flow to be picked up by user_dashboard.js
                    localStorage.setItem('newlyVerifiedCarPlate', matchedPlate.fullPlate);
                    // Redirect back to user dashboard, specifically to settings/car management section
                    window.location.href = 'user_dashboard.html?newCarPlate=' + encodeURIComponent(matchedPlate.fullPlate);
                } else {
                    // Standard new user registration flow
                    window.location.href = 'user_registration_details.html'; 
                }
            }
        } else {
            showMessage(`License plate ${fullPlate} is not recognized or not yet provisioned by an admin.`, 'error');
        }
    });

    function showMessage(message, type) {
        verifyMessage.textContent = message;
        verifyMessage.className = `message ${type}`;
        verifyMessage.style.display = 'block';
    }
}); 