// ==UserScript==
// @name        Asana Helper
// @namespace   Violentmonkey Scripts
// @match       https://app.asana.com/*
// @grant       none
// @version     1.0
// @author      Marcelo "Mark" Kopmann
// ==/UserScript==


/**
 * Allow only one call within the time limit
 * @param { Function } func function to limited
 * @param { Number } limit time limite in miliseconds
 */
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Select and click in the loadMoreSubtasks element
 */
const loadMoreSubtasks = () => {
  console.log('a')
  const loadMoreElement = document.querySelector('.SubtaskGrid-loadMore')
  if(loadMoreElement) {
    loadMoreElement.click()
  }
}

/*
 * Add a throttled event listener to the page
 */
(function asanaHelper() {
  document.addEventListener('mouseover', throttle(loadMoreSubtasks, 1000))
})()
