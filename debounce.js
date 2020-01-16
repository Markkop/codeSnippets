/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds.
 *
 * @param { function } func function to be called
 * @param { number } wait time in miliseconds to be waited
 * @param { boolean } immediate trigger the function on the leading edge (true) or trailing (false).
 */
function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) {
        return func.apply(context, args)
      }
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      return func.apply(context, args)
    }
  }
}

// How to Use
// 1. Create a new function with the function you want to debounce
const debounced = debounce(myfunc, 1000, false) // or
const debounced = debounce(() => console.log('Hey'), 1000, false)

// 2. Call it where you want to debounce
document.addEventListener('click', debounced)
jQuery(window).on('resize', debounced)

// 3. Make sure you have declared your variables in the adequate scope,
// otherwise they'll keep being redeclared and it won't work
