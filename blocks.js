// --- FINAL, FILTERABLE BLOCK EXPLORER SCRIPT (Card View) ---

window.addEventListener('load', async () => {
    // --- Your Contract Details (from app.js) ---
    const contractAddress = "0xfBefA1127Fedf77f460Ee942a7d911728ad894aC";
    const contractABI = [ {"inputs":[],"stateMutability":"nonpayable","type":"constructor"}, {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newUser","type":"address"}],"name":"AuthorityGranted","type":"event"}, {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"revokedUser","type":"address"}],"name":"AuthorityRevoked","type":"event"}, {"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"certificateId","type":"bytes32"},{"indexed":false,"internalType":"string","name":"studentName","type":"string"},{"indexed":false,"internalType":"string","name":"courseName","type":"string"},{"indexed":false,"internalType":"string","name":"marks","type":"string"},{"indexed":false,"internalType":"string","name":"issuingInstitution","type":"string"}],"name":"CertificateIssued","type":"event"}, {"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"certificateId","type":"bytes32"}],"name":"CertificateRevoked","type":"event"}, {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}, {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}, {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"certificateIdList","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}, {"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"certificates","outputs":[{"internalType":"string","name":"studentName","type":"string"},{"internalType":"string","name":"courseName","type":"string"},{"internalType":"string","name":"marks","type":"string"},{"internalType":"string","name":"issuingInstitution","type":"string"},{"internalType":"uint256","name":"issueDate","type":"uint256"},{"internalType":"bool","name":"isRevoked","type":"bool"}],"stateMutability":"view","type":"function"}, {"inputs":[],"name":"getCertificateCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}, {"inputs":[{"internalType":"bytes32","name":"certificateId","type":"bytes32"}],"name":"getCertificateDetails","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}, {"inputs":[{"internalType":"address","name":"_newUser","type":"address"}],"name":"grantAuthority","outputs":[],"stateMutability":"nonpayable","type":"function"}, {"inputs":[{"internalType":"string","name":"_studentName","type":"string"},{"internalType":"string","name":"_courseName","type":"string"},{"internalType":"string","name":"_marks","type":"string"},{"internalType":"string","name":"_issuingInstitution","type":"string"}],"name":"issueCertificate","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}, {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}, {"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"revokeAuthority","outputs":[],"stateMutability":"nonpayable","type":"function"}, {"inputs":[{"internalType":"bytes32","name":"certificateId","type":"bytes32"}],"name":"revokeCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"}, {"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"} ];
    const rpcUrl = "https://sepolia.infura.io/v3/5cb8eb30eaae446c81ab26a22e968dda";
    
    const blocksContainer = document.getElementById('blocks-container');
    const filterToggle = document.getElementById('filter-toggle');
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    let allBlocksCache = [];
    let myBlocksCache = [];

    // This function creates the new block visual
    const renderBlock = (block) => {
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block'; // Use the .block style
        const myTxs = block.myTransactions || [];

        let txData = '';
        if (myTxs.length > 0) {
            myTxs.forEach(event => {
                const args = event.args;
                txData += `CERTIFICATE ISSUED:\n`;
                txData += `  Student: ${args.studentName}\n`;
                txData += `  Course: ${args.courseName}\n`;
                txData += `  Marks: ${args.marks}\n`;
                txData += `  Institution: ${args.issuingInstitution}\n`;
            });
        } else {
            txData = `No certificate transactions found in this block.\n\nTotal Txs: ${block.transactions.length}`;
        }
        
        blockDiv.innerHTML = `
            <form class="block-card-form">
                <div>
                    <label for="blockNum-${block.number}">Block:</label>
                    <input type="text" id="blockNum-${block.number}" value="#${block.number}" disabled>
                </div>
                <div>
                    <label for="nonce-${block.number}">Nonce:</label>
                    <input type="text" id="nonce-${block.number}" value="${block.nonce}" disabled>
                </div>
                <div>
                    <label for="data-${block.number}">Data:</label>
                    <textarea id="data-${block.number}" disabled>${txData}</textarea>
                </div>
                <div>
                    <label for="prev-${block.number}">Prev:</label>
                    <input type="text" id="prev-${block.number}" value="${block.parentHash}" disabled>
                </div>
                <div>
                    <label for="hash-${block.number}">Hash:</label>
                    <input type="text" id="hash-${block.number}" value="${block.hash}" disabled>
                </div>
            </form>
        `;
        return blockDiv;
    };
    
    const displayBlocks = (blocks) => {
        blocksContainer.innerHTML = '';
        if (blocks.length === 0) {
            blocksContainer.innerHTML = '<p>No relevant blocks found.</p>';
            return;
        }
        // Use prepend to add the newest blocks to the left
        blocks.forEach(block => {
            blocksContainer.prepend(renderBlock(block));
        });
    };

    const fetchData = async () => {
        blocksContainer.innerHTML = '<p>Fetching data, this will be fast...</p>';
        try {
            const eventFilter = contract.filters.CertificateIssued();
            const events = await contract.queryFilter(eventFilter, 0, 'latest');
            const myBlockNumbers = [...new Set(events.map(event => event.blockNumber))];
            
            const myBlockPromises = myBlockNumbers.map(blockNumber => provider.getBlock(blockNumber));
            myBlocksCache = await Promise.all(myBlockPromises);
            myBlocksCache.forEach(block => {
                block.myTransactions = events.filter(e => e.blockNumber === block.number);
            });

            const latestBlockNumber = await provider.getBlockNumber();
            const allBlockPromises = [];
            for (let i = 0; i < 15 && (latestBlockNumber - i >= 0); i++) {
                allBlockPromises.push(provider.getBlock(latestBlockNumber - i));
            }
            allBlocksCache = await Promise.all(allBlockPromises);

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
