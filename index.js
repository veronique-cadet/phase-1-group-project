console.log("this is connected!");

fetch('http://localhost:3000/codes')
.then(resp => resp.json())
.then(qrCodes => qrCodes.forEach(generateWallet))

function generateWallet(qrCode) {
    console.log("data is connected!")
    console.log(qrCode)
    const walletDiv = document.getElementById('item-list');
    const walletItem = document.createElement('p')
    walletItem.className = 'items'
    walletDiv.append(walletItem)
    walletItem.innerText = qrCode.name
    walletItem.addEventListener('click', () => {
        console.log("clicked!")
        
    })
}