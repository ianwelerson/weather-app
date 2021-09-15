const sideSearch = {
  open() {
    const element = document.getElementById('side-search')
    element.classList.remove('home__menu--closed')
  },
  close() {
    const element = document.getElementById('side-search')
    element.classList.add('home__menu--closed')
  }
}

export default sideSearch