// ==UserScript==
// @name        RunDeck Helper
// @namespace   Violentmonkey Scripts
// @match       https://rundeck.chaordicsystems.com/*
// @match       http://rundeck.core.linximpulse.net/*
// @grant       none
// @version     1.3
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


/**
 * Click in the element
 * @params { HTMLElement } element
 * @returns { Function } element click
 */
const openOutput = element => {
  return () => {
    if (hasClicked) {
      return
    }
    hasClicked = true
    element.click()
  }
}

/**
 * Add an event listener to open output tab
 */
const autoClickOnOutput = () => {
  const outputTabElement = document.querySelector('#tab_link_output > a') // Rundeck v2
  const outputAnchorElement = document.querySelector("[href='#output']") // Rundeck v3
  
  const element = outputTabElement || outputAnchorElement
  if (element) {
    document.addEventListener('mouseover', throttle(openOutput(element), 1000))
  }
}

/**
 * Change the color of your favorite jobs
 */
const highligthFavorites = () => {
  const favorites = [
    'rotina-intersect',
    'backend-intersect'
  ]
  const jobs = Array.from(document.querySelectorAll('a.text-primary'))
  jobs.forEach(element => {
    const name = element.innerText.trim()
    if (favorites.includes(name)) {
      element.style.color = 'orange'
    }
  })
}

/*
 * Run helper functions
 */
(function asanaHelper() {
  autoClickOnOutput()
  addExportAllButton()
  highligthFavorites()
})()
