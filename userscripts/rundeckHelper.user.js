// ==UserScript==
// @name        RunDeck Helper
// @namespace   Violentmonkey Scripts
// @match       https://rundeck.chaordicsystems.com/*
// @grant       none
// @version     1.1
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

/**
 * Open and downloads all jobs xml urls in the page
 */
const exportAllDefinitions = () => {
  const jobLinks = document.querySelectorAll('.hover_show_job_info')
  jobLinks.forEach(link => {
    const xmlUrl = link.getAttribute('href') + '?format=xml'
    window.open(xmlUrl)
  })
  
}

/**
 * Add export all definitions button in the page
 */ 
const addExportAllButton = () => {
  const pageButton = document.querySelector('#jobpageactionbuttons')
  if (!pageButton) {
    return
  }
  
  const button = document.createElement('div')
  button.innerText = 'Export All'
  button.classList.add('btn', 'btn-default', 'btn-sm')
  button.onclick = exportAllDefinitions
  pageButton.appendChild(button)
}

/*
 * Run helper functions
 */
(function asanaHelper() {
  document.addEventListener('mouseover', throttle(openOutput, 1000))
  addExportAllButton()
})()


