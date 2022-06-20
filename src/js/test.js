console.log('hello from test.js')

let blocks = document.querySelectorAll('.block-wrapper')


blocks.forEach(function (block) {
  block.addEventListener('click', function (e) {
    let currentBlock = e.target.closest('.block-wrapper')

    currentBlock.classList.toggle('active')
    getActiveCard()
    setLinkText(currentBlock)
  })
})

function linkListener() {
  let links = document.querySelectorAll('.card-link')
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      let currentBlock = e.target
        .closest('.card-wrapper')
        .querySelector('.block-wrapper')

      currentBlock.classList.toggle('active')
      getActiveCard()
      removeActiveCard()
      setLinkText(currentBlock)
    })
  })
}
linkListener()

function getActiveCard() {
  let activeBlocks = document.querySelectorAll('.block-wrapper')

  activeBlocks.forEach(function (activeBlock) {
    let block = activeBlock.closest('.block-wrapper.active')
    if (block) {
      block.addEventListener('mouseleave', function (e) {
        if (block.classList.contains('active')) {
          block.querySelector('.subtitle').textContent = 'Котэ не одобряет?'
          block.querySelector('.subtitle').classList.add('bg-custom')
        } else {
          block.querySelector('.subtitle').textContent =
            'Сказочное заморское яство'
          block.querySelector('.subtitle').classList.remove('bg-custom')
        }
      })
    }
  })
}

function removeActiveCard() {
  let activeBlocks = document.querySelectorAll('.block-wrapper:not(.active)')

  activeBlocks.forEach(function (activeBlock) {
    activeBlock.querySelector('.subtitle').textContent =
      'Сказочное заморское яство'
    activeBlock.querySelector('.subtitle').classList.remove('bg-custom')
  })
}

function setLinkText(currentBlock) {
  if (currentBlock.classList.contains('active')) {
    let currentCard = Number(
      currentBlock
        .closest('.card-wrapper')
        .querySelector('.card-link-text')
        .getAttribute('data-id')
    )

    switch (currentCard) {
      case 1: {
        currentBlock
          .closest('.card-wrapper')
          .querySelector(
            '.card-link-text'
          ).textContent = `Печень утки разварная с артишоками.`
        break
      }

      case 2: {
        currentBlock
          .closest('.card-wrapper')
          .querySelector(
            '.card-link-text'
          ).textContent = `Головы щучьи с чесноком да свежайшая сёмгушка.`
        break
      }

      case 3: {
        currentBlock
          .closest('.card-wrapper')
          .querySelector(
            '.card-link-text'
          ).textContent = `Филе из цыплят с трюфелями в бульоне.`
        break
      }
    }
  } else {
    currentBlock
      .closest('.card-wrapper')
      .querySelector(
        '.card-link-text'
      ).innerHTML = `Чего сидишь? Порадуй котэ, <a class="card-link" href="#">купи</a>`
    linkListener()
  }
}
