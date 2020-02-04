<<<<<<< HEAD
export const throttle = (func, limit) => {
  let inThrottle
  return function () {
=======
/**
 * Allow only one call within the time limit
 * @param { Function } func function to limited
 * @param { Number } limit time limite in miliseconds
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
>>>>>>> 10802ad1c67726bc15d0b0d8ceee287307171744
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
<<<<<<< HEAD
      setTimeout(() => { inThrottle = false }, limit)
=======
      setTimeout(() => {
        inThrottle = false
      }, limit)
>>>>>>> 10802ad1c67726bc15d0b0d8ceee287307171744
    }
  }
}
