<<<<<<< HEAD
export function waitForExistence (getValueFunction, maxTries, timeInterval) {
=======
/**
 * Waits for object existence using a function to retrieve its value.
 *
 * @param { function() : T } getValueFunction
 * @param { number } [maxTries=10] - Number of tries before the error catch.
 * @param { number } [timeInterval=200] - Time interval between the requests in milis.
 * @returns { Promise.<T> } Promise of the checked value.
 */
export function waitForExistence(getValueFunction, maxTries = 10, timeInterval = 200) {
>>>>>>> 10802ad1c67726bc15d0b0d8ceee287307171744
  return new Promise((resolve, reject) => {
    let tries = 0
    const interval = setInterval(() => {
      tries += 1
      const value = getValueFunction()
      if (value) {
        clearInterval(interval)
        return resolve(value)
      }

<<<<<<< HEAD
      if (tries >= (maxTries || 10)) {
        clearInterval(interval)
        return reject(new Error(`Could not find any value using ${tries} tentatives`))
      }
=======
      if (tries >= maxTries) {
        clearInterval(interval)
        return reject(new Error(`Could not find any value using ${tries} tentatives`))
      }
    }, timeInterval)
  })
}

/**
 * waitLoading version of waitForExistence
 * @param { Function } afterLoadingFunction function to be called after loading
 * @param { Number } maxTries number of max tries
 * @param { Number} timeInterval time in milieseconds between tries
 */
export function waitLoading(afterLoadingFunction, maxTries, timeInterval) {
  return new Promise((resolve, reject) => {
    let tries = 0
    const interval = setInterval(function checkLoading() {
      tries += 1
      const loadingElement = document.querySelector('#blockui-container')
      const isLoading = loadingElement && loadingElement.style.display !== 'none'

      if (!isLoading) {
        clearInterval(interval)
        afterLoadingFunction()
        return resolve(false)
      }

      if (tries >= (maxTries || 50)) {
        clearInterval(interval)
        return resolve(true)
      }
>>>>>>> 10802ad1c67726bc15d0b0d8ceee287307171744
    }, timeInterval || 200)
  })
}
