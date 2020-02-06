/**
 * Waits for object existence using a function to retrieve its value.
 *
 * @param { function() : T } getValueFunction
 * @param { number } [maxTries=10] - Number of tries before the error catch.
 * @param { number } [timeInterval=200] - Time interval between the requests in milis.
 * @returns { Promise.<T> } Promise of the checked value.
 */
export function waitForExistence(getValueFunction, maxTries = 10, timeInterval = 200) {
  return new Promise((resolve, reject) => {
    let tries = 0
    const interval = setInterval(() => {
      tries += 1
      const value = getValueFunction()
      if (value) {
        clearInterval(interval)
        return resolve(value)
      }

      if (tries >= maxTries) {
        clearInterval(interval)
        return reject(new Error(`Could not find any value using ${tries} tentatives`))
      }
    }, timeInterval)
  })
}