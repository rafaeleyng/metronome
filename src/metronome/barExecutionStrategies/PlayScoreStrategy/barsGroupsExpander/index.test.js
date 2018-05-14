import barsGroupsExpander from './'

describe('barsGroupsExpander', () => {
  it('should expand grouped bars to full representation', () => {
    // arrange
    const barGroups = [
      { quantity: 1, beats: 3, tempo: 120 },
      { quantity: 4, beats: 2, tempo: 90 },
      { quantity: 3, beats: 5, tempo: 160 },
    ]

    const expanded = barsGroupsExpander(barGroups)

    // act / assert
    expect(expanded[0]).toEqual({ beats: 3, tempo: 120 })

    expect(expanded[1]).toEqual({ beats: 2, tempo: 90 })
    expect(expanded[2]).toEqual({ beats: 2, tempo: 90 })
    expect(expanded[3]).toEqual({ beats: 2, tempo: 90 })
    expect(expanded[4]).toEqual({ beats: 2, tempo: 90 })

    expect(expanded[5]).toEqual({ beats: 5, tempo: 160 })
    expect(expanded[6]).toEqual({ beats: 5, tempo: 160 })
    expect(expanded[7]).toEqual({ beats: 5, tempo: 160 })

    expect(expanded[8]).toEqual(undefined)
  })
})
