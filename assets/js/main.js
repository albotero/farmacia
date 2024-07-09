let menuIcon,
  menu,
  menuShown = false

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

document.addEventListener("DOMContentLoaded", () => {
  menuIcon = document.querySelector(".menu-icon")
  menu = document.querySelector(".menu")
  menuIcon.addEventListener("click", toggleMobileMenu)
})
