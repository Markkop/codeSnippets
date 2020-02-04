// ==UserScript==
// @name        Code aliases
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.0
// @author      Marcelo "Mark" Kopmann
// @description 
// ==/UserScript==

// Combo example command:
// qaf('p', el => el.addEventListener('click', l(el.innerText)))

window.q = (...args) => document.querySelector.apply(document, args)
window.qa = (...args) => document.querySelectorAll.apply(document, args)
window.l = console.log
window.qaf = (selector, callback) => [...document.querySelectorAll.apply(document, [selector])].forEach(callback)
Array.prototype.f = Array.prototype.forEach
Array.prototype.m = Array.prototype.map
Array.prototype.r = Array.prototype.reduce
