const loadB = async () => {
  import('./b.js')
}
const loadC = async () => {
  import('./c.js')
}

export const name = 'a'

document.querySelector('#btn1').addEventListener('click',loadB)
document.querySelector('#btn2').addEventListener('click',loadC)
