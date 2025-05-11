document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Service Requests JS Loaded');

    const requestsTableContainer = document.getElementById('requestsTableContainer');
    const statusFilter = document.getElementById('statusFilter');

    function renderServiceRequests(filter = 'Pending Admin Approval') {
        console.log(`ADMIN PAGE LOAD/RENDER (filter: ${filter}): Reading serviceRequests from localStorage. Current raw value:`, localStorage.getItem('serviceRequests')); // DEBUG
        if (!requestsTableContainer) {
            console.error('requestsTableContainer not found');
            return;
        }

        let allServiceRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        console.log('ADMIN PAGE LOAD/RENDER: Parsed allServiceRequests:', JSON.parse(JSON.stringify(allServiceRequests))); // DEBUG (deep copy for logging)
        let filteredRequests = allServiceRequests;

        if (filter !== 'all') {
            filteredRequests = allServiceRequests.filter(req => req.status === filter);
        }

        if (filteredRequests.length === 0) {
            requestsTableContainer.innerHTML = '<p class="no-requests">No service requests found matching the current filter.</p>';
            return;
        }

        filteredRequests.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

        let tableHTML = '<table class="requests-table"><thead><tr>' +
                        '<th>Req. ID</th><th>User</th><th>Car Plate</th><th>Service</th>' +
                        '<th>Requested</th><th>Preferred Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>';

        filteredRequests.forEach(req => {
            let statusClass = '';
            if (req.status) { // Ensure req.status is not null or undefined
                statusClass = req.status.toLowerCase().split(' ').join('-');
                if (statusClass === 'pending-admin-approval') statusClass = 'pending';
                else if (statusClass === 'approved-by-admin') statusClass = 'approved';
                else if (statusClass === 'rejected-by-admin') statusClass = 'rejected';
                else if (statusClass === 'in-progress') statusClass = 'in-progress';
                else if (statusClass === 'completed') statusClass = 'completed';
            }

            tableHTML += `
                <tr>
                    <td>${req.requestId ? req.requestId.slice(-6) : 'N/A'}</td>
                    <td>${req.userFullName || req.userEmail || 'N/A'}</td>
                    <td>${req.licensePlate || 'N/A'}</td>
                    <td>${req.serviceDetails || 'N/A'}</td>
                    <td>${req.requestDate ? new Date(req.requestDate).toLocaleDateString() : 'N/A'}</td>
                    <td>${req.preferredDate ? new Date(req.preferredDate).toLocaleDateString() : 'N/A'}</td>
                    <td><span class="status-badge status-${statusClass}">${req.status || 'N/A'}</span></td>
                    <td>`;
            
            if (req.status === 'Pending Admin Approval') {
                tableHTML += `<button class="btn-action btn-approve" data-requestid="${req.requestId}">Approve</button>
                              <button class="btn-action btn-reject" data-requestid="${req.requestId}">Reject</button>`;
            } else if (req.status === 'Approved by Admin') {
                tableHTML += `<button class="btn-action btn-complete" data-requestid="${req.requestId}" data-newstatus="In Progress">Mark In Progress</button>`;
            } else if (req.status === 'In Progress') {
                tableHTML += `<button class="btn-action btn-complete" data-requestid="${req.requestId}" data-newstatus="Completed">Mark Completed</button>`;
            }
            tableHTML += '</td></tr>';
        });

        tableHTML += '</tbody></table>';
        requestsTableContainer.innerHTML = tableHTML;

        // Add event listeners to action buttons
        attachActionListeners();
    }

    function attachActionListeners() {
        document.querySelectorAll('.requests-table .btn-action').forEach(button => {
            button.addEventListener('click', handleRequestAction);
        });
    }

    function handleRequestAction(event) {
        const requestId = event.target.dataset.requestid;
        let newStatus = '';

        if (event.target.classList.contains('btn-approve')) {
            newStatus = 'Approved by Admin';
        } else if (event.target.classList.contains('btn-reject')) {
            newStatus = 'Rejected by Admin';
        } else if (event.target.classList.contains('btn-complete')) {
            newStatus = event.target.dataset.newstatus; // 'In Progress' or 'Completed'
        }

        if (requestId && newStatus) {
            updateRequestStatus(requestId, newStatus);
        } else {
            console.error('Action button missing requestId or newStatus interpretation failed.', event.target.dataset);
        }
    }

    function updateRequestStatus(requestId, newStatus) {
        let allServiceRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        const requestIndex = allServiceRequests.findIndex(req => req.requestId === requestId);

        if (requestIndex > -1) {
            allServiceRequests[requestIndex].status = newStatus;
            allServiceRequests[requestIndex].lastUpdated = new Date().toISOString(); // Add a timestamp for the update
            localStorage.setItem('serviceRequests', JSON.stringify(allServiceRequests));
            if (statusFilter) { // Check if statusFilter exists
                renderServiceRequests(statusFilter.value);
            } else {
                renderServiceRequests(); // Call with default if filter is not available
            }
            alert(`Request ${requestId.slice(-6)} status updated to: ${newStatus}`);
        } else {
            console.error(`Could not find service request with ID: ${requestId} to update.`);
            alert('Error: Could not find the service request to update.');
        }
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            renderServiceRequests(this.value);
        });
    } else {
        console.error('statusFilter element not found');
    }

    // Initial render
    renderServiceRequests(statusFilter ? statusFilter.value : 'Pending Admin Approval');
}); 