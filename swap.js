// api
const btnSwap = document.querySelector("#swap-btn");
const divPay = document.querySelector("#swap-pay");
const divReceive = document.querySelector("#swap-receive");
const btnCalculate = document.querySelector("#btn-calculate");
btnCalculate.addEventListener("click", (event) => {
  event.preventDefault();

  let divPayValue = divPay.querySelector("input").value;
  const expresionRegular = /^-?\d*\.?\d+/;

  if (!expresionRegular.test(divPayValue)) {
    alert("Enter a valid number");
    return;
  }

  if (divPayValue.startsWith("-")) {
    divPay.querySelector("input").value = divPayValue.replace("-", "");
  }

  const currentCryptoSymbol = currentCrypto
    .querySelector("strong")
    .textContent.toLowerCase();
  let selectTokenSymbol = selectToken
    .querySelector("strong")
    .textContent.toLowerCase();

  // Verifica si selectTokenSymbol es igual a "select token" y asigna "usdt" en su lugar
  if (selectTokenSymbol === "select token") {
    selectTokenSymbol = "usdt";
  }

  const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoSymbols[currentCryptoSymbol]}&tsyms=${cryptoSymbols[selectTokenSymbol]}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const conversionRate = data[cryptoSymbols[selectTokenSymbol]];
      const value = conversionRate * Math.abs(Number(divPayValue));
      const roundedValue = value.toFixed(2);
      divReceive.querySelector("input").value = roundedValue;
    });
});

const currentCrypto = document.querySelector("#current-nft");
const modal = document.querySelector("#modal");
const swapForm = document.querySelector("#swap-form");
const selectToken = document.querySelector("#token");
const exitModal = document.querySelector("#exit-modal");
const cryptoSymbols = {
  eth: "ETH",
  weth: "WETH",
  usdt: "USDT",
  dai: "DAI",
  usdc: "USDC",
  wbtc: "WBTC",
  aave: "AAVE",
  cronos: "CRO",
  fantom: "FTM",
  matic: "MATIC",
};

function handleSelectTokenClick() {
  swapForm.classList.add("modal-active");
  modal.classList.remove("hidden");
  Object.keys(cryptoSymbols).forEach((crypto) => {
    const btnCrypto = document.querySelector(`.${crypto}`);
    const imgCrypto = btnCrypto.querySelector("img").src;
    btnCrypto.addEventListener("click", () => {
      document.querySelector("#token-text").innerHTML = crypto.toUpperCase();
      selectToken.classList.add("crypto-container");
      selectToken.classList.remove("token");

      // Eliminar la imagen existente
      const existingImg = selectToken.querySelector(".crypto-logo");
      if (existingImg) {
        existingImg.remove();
      }
      // Crear y agregar la nueva imagen
      const img = document.createElement("img");
      img.src = imgCrypto;
      img.classList.add("crypto-logo");
      const aux = selectToken.innerHTML;
      selectToken.innerHTML = "";
      selectToken.appendChild(img);
      selectToken.innerHTML += aux;

      swapForm.classList.remove("modal-active");
      modal.classList.add("hidden");
    });
  });
}

const token = document.querySelector("#token");
token.addEventListener("click", handleSelectTokenClick);

exitModal.addEventListener("click", () => {
  swapForm.classList.remove("modal-active");
  modal.classList.add("hidden");
});
