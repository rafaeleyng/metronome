import RepeatSingleBarStrategy from './'

describe('RepeatSingleBarStrategy', () => {
  it('should return always a bar with same properties', () => {
    // arrange
    const strategy = new RepeatSingleBarStrategy({ beats: 5, tempo: 112 })

    for (let i = 0; i < 50; i += 1) {
      // act
      const nextBar = strategy.nextBar()

      // assert
      expect(nextBar).toEqual({ beats: 5, tempo: 112 })
    }
  })
})
