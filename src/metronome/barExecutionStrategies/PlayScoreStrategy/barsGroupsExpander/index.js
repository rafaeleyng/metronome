import times from 'lodash/times'

const barsGroupsExpander = barsGroups =>
  barsGroups.reduce((acc, barsGroup) =>
    acc.concat(times(barsGroup.quantity, () => ({ beats: barsGroup.beats, tempo: barsGroup.tempo }))), [])

export default barsGroupsExpander
