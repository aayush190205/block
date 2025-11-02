// --- FINAL BLOCK EXPLORER SCRIPT (Card View) ---
window.addEventListener('load', async () => {
    // --- Your Contract Details ---
    const contractAddress = "0x1B340615A89381AeFBb4581Cf0f57bD5477Ac17e";
    const contractABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "certificateId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "studentName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "courseName", "type": "string" } ], "name": "CertificateIssued", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "certificateId", "type": "bytes32" } ], "name": "CertificateRevoked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "wallet", "type": "address" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "string", "name": "institutionId", "type": "string" } ], "name": "InstitutionRegistered", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "certificateIdList", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "certificateLookup", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "certificates", "outputs": [ { "internalType": "string", "name": "studentName", "type": "string" }, { "internalType": "string", "name": "courseName", "type": "string" }, { "internalType": "string", "name": "marks", "type": "string" }, { "internalType": "string", "name": "issuingInstitution", "type": "string" }, { "internalType": "uint256", "name": "issueDate", "type": "uint256" }, { "internalType": "bool", "name": "isRevoked", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_studentName", "type": "string" }, { "internalType": "string", "name": "_courseName", "type": "string" } ], "name": "findCertificate", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCertificateCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "certificateId", "type": "bytes32" } ], "name": "getCertificateDetails", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "institutions", "outputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "institutionId", "type": "string" }, { "internalType": "bool", "name": "isRegistered", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "isAuthorized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_studentName", "type": "string" }, { "internalType": "string", "name": "_courseName", "type": "string" }, { "internalType": "string", "name": "_marks", "type": "string" } ], "name": "issueCertificate", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_wallet", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_id", "type": "string" } ], "name": "registerInstitution", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "certificateId", "type": "bytes32" } ], "name": "revokeCertificate", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
    const rpcUrl = "https://sepolia.infura.io/v3/5cb8eb30eaae446c81ab26a22e968dda"; 
    
    const blocksContainer = document.getElementById('blocks-container');
    const filterToggle = document.getElementById('filter-toggle');
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    let allBlocksCache = [];
    let myBlocksCache = [];

    const renderBlock = (block) => {
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block-card'; // Use the new .block-card style
        const myTxs = block.myTransactions || [];

        let txData = '';
        if (myTxs.length > 0) {
            txData += `[My Transactions: ${myTxs.length}]\n\n`;
            myTxs.forEach(event => {
                const args = event.args;
                if (event.event === 'CertificateIssued') {
                    txData += `✅ ISSUED:\n  Student: ${args.studentName}\n  Course: ${args.courseName}\n`;
                } else if (event.event === 'CertificateRevoked') {
                    txData += `🚫 REVOKED:\n  ID: ${args.certificateId.substring(0, 14)}...\n`;
                }
            });
        } else {
            txData = `[No certificate transactions in this block]\n\nTotal Txs: ${block.transactions.length}`;
        }
        
        blockDiv.innerHTML = `
            <div class="chain-link"></div>
            <form class="block-card-form">
                <div>
                    <label>Block:</label>
                    <input type="text" value="#${block.number}" disabled>
                </div>
                <div>
                    <label>Nonce:</label>
                    <input type="text" value="${block.nonce}" disabled>
                </div>
                <div>
                    <label>Data (Block Body):</label>
                    <textarea disabled>${txData}</textarea>
                </div>
                <div>
                    <label>Prev (Parent Hash):</label>
                    <input type="text" value="${block.parentHash}" disabled>
                </div>
                <div>
                    <label>Hash:</label>
                    <input type="text" value="${block.hash}" disabled>
                </div>
            </form>
            <div class="block-field">
                <span class="field-label">Merkle Root:</span>
                <span class="field-value">${block.transactionsRoot}</span>
            </div>
        `;
        return blockDiv;
    };
    
    const displayBlocks = (blocks) => {
        blocksContainer.innerHTML = '';
        if (blocks.length === 0) {
            blocksContainer.innerHTML = '<p>No relevant blocks found.</p>';
            return;
        }
        blocks.forEach(block => {
            blocksContainer.prepend(renderBlock(block));
        });
    };

    const fetchData = async () => {
        blocksContainer.innerHTML = '<p>Fetching data, this will be fast...</p>';
        try {
            const issuedFilter = contract.filters.CertificateIssued();
            const revokedFilter = contract.filters.CertificateRevoked();
            const [issuedEvents, revokedEvents] = await Promise.all([
                contract.queryFilter(issuedFilter, 0, 'latest'),
                contract.queryFilter(revokedFilter, 0, 'latest')
            ]);
            const allEvents = [...issuedEvents, ...revokedEvents];
            
            if (allEvents.length === 0) {
                blocksContainer.innerHTML = '<p>No certificate transactions found. Displaying latest blocks.</p>';
            }

            const myBlockNumbers = [...new Set(allEvents.map(event => event.blockNumber))];
            const myBlockPromises = myBlockNumbers.map(blockNumber => provider.getBlock(blockNumber));
            myBlocksCache = await Promise.all(myBlockPromises);
            myBlocksCache.forEach(block => {
                block.myTransactions = allEvents.filter(e => e.blockNumber === block.number);
            });
            myBlocksCache.sort((a, b) => a.number - b.number);

            const latestBlockNumber = await provider.getBlockNumber();
            const allBlockPromises = [];
            for (let i = 0; i < 15 && (latestBlockNumber - i >= 0); i++) {
                allBlockPromises.push(provider.getBlock(latestBlockNumber - i));
            }
            allBlocksCache = await Promise.all(allBlockPromises);
            allBlocksCache.sort((a, b) => a.number - b.number);
            
            displayBlocks(allBlocksCache);

        } catch (error) {
            blocksContainer.innerHTML = '<p>Could not fetch blocks. Please check the contract details.</p>';
            console.error("Error fetching blocks:", error);
        }
    };

    filterToggle.addEventListener('change', () => {
        if (filterToggle.checked) {
            displayBlocks(myBlocksCache);
        } else {
            displayBlocks(allBlocksCache);
        }
    });

    fetchData();
});
