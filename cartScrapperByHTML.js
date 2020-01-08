import { waitForExistence, waitLoading } from '../../../utils/src'

function sendEvent () {
  window.linxImpulse.createEvent('linximpulse.navigation')
  console.log('event sent')
}

function addListener (context, querySelector, event, action) {
  const elements = context.querySelectorAll(querySelector)
  elements.length && elements.forEach(element => element.addEventListener(event, action))
}

function getProductElements () {
  const productElements = [...document.querySelectorAll('[preco]')]
  return productElements.length ? productElements : null
}

function getProductId (productElement) {
  const url = productElement.querySelector('a').href
  const cleanUrl = url.split('?')[0]
  const splittedBySlash = cleanUrl.split('/')
  const lastSplittedBySlash = splittedBySlash.length - 1
  const IDs = splittedBySlash[lastSplittedBySlash].split('-')
  const lastID = IDs.length - 1
  const productId = IDs[lastID]
  return productId
}


function getProductPrice (productElement) {
  const priceElement = productElement.querySelector('.ckt__produto__preco--por')
  const priceString = priceElement && priceElement.innerText
  const price = priceString && priceString.split(' ')[1].replace(',', '.')
  return Number(price)
}

function getProductQuantity (productElement) {
  const quantityInput = productElement.querySelector('.seletor-preco-input')
  const quantity = Number(quantityInput.value)
  return quantity
}

async function watchCartInteraction () {
  const products = await waitForExistence(getProductElements)

  if (!products || !products.length) {
    return
  }

  products.forEach(product => {
    addListener(product, '.seletor-preco-input', 'change', sendEvent)
    addListener(product, '.seletor-preco-btn', 'click', sendEvent)
    addListener(product, '.remove-item', 'click', () => waitLoading(sendEvent))
  })

  const emptyCart = document.querySelector('.ckt__limpar__carinho')
  const emptyCartMinimumOrder = document.querySelector('#checkout-btn-clean')

  const emptyCartButtons = [emptyCart, emptyCartMinimumOrder]

  emptyCartButtons.forEach(button =>
    button && button.addEventListener('click', () =>
      addListener(document, '.swal2-confirm', 'click', sendEvent))
  )
}

async function getCartItems () {
  const products = await waitForExistence(getProductElements)

  if (!products || !products.length) {
    return []
  }

  const items = products.map(product => {
    return {
      pid: getProductId(product) || '',
      price: getProductPrice(product) || '',
      quantity: getProductQuantity(product) || ''
    }
  })

  console.log(items)
  return items
}

export default function cart () {
  watchCartInteraction()

  return {
    page: 'cart',
    items: getCartItems()
    // watcher: watchCartInteraction
  }
}
