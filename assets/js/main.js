let menuIcon,
  menu,
  menuShown = false,
  pages

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
})
