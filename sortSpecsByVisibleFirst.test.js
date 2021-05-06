const originalSpecs = ['pppp', 'ppp', 'pp', 'p', 'm', 'g', 'gg', 'ggg', 'gggg']

/**
 * Rotates an array X times.
 * Eg: [1, 2, 3] => [2, 3, 1]
 * @param {array} array 
 * @param {number} times 
 * @returns {array}
 */
function rotateArray(array, times){
  const rotatedArray = array.map(x => x)
  while (times--) {
    const temp = rotatedArray.shift();
    rotatedArray.push(temp)
  }
  return rotatedArray
}

/**
 * Sort specs in a way the selected spec stays in
 * the first positions. This is a customization for
 * specs selectors where only some specs are visible.
 * @param {string[]} originalSpecOrder 
 * @param {string} selectedSpec 
 * @param {number} numberOfVisibleSpecs 
 * @returns {string[]} spec order but with visible first
 */
function sortSpecsByVisibleFirst(originalSpecs, selectedSpec, numberOfVisibleSpecs) {
  const desiredMiddlePosition = Math.floor(numberOfVisibleSpecs / 2)
  const selectedSpecPosition = originalSpecs.indexOf(selectedSpec)
  const isAlreadyVisible = selectedSpecPosition + 1 <= numberOfVisibleSpecs
  if (isAlreadyVisible) {
    return originalSpecs
  }
  const isLastSpec = !originalSpecs[selectedSpecPosition + 1]
  const positionsDiff = selectedSpecPosition - desiredMiddlePosition 
  const rotateTimes = positionsDiff - (isLastSpec ? 1 : 0)
  const specs = rotateArray(originalSpecs, rotateTimes)
  return specs
}

describe('Show selected spec in the first positions', () => {
  it("keep as it is if it's already in the first positions", () => {
    const specs = sortSpecsByVisibleFirst(originalSpecs, 'pp', 3)
    expect(specs).toEqual(originalSpecs)
  })

  it('with m being the selected spec from original specs', () => {
    const expected = [ 'p', 'm', 'g', 'gg', 'ggg', 'gggg', 'pppp', 'ppp', 'pp']
    const specs = sortSpecsByVisibleFirst(originalSpecs, 'm', 3)
    expect(specs).toEqual(expected)
  })

  it('with ggg being the selected spec from original specs', () => {
    const expected = ['gg', 'ggg', 'gggg', 'pppp', 'ppp', 'pp', 'p', 'm', 'g']
    const specs = sortSpecsByVisibleFirst(originalSpecs, 'ggg', 3)
    expect(specs).toEqual(expected)
  })

  it('with the last spec being the selected spec from original specs', () => {
    const expected = ['gg', 'ggg', 'gggg', 'pppp', 'ppp', 'pp', 'p', 'm', 'g']
    const specs = sortSpecsByVisibleFirst(originalSpecs, 'gggg', 3)
    expect(specs).toEqual(expected)
  })

  it('with gg being selected from custom specs ', () => {
    const customSpecs = ['pp', 'p', 'g', 'gg', 'gggg']
    const expected = ['g', 'gg', 'gggg', 'pp', 'p']
    const specs = sortSpecsByVisibleFirst(customSpecs, 'gg', 3)
    expect(specs).toEqual(expected)
  })

  it('with gg being selected from another custom specs ', () => {
    const customSpecs = ['pp', 'p', 'm', 'gg']
    const expected = ['p', 'm', 'gg', 'pp']
    const specs = sortSpecsByVisibleFirst(customSpecs, 'gg', 3)
    expect(specs).toEqual(expected)
  })
}) 
