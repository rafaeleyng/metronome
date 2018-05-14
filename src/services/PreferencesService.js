export const PREFERENCE_TYPE_STR = {
  serialize: str => str,
  parse: str => str,
}

export const PREFERENCE_TYPE_INT = {
  serialize: str => str,
  parse: str => parseInt(str, 10),
}

export const PREFERENCE_TYPE_OBJ = {
  serialize: str => JSON.stringify(str),
  parse: str => JSON.parse(str),
}

class PreferencesService {
  static usedPrefixes = []

  constructor(prefix) {
    if (!prefix) {
      throw new Error('PreferencesService constructor requires a prefix')
    }

    if (PreferencesService.usedPrefixes.includes(prefix)) {
      throw new Error(`PreferencesService constructor requires an unused prefix, ${prefix} was already used`)
    }

    this.prefix = prefix
  }

  buildPreference(key, type) {
    return {
      key: `${this.prefix}:${key}`,
      type,
    }
  }

  /* eslint-disable class-methods-use-this */
  set(preference, value) {
    localStorage.setItem(preference.key, preference.type.serialize(value))
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  get(preference) {
    return preference.type.parse(localStorage.getItem(preference.key))
  }
  /* eslint-enable class-methods-use-this */
}

export default PreferencesService
