document.addEventListener('DOMContentLoaded', () => {
    const provisionForm = document.getElementById('provisionLicenseForm');
    const emirateSelect = document.getElementById('emirate');
    const plateCodeGroup = document.getElementById('plateCodeGroup');
    const plateCodeSelect = document.getElementById('plateCode');
    const plateNumberGroup = document.getElementById('plateNumberGroup');
    const plateNumberInput = document.getElementById('plateNumber');
    const plateDigitsInput = document.getElementById('plateDigits');
    const provisionMessage = document.getElementById('provisionMessage');

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
        plateCodeSelect.value = ''; // Clear Dubai code selection
        plateNumberInput.value = ''; // Clear Abu Dhabi number input

        if (selectedEmirate === 'dubai') {
            plateCodeGroup.style.display = 'block';
            plateCodeSelect.required = true;
        } else if (selectedEmirate === 'abudhabi') {
            plateNumberGroup.style.display = 'block';
            plateNumberInput.required = true;
        }
    });

    provisionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        provisionMessage.style.display = 'none';
        provisionMessage.className = 'message'; // Reset class

        const plateDigits = plateDigitsInput.value;
        const emirate = emirateSelect.value;
        let platePrefix = '';
        let fullPlate = '';

        if (!/^\d{1,5}$/.test(plateDigits)) { // Stricter regex for digits only
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
            // Ensure it's an integer and within range
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

        let provisionedPlates = JSON.parse(localStorage.getItem('provisionedLicensePlates')) || [];
        
        if (provisionedPlates.some(p => p.fullPlate === fullPlate)) {
            showMessage(`License plate ${fullPlate} has already been provisioned.`, 'error');
            return;
        }

        const newPlateData = {
            fullPlate: fullPlate,
            digits: plateDigits,
            emirate: emirate,
            prefix: platePrefix, // For Dubai, this is a letter; for AD, it's the number string
            isRegistered: false, 
            provisionedAt: new Date().toISOString()
        };

        provisionedPlates.push(newPlateData);
        localStorage.setItem('provisionedLicensePlates', JSON.stringify(provisionedPlates));

        showMessage(`License plate ${fullPlate} provisioned successfully!`, 'success');
        provisionForm.reset();
        plateCodeGroup.style.display = 'none';
        plateNumberGroup.style.display = 'none';
        emirateSelect.value = ''; // Reset emirate select as well
    });

    function showMessage(message, type) {
        provisionMessage.textContent = message;
        provisionMessage.className = `message ${type}`;
        provisionMessage.style.display = 'block';
    }
}); 