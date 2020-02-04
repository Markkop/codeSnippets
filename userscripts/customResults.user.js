// ==UserScript==
// @name        Custom Google Results
// @namespace   Violentmonkey Scripts
// @match       https://www.google.com/search*
// @grant       none
// @version     1.1
// @author      Marcelo "Mark" Kopmann
// ==/UserScript==

/**
 * Swaps result title and location order
 */
const swapTitleAndLocation = () => {
  const results = document.querySelectorAll('.r > a')
  results.forEach(anchor => {
    const title = anchor.querySelector('h3') 
    const location = anchor.querySelector('div')
    
    if (!title || !location) {
      return 
    }
    
    anchor.insertBefore(title, location)

    // Highlight location
    const text = anchor.querySelector('cite')
    if (text) {
      text.style.color = 'darkgreen'
      text.style.fontWeight = 'bolder'  
    }
    
    //Fix style
    anchor.style.display = 'flex'
    anchor.style.flexDirection = 'column'
  })
}

/**
 * Remove result arrow with other options because I couldn't fix
 * it's overlaying appeareance
 */
const removeResultArrow = () => {
  const resultsContainers = document.querySelectorAll('.r')
  resultsContainers.forEach(container => {
    const [ details, arrow ] = container.children
    if (!arrow) {
      return
    }
    arrow.style.display = 'none'
  })
}
  

/**
 * Remove AD results because thanks google, but no.
 */
const removeAdsResults = () => {
  const ads = [...document.querySelectorAll('.ads-ad')]
  ads.forEach(ad => ad.remove())  
}

/**
 * Run this script
 */
(function customizeResults() {
  removeResultArrow()
  removeAdsResults()
  swapTitleAndLocation()

})()
