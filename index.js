fetch("http://localhost:3000/codes")
  .then((resp) => resp.json())
  .then((qrCodes) => qrCodes.forEach(generateWallet));

function generateWallet(qrCode) {
  const walletDiv = document.getElementById("item-list");
  const walletItem = document.createElement("p");
  walletItem.className = "items";
  walletDiv.append(walletItem);
  walletItem.innerText = qrCode.name.toUpperCase();
  walletItem.addEventListener("click", () => {
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

  itemName.addEventListener("mouseover", () => {
    console.log("hiiiii");
    description.className = "mouse";
    url.className = "mouse";
    description.innerText = item.description;

    url.innerText = item.url;
    itemName.addEventListener("mouseout", () => {
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
      `https://api.qrserver.com/v1/create-qr-code/?data=${urlInput.value}&size=250x250`
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
    generateWallet(newQr);
  }
  request();
});
