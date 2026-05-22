import pxToRem from './utils/pxToRem.js'

const rootSelector = '[data-js-expandable-content]'

class ExpandableContent {

  selectors = {
    root: rootSelector,
    button: '[data-js-expandable-content-button]',
  }

  stateClasses = {
    isExpanded: 'is-expanded'
  }

  animationParams = {
    duration: 500,
    easing: 'ease'
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)
    this.bindEvents()
  }

  expand() {
    const { offsetHeight, scrollHeight } = this.rootElement

    this.rootElement.classList.add(this.stateClasses.isExpanded)
    // Метод animate() первым аргументом принимает массив ключевых кадров, а вторым параметры анимации. Каждый ключевой
    // кадр это объект с CSS свойствами в cemalCase нотации
    this.rootElement.animate([
      {
        // offsetHeigh обязательно передаем в бэктиках(``) чтобы добавить единицу измерения, в данном случаи т.к. во
        // всем проекте мы используем единицу измерения rem то импортируем в данный фаил JS функцию для перевода px -> rem из папки utils
        maxHeight: `${pxToRem(offsetHeight)}rem`,
      },
      {
        maxHeight: `${pxToRem(scrollHeight)}rem`,
      },
    ], this.animationParams)
  }

  onButtonClick = () => {
    this.expand()
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick)
  }

}

class ExpandableContentCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ExpandableContent(element)
    })
  }
}

export default ExpandableContentCollection