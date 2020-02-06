
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
    }, timeInterval || 200)
  })
}
