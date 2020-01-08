export function waitForExistence (getValueFunction, maxTries, timeInterval) {
  return new Promise((resolve, reject) => {
    let tries = 0
    const interval = setInterval(() => {
      tries += 1
      const value = getValueFunction()
      if (value) {
        clearInterval(interval)
        return resolve(value)
      }

      if (tries >= (maxTries || 10)) {
        clearInterval(interval)
        return reject(new Error(`Could not find any value using ${tries} tentatives`))
      }
    }, timeInterval || 200)
  })
}
