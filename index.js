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

renderMainDetail = (item) => {
  itemName.innerText = item.name;
  itemImage.src = item.image;

  itemName.addEventListener("mouseover", () => {
    console.log("hiiiii");
    const description = document.createElement("p");
    const url = document.createElement("p");
    description.className = "mouse";
    url.className = "mouse";
    description.innerText = item.description;
    itemName.append(description, url);

    description.innerText = item.description;
    url.innerText = item.url;
    itemName.addEventListener("mouseout", () => {
      description.remove();
      url.remove();
    });
  });
};

const urlInput = encodeURI(document.getElementById("url").value);
const nameInput = document.getElementById("name");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit worked");
  async function request() {
    let req = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=${urlInput}&size=100x100`
    );
    //   let resp = await req.json()
    console.log(req);
  }
  request();
});

// newUrl = (url) => {
//     const imageDetail = document.getElementById("image-detail");
//     imageDetail.src;
//   console.log(newUrl);
// };
