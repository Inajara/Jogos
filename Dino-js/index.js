const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
const pontuacao = document.querySelector('.pontuacao')
const novoJogo = document.querySelector('.novo-jogo')
let isJumping = false
let isGameOver = false
let score = 0
let position = 0

function jump() {
    isJumping = true
    let upInterval = setInterval(() => {
      if (position >= 150) {
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval)
            isJumping = false;
          } else {
            position -= 20;
            dino.style.bottom = position + 'px'
          }
        }, 20)
      } else {
        position += 20
        dino.style.bottom = position + 'px'
      }
    }, 20)
  }

  function handleKeyUp(event) {
    if (event.keyCode === 32) {
      if (!isJumping) {
        jump()
        score++
        pontuacao.innerHTML = `<h2>Pontuação: ${score}</h2>`
      }
    }
  }

  function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000
    if (isGameOver){
      return
    }
    cactus.classList.add('cactus')
    background.appendChild(cactus)
    cactus.style.left = cactusPosition + 'px'
    let leftTimer = setInterval(() => {
      if (cactusPosition < -60) {
        clearInterval(leftTimer)
        background.removeChild(cactus)
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        clearInterval(leftTimer)
        isGameOver = true
        document.body.innerHTML = `<h1 class="game-over">Fim de jogo</h1>\n
        <h2 class="game-over">Pontuação: ${score}</h2>\n
        <button class="novo-jogo" onClick="window.location.reload()">Jogar<br>Novamente</button>`
      }else{
        cactusPosition -= 10
        cactus.style.left = cactusPosition + 'px'
      }
    }, 20)
    setTimeout(createCactus, randomTime)
  }

createCactus()
document.addEventListener('keyup', handleKeyUp)