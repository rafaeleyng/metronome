import PlayScoreStrategy from './'

describe('PlayScoreStrategy', () => {
  it('should return always a bar with same properties', () => {
    // arrange
    const barGroups = [
      { beats: 3, tempo: 120 },
      { beats: 2, tempo: 90 },
      { beats: 5, tempo: 160 },
    ]

    const strategy = new PlayScoreStrategy({ barGroups })

    // act / assert
    expect(strategy.nextBar()).toEqual({ beats: 3, tempo: 120 })
    expect(strategy.nextBar()).toEqual({ beats: 2, tempo: 90 })
    expect(strategy.nextBar()).toEqual({ beats: 5, tempo: 160 })
    expect(strategy.nextBar()).toEqual(undefined)
    expect(strategy.nextBar()).toEqual(undefined)
    expect(strategy.nextBar()).toEqual(undefined)
  })
})
