// ==UserScript==
// @name        RunDeck Helper
// @namespace   Violentmonkey Scripts
// @match       https://rundeck.chaordicsystems.com/*
// @grant       none
// @version     1.0
// @author      Marcelo "Mark" Kopmann
// ==/UserScript==

let hasClicked = false

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
const openOutput = () => {
  const outputTabElement = document.querySelector('#tab_link_output > a')
  if(outputTabElement && !hasClicked) {
    outputTabElement.click()
    hasClicked = true
  }
}

/*
 * Add a throttled event listener to the page
 */
(function asanaHelper() {
  document.addEventListener('mouseover', throttle(openOutput, 1000))
})()

