import { PRODUCTS } from "./products.js"

let menuIcon,
  menu,
  menuShown = false,
  pages,
  currentPage = 0,
  filter = "id"

const toggleMobileMenu = (forceHideMenu) => {
  menuShown = forceHideMenu ? false : !menuShown
  if (menuShown) {
    menuIcon.classList.add("selected")
    menu.classList.remove("hidden")
  } else {
    menuIcon.classList.remove("selected")
    menu.classList.add("hidden")
  }
}

const showSection = (event) => {
  Object.entries(pages).forEach(([title, element]) => {
    /* element => NodeList from QuerySelectorAll
    First item (element[0]) will be menu-items
    Other items (element[1...n]) will be from the pages */
    const isCurrentSection = event.target.className.includes(title)
    const page = document.getElementById(title)
    element[0].classList.remove("selected")
    page.classList.remove("hidden")
    if (isCurrentSection) element[0].classList.add("selected")
    else page.classList.add("hidden")
  })
  toggleMobileMenu(true)
}

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

const sortProducts = () =>
  PRODUCTS.sort((a, b) => {
    const valA = filter === "price" ? a.price * (1 - (a.discount / 100 || 0)) : a[filter] || 0
    const valB = filter === "price" ? b.price * (1 - (b.discount / 100 || 0)) : b[filter] || 0
    if (filter === "discount") return valB - valA
    if (valA < valB) return -1
    if (valA > valB) return 1
    return 0
  })

const populateProducts = (start, count) => {
  sortProducts()
  document.querySelector(".products-container").innerHTML = PRODUCTS.slice(start, start + count)
    .map(
      ({ id, title, desc, price, discount }) => `
    <div class="card">
      <img
        src="./assets/img/medicamentos/${id}.webp"
        alt="${title}"
        title="${title}"
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
      <a href="#" class="card-button button">Ver más</a>
    </div>`
    )
    .join("")
}

document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  menuIcon = document.querySelector(".menu-icon")
  menu = document.querySelector(".menu")
  pages = {
    home: document.querySelectorAll("button.home"),
    products: document.querySelectorAll("button.products"),
    deals: document.querySelectorAll("button.deals"),
    contact: document.querySelectorAll("button.contact"),
  }
  // Add listeners
  menuIcon.addEventListener("click", () => toggleMobileMenu(false))
  Object.entries(pages).forEach(([_, query]) =>
    Array.from(query).forEach((element) => element.addEventListener("click", showSection))
  )
  document.getElementById("filter-select").addEventListener("change", (event) => {
    filter = event.target.value
    populatePages()
  })
  // Populate products
  populatePages()
})
