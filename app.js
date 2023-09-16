// Menu
const boton = document.querySelector("#boton");
const menu = document.querySelector("#menu");
boton.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Parallax
window.onscroll = function () {
  const robot = document.querySelector("#img-robot");
  let position = document.documentElement.scrollTop;
  robot.style.bottom = `${position * 0.3}px`;
};

// Scroll
const scrollContainer = document.querySelector(".scroll-wrapper");
const scrollDistance = 300;
const scrollDuration = 1000;

const smoothScroll = (targetScrollLeft, startTime = 0) => {
  const currentTime = performance.now();
  const elapsedTime = currentTime - startTime;
  const progress = Math.min(elapsedTime / scrollDuration, 1);
  const easeProgress = Math.pow(2, 10 * (progress - 1));
  const scrollStep =
    (targetScrollLeft - scrollContainer.scrollLeft) * easeProgress;
  scrollContainer.scrollTo({
    left: scrollContainer.scrollLeft + scrollStep,
    behavior: "auto",
  });
  if (progress < 1) {
    requestAnimationFrame(() => smoothScroll(targetScrollLeft, startTime));
  }
};

const scrollLeftBtn = document.querySelector(".scroll-left-btn");
const scrollRightBtn = document.querySelector(".scroll-right-btn");

scrollLeftBtn.addEventListener("click", () =>
  smoothScroll(scrollContainer.scrollLeft - scrollDistance)
);
scrollRightBtn.addEventListener("click", () =>
  smoothScroll(scrollContainer.scrollLeft + scrollDistance)
);

// Sellers
const divSellers = document.querySelector("#sellers");
let sellers = [
  "Elizabeth",
  "Philip Bale ",
  "Emma",
  "Charlotte ",
  "Collins p",
  "Olivia Smith",
  "Jessy García",
  "Amanda T",
  "Albert Harris",
  "Lila Komp",
  "Isabella R",
  "Akira",
];
function sellersCards() {
  // Crea un arreglo de objetos con nombres y números aleatorios
  let sellersData = sellers.map((seller, index) => {
    const min = 50000;
    const max = 500000;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      name: seller,
      randomNumber: randomNumber,
      sellerImg: `./img/seller${index + 1}.png`,
    };
  });

  // Ordenar de mayor a menor a nuestros sellers
  sellersData.sort((a, b) => b.randomNumber - a.randomNumber);

  // tarjetas de los vendedores ordenados
  sellersData.forEach((seller) => {
    let divCardSeller = `
    <div class="seller-info">
      <img src="${seller.sellerImg}">
      <p class="seller-name">${seller.name}</p>
      <span id="#volumen">${seller.randomNumber.toLocaleString()} USD</span>
    `;
    divSellers.innerHTML += divCardSeller;
  });
}

sellersCards();

// Mail
const btn = document.querySelector("#send-btn");
const input = document.querySelector("#input");
const divMensaje = document.querySelector("#mensaje");

function showMessage(message) {
  divMensaje.classList.remove("hidden");
  divMensaje.innerHTML = `<p>${message}</p>`;
  setTimeout(() => {
    divMensaje.classList.add("hidden");
  }, 3000);
}

btn.addEventListener("click", () => {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (expresionRegular.test(input.value)) {
    showMessage("Thank you for joining our mailing list");
  } else {
    showMessage("Enter a valid email");
    console.log("valido");
  }
});

// Logos
const logos = ["twitter", "discord", "instagram", "youtube", "email"];
const divLogos = document.querySelector("#contenedorLogos");
for (let i = 0; i < logos.length; i++) {
  let contenedorLogo = `<div class="my-5 bg-gradient-to-r from-lila to-purple-700 flex justify-center items-center rounded-lg
    cursor-pointer transition-all duration-500 transform hover:-translate-y-2">
    <img loading="lazy" class="h-3/5" src="./img/logo-${logos[i]}.png" alt="logo-${logos[i]}">
  </div>`;
  divLogos.innerHTML += contenedorLogo;
}

// Api
const price = document.querySelector("#eth-price");
const url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let precio = data.USD;
    price.textContent = `1 ETH = ${precio} USD`;
  })
  .catch((error) => {
    console.error(error);
  });
