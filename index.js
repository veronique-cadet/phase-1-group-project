fetch("http://localhost:3000/codes")
  .then((resp) => resp.json())
  .then((qrCodes) => qrCodes.forEach(generateWallet));

const walletDiv = document.getElementById("item-list");
function generateWallet(qrCode) {
  const walletItemAndButton = document.createElement("div")
  const walletItem = document.createElement("p");
  walletItem.id = "items";
  walletItemAndButton.append(walletItem);
  walletItem.innerText = qrCode.name.toUpperCase();
 
 walletItemAndButton.className = "wallet-and-button"
 walletDiv.append(walletItemAndButton)
  walletItem.addEventListener("mouseover", () => {
    console.log("i worked");
    walletItem.style.color = "white";
  });

  walletItem.addEventListener("mouseout", () => {
    walletItem.style.color = "#4ea3c6";
  });

   const deleteButton = document.createElement("img");
   walletItemAndButton.append(deleteButton);
   deleteButton.id = "delete";
   deleteButton.src = "assets/remove.png";
   deleteButton.addEventListener("click", () => {
    // fetch(`http://localhost:3000/codes/${qrCode.id}`, {
    //   method: 'DELETE'
    // })
    walletItem.remove()
    deleteButton.remove()
   })

  walletItem.addEventListener("click", () => {
    walletItem.style.color = "white";
    renderMainDetail(qrCode);
  });
}
const itemName = document.getElementById("item-name");
const itemImage = document.getElementById("image-detail");
const description = document.getElementById("item-description");
const url = document.getElementById("item-url");

renderMainDetail = (item) => {
  itemName.innerText = item.name;
  itemImage.src = item.image;

  itemImage.addEventListener("mouseover", () => {
    console.log("hiiiii");
    description.className = "mouse";
    url.className = "mouse";
    description.innerText = item.description;

    url.innerText = item.url;
    itemImage.addEventListener("mouseout", () => {
      description.textContent = "";
      url.textContent = "";
    });
  });
};

const urlInput = document.getElementById("url");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit worked");
  // const urlInput= e.target.url.value
  async function request() {
    let req = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=${urlInput.value}&size=250x250&color=168-169-173`
    );
    //   let resp = await req.json()
    console.log(req);
    console.log(req.url);
    itemImage.src = req.url;
    const newQr = {
      name: nameInput.value,
      qrcode: req.url,
      image: req.url,
      description: descriptionInput.value,
      url: urlInput.value,
    };
    fetch("http://localhost:3000/codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQr),
    });
    itemName.innerText = nameInput.value;
    generateWallet(newQr);
  }
  request();
});
