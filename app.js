// --- ULTIMATE FEATURE-COMPLETE SCRIPT ---
const contractAddress = "0xE6A432d35563CB3734fA893DD3EA8286684084c6";
const contractABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "certificateId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "studentName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "courseName", "type": "string" } ], "name": "CertificateIssued", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "certificateId", "type": "bytes32" } ], "name": "CertificateRevoked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "wallet", "type": "address" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "string", "name": "institutionId", "type": "string" } ], "name": "InstitutionRegistered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "wallet", "type": "address" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "string", "name": "institutionId", "type": "string" } ], "name": "InstitutionRequestSubmitted", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_wallet", "type": "address" } ], "name": "approveInstitution", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "certificateIdList", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "certificateLookup", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "certificates", "outputs": [ { "internalType": "string", "name": "studentName", "type": "string" }, { "internalType": "string", "name": "courseName", "type": "string" }, { "internalType": "string", "name": "marks", "type": "string" }, { "internalType": "string", "name": "issuingInstitution", "type": "string" }, { "internalType": "uint256", "name": "issueDate", "type": "uint256" }, { "internalType": "bool", "name": "isRevoked", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_studentName", "type": "string" }, { "internalType": "string", "name": "_courseName", "type": "string" } ], "name": "findCertificate", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCertificateCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "certificateId", "type": "bytes32" } ], "name": "getCertificateDetails", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPendingRequests", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "institutions", "outputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "institutionId", "type": "string" }, { "internalType": "bool", "name": "isRegistered", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "isAuthorized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string[]", "name": "_studentNames", "type": "string[]" }, { "internalType": "string[]", "name": "_courseNames", "type": "string[]" }, { "internalType": "string[]", "name": "_marks", "type": "string[]" } ], "name": "issueCertificateBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "pendingRequestList", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "pendingRequests", "outputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "institutionId", "type": "string" }, { "internalType": "bool", "name": "exists", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_id", "type": "string" } ], "name": "requestRegistration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "certificateId", "type": "bytes32" } ], "name": "revokeCertificate", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
const webSocketRpcUrl = "https://sepolia.infura.io/v3/5cb8eb30eaae446c81ab26a22e968dda"; // <-- PASTE WSS URL HERE

window.addEventListener('load', async () => {
    let provider, signer, contract, owner, currentUserAddress;
    
    // DOM Elements
    const connectButton = document.getElementById('connectButton');
    const statusDiv = document.getElementById('status');
    const blockNumberDiv = document.getElementById('blockNumber');
    
    const adminPanel = document.getElementById('adminPanel');
    const issuePanel = document.getElementById('issuePanel');
    const registerPanel = document.getElementById('registerPanel');
    
    const issueForm = document.getElementById('issueForm');
    const authForm = document.getElementById('authForm');
    const revokeForm = document.getElementById('revokeForm');
    const lookupForm = document.getElementById('lookupForm');
    const lookupResults = document.getElementById('lookupResults');
    const requestForm = document.getElementById('requestForm');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const batchList = document.getElementById('batch-list');
    const pendingRequestsList = document.getElementById('pending-requests-list');

    const issueTabButton = document.getElementById('issue-tab');
    const adminTabButton = document.getElementById('admin-tab');
    const registerTabButton = document.getElementById('register-tab');
    
    // Added back the list button and list
    const listButton = document.getElementById('listButton');
    const certificateList = document.getElementById('certificateList');

    async function updateConnectionStatus() {
        if (typeof window.ethereum === 'undefined') {
            statusDiv.innerHTML = "MetaMask not detected. Please install it.";
            return;
        }
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            currentUserAddress = await signer.getAddress();
            owner = await contract.owner();
            
            statusDiv.innerHTML = `Connected: ${currentUserAddress}`;
            connectButton.textContent = "Connected";
            await updateBlockNumber();
            
            const isOwner = currentUserAddress.toLowerCase() === owner.toLowerCase();
            const isAuthorized = await contract.isAuthorized(currentUserAddress);
            const request = await contract.pendingRequests(currentUserAddress);
            const hasPendingRequest = request.exists;

            // --- DYNAMIC UI LOGIC ---
            if (isOwner) {
                adminTabButton.style.display = 'block';
                await loadPendingRequests(); // Load requests for owner
            }
            if (isAuthorized) {
                issueTabButton.style.display = 'block';
            }
            if (!isAuthorized && !isOwner && !hasPendingRequest) {
                registerTabButton.style.display = 'block';
            }

        } catch (error) {
            statusDiv.innerHTML = "Connection failed. Please connect to MetaMask.";
            if(adminTabButton) adminTabButton.style.display = 'none';
            if(issueTabButton) issueTabButton.style.display = 'none';
            if(registerTabButton) registerTabButton.style.display = 'none';
        }
    }

    async function updateBlockNumber() {
        if (provider) blockNumberDiv.innerHTML = `Current Block: #${await provider.getBlockNumber()}`;
    }

    connectButton.addEventListener('click', updateConnectionStatus);

    // --- TAB SWITCHING LOGIC ---
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tabContents.forEach(content => {
                content.style.display = content.id === tab.dataset.tab ? 'block' : 'none';
            });
        });
    });

    // --- FORM SUBMISSION LOGIC ---
    addStudentBtn.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'batch-student-row';
        row.innerHTML = `
            <input type="text" class="batchStudentName" placeholder="Student Name" required>
            <input type="text" class="batchCourseName" placeholder="Course Name" required>
            <input type="text" class="batchMarks" placeholder="Marks" required>
        `;
        batchList.appendChild(row);
    });

    issueForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentNames = [...document.querySelectorAll('.batchStudentName')].map(input => input.value);
        const courseNames = [...document.querySelectorAll('.batchCourseName')].map(input => input.value);
        const marks = [...document.querySelectorAll('.batchMarks')].map(input => input.value);

        if (studentNames.length === 0) return alert("Please add at least one student to the batch.");
        
        try {
            statusDiv.innerHTML = `Issuing batch of ${studentNames.length} certificates...`;
            const tx = await contract.issueCertificateBatch(studentNames, courseNames, marks);
            await tx.wait();
            statusDiv.innerHTML = `Successfully issued ${studentNames.length} certificates!`;
            batchList.innerHTML = '';
        } catch (error) { statusDiv.innerHTML = `Error: ${error.reason || "Transaction failed."}`; }
    });

    requestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('requestName').value;
        const id = document.getElementById('requestId').value;
        try {
            statusDiv.innerHTML = `Submitting registration request...`;
            const tx = await contract.requestRegistration(name, id);
            await tx.wait();
            statusDiv.innerHTML = `Request submitted! The owner will review it.`;
            requestForm.reset();
            registerTabButton.style.display = 'none'; // Hide form after submission
        } catch (error) { statusDiv.innerHTML = `Error: ${error.reason || "Failed to submit request."}`; }
    });

    async function loadPendingRequests() {
        pendingRequestsList.innerHTML = '';
        const addresses = await contract.getPendingRequests();
        if (addresses.length === 0) {
            pendingRequestsList.innerHTML = '<p>No pending requests.</p>';
            return;
        }
        
        for (const addr of addresses) {
            const request = await contract.pendingRequests(addr);
            if (!request.exists) continue; // Skip if already processed
            
            const requestDiv = document.createElement('div');
            requestDiv.className = 'pending-request';
            requestDiv.innerHTML = `
                <div>
                    <p><strong>Name:</strong> ${request.name} (ID: ${request.institutionId})</p>
                    <p><strong>Wallet:</strong> ${addr}</p>
                </div>
                <button class="approve-btn" data-address="${addr}">Approve</button>
            `;
            pendingRequestsList.appendChild(requestDiv);
        }
        
        document.querySelectorAll('.approve-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const addrToApprove = e.target.dataset.address;
                try {
                    statusDiv.innerHTML = `Approving ${addrToApprove}...`;
                    const tx = await contract.approveInstitution(addrToApprove);
                    await tx.wait();
                    statusDiv.innerHTML = `Successfully approved ${addrToApprove}!`;
                    loadPendingRequests(); // Refresh the list
                } catch (error) { statusDiv.innerHTML = `Error: ${error.reason || "Failed to approve."}`; }
            });
        });
    }

    revokeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const revokeCertId = document.getElementById('revokeCertId').value;
        try {
            statusDiv.innerHTML = `Revoking certificate ${revokeCertId}...`;
            const tx = await contract.revokeCertificate(revokeCertId);
            await tx.wait();
            statusDiv.innerHTML = `Successfully revoked certificate!`;
            revokeForm.reset();
        } catch (error) { statusDiv.innerHTML = `Error: ${error.reason || "Failed to revoke."}`; }
    });

    lookupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentName = document.getElementById('lookupStudentName').value;
        const courseName = document.getElementById('lookupCourseName').value;
        lookupResults.innerHTML = '<p>Searching...</p>';
        try {
            const certId = await contract.findCertificate(studentName, courseName);
            if (certId.toString() === "0x0000000000000000000000000000000000000000000000000000000000000000") {
                lookupResults.innerHTML = `<p class="error">❌ No certificate found for this student and course.</p>`;
                return;
            }
            
            const details = await contract.getCertificateDetails(certId);
            const date = new Date(details[4] * 1000).toLocaleDateString();
            const revokedStatus = details[5] ? '<strong class="error">(REVOKED)</strong>' : '<strong class="success">(VALID)</strong>';

            lookupResults.innerHTML = `
                <div class="certificate-details">
                    <h3>Verification Result: ${revokedStatus}</h3>
                    <p><strong>Student:</strong> ${details[0]}</p>
                    <p><strong>Course:</strong> ${details[1]}</p>
                    <p><strong>Marks:</strong> ${details[2]}</p>
                    <p><strong>Institution:</strong> ${details[3]}</p>
                    <p><strong>Issued On:</strong> ${date}</p>
                    <p><strong>Certificate ID:</strong> ${certId}</P>
                </div>`;
        } catch (error) {
            lookupResults.innerHTML = `<p class="error">❌ Error during lookup.</p>`;
        }
    });

    // --- "SHOW ALL CERTIFICATES" LOGIC (RESTORED) ---
    listButton.addEventListener('click', async () => {
        if (!contract) { return alert("Please connect wallet first."); }
        certificateList.innerHTML = '<li>Loading...</li>';
        try {
            const count = await contract.getCertificateCount();
            certificateList.innerHTML = '';
            logMessage(`---\n🔍 Found ${count} total certificates.`);
            if (count == 0) {
                certificateList.innerHTML = "<li>No certificates have been issued yet.</li>";
                return;
            }
            for (let i = 0; i < count; i++) {
                const certId = await contract.certificateIdList(i);
                const li = document.createElement('li');
                li.textContent = certId;
                li.style.cursor = "pointer";
                
                li.addEventListener('click', async () => {
                    try {
                        const details = await contract.getCertificateDetails(certId);
                        const date = new Date(details[4] * 1000).toLocaleString();
                        const revokedStatus = details[5] ? "Yes" : "No";
                        alert(
                            `Certificate Details:\n\n` +
                            `ID: ${certId}\n` +
                            `Student: ${details[0]}\n` +
                            `Course: ${details[1]}\n` +
                            `Marks: ${details[2]}\n` +
                            `Institution: ${details[3]}\n` +
                            `Issued on: ${date}\n` +
                            `Revoked: ${revokedStatus}`
                        );
                    } catch (error) {
                        alert("Could not fetch certificate details.");
                    }
                });
                certificateList.appendChild(li);
            }
        } catch (error) {
            statusDiv.innerHTML = "Error fetching certificate list.";
        }
    });
});

// --- FINAL - ADVANCED REAL-TIME LOGS SECTION ---
const logContainer = document.getElementById('logContainer');
function logMessage(message) {
    if (!logContainer) return;
    const logEntry = document.createElement('p');
    logEntry.innerHTML = message.replace(/\n/g, '<br>');
    logContainer.prepend(logEntry);
}

try {
    const wsProvider = new ethers.providers.WebSocketProvider(webSocketRpcUrl);
    const wsContract = new ethers.Contract(contractAddress, contractABI, wsProvider);
    logMessage("📡 Listening for blockchain events...");

    wsContract.on("InstitutionRegistered", (wallet, name, institutionId) => {
        logMessage(`---\n⭐ Institution Registered!\n   Name: ${name}\n   ID: ${institutionId}\n   Wallet: ${wallet}`);
    });
    wsContract.on("CertificateIssued", (certificateId, studentName, courseName) => {
        logMessage(`---\n📄 Certificate Issued!\n   Student: ${studentName}\n   Course: ${courseName}`);
    });
    wsContract.on("CertificateRevoked", (certificateId) => {
        logMessage(`---\n🚫 Certificate Revoked!\n   ID: ${certificateId.substring(0,14)}...`);
    });

    wsProvider.on("block", async (blockNumber) => {
        logMessage(`---\n✅ New Block Mined: #${blockNumber}`);
        const mainBlockNumberDiv = document.getElementById('blockNumber');
        if(mainBlockNumberDiv) mainBlockNumberDiv.innerHTML = `Current Block: #${blockNumber}`;
    });

} catch (error) {
    console.error("WebSocket connection failed:", error);
    logMessage("🔌 WebSocket connection failed.");
}
