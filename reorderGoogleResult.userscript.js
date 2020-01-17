// ==UserScript==
// @name        Swap title and location google results position
// @namespace   Violentmonkey Scripts
// @match       https://www.google.com/search*
// @grant       none
// @version     1.0
// @author      Marcelo "Mark" Kopmann
// ==/UserScript==

[...document.querySelectorAll('.r > a')].forEach((anchor) => {
  const title = anchor.querySelector('h3')
  const location = anchor.querySelector('div')
	anchor.insertBefore(title, location)
  
  const text = anchor.querySelector('cite')
  text.style.color = 'darkgreen'
  text.style.fontWeight = 'bolder'
  
  anchor.style.display = 'flex'
  anchor.style.flexDirection = 'column'
})
