function getCartItems (event, request, settings) {
  const response = request && request.responseJSON
  const carts = (response && response.resumo && response.resumo.Carrinhos) || (response && response.Carrinhos)

  const cartKeys = carts && Object.keys(carts)
  const items = cartKeys && cartKeys.reduce((allItems, cartKey) => {
    const cart = cartKey && carts[cartKey]
    const cartItems = cart.Itens
    const thisCartItems = cartItems.map(item => ({
      pid: item.ProdutoId,
      sku: item.Codigo,
      quantity: item.Quantidade,
      price: Number(item.PrecoPor)
    }))

    return [...allItems, ...thisCartItems]
  }, [])

  console.log(items)
  window.cartItems = items
  window.linxImpulse.createEvent('linximpulse.navigation')
}

function watchCartRequest () {
  window.$(document).off('ajaxComplete').on('ajaxComplete', getCartItems)
}

export default function cart () {
  return {
    page: 'cart',
    items: window.cartItems || [],
    watcher: watchCartRequest
  }
}
