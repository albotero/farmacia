import { PRODUCTS } from "./products.js"

let menuIcon,
  menu,
  menuShown = false,
  pages,
  currentPage = 0

const toggleMobileMenu = () => {
  menuShown = !menuShown
  if (menuShown) {
    menuIcon.classList.add("selected")
    menu.classList.remove("hidden")
  } else {
    menuIcon.classList.remove("selected")
    menu.classList.add("hidden")
  }
}

const showSection = (event) =>
  Object.entries(pages).forEach(([title, element]) => {
    const isCurrentSection = event.target.className.includes(title)
    const page = document.getElementById(title)
    element.classList.remove("selected")
    page.classList.remove("hidden")
    if (isCurrentSection) element.classList.add("selected")
    else page.classList.add("hidden")
  })

const changePage = (index) => {
  currentPage = index
  populatePages()
}

const populatePages = () => {
  const numPages = Math.ceil(PRODUCTS.length / 8)
  const pagesDiv = document.querySelector(".pages")
  pagesDiv.innerHTML = ""
  new Array(numPages).fill().forEach((_, i) => {
    const newPage = document.createElement("p")
    newPage.innerText = i + 1
    if (i === currentPage) {
      newPage.classList.add("current")
      populateProducts(currentPage * 8, 8)
    }
    newPage.addEventListener("click", () => changePage(i))
    pagesDiv.appendChild(newPage)
  })
}

const populateProducts = (start, count) => {
  document.querySelector(".products-container").innerHTML = PRODUCTS.slice(start, start + count)
    .map(
      ({ id, title, desc, price, discount }) => `
    <div class="card">
      <img
        src="./assets/img/medicamentos/${id}.webp"
        alt="${title}"
        class="card-image"
      />
      <h4 class="card-title">${title}</h4>
      <p class="card-desc">${desc}</p>
      <p class="card-price">$${(discount ? Math.round(price * (1 - discount / 100)) : price).toLocaleString()}</p>
      ${
        discount
          ? `<div class="card-price-discount">
        <p class="discount">-${discount}%</p>
        <p class="full-price">$${price.toLocaleString()}</p>
      </div>`
          : ""
      }
      <a href="#" class="card-button">Ver más</a>
    </div>`
    )
    .join("")
}

document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  menuIcon = document.querySelector(".menu-icon")
  menu = document.querySelector(".menu")
  pages = {
    home: document.querySelector(".menu-item.home"),
    products: document.querySelector(".menu-item.products"),
    deals: document.querySelector(".menu-item.deals"),
    contact: document.querySelector(".menu-item.contact"),
  }
  // Add listeners
  menuIcon.addEventListener("click", toggleMobileMenu)
  Object.entries(pages).forEach(([_, el]) => el.addEventListener("click", showSection))
  // Populate products
  populatePages()
})
