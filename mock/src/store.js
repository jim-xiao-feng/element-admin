import { cloneDeep } from 'lodash'
import fixtures from './fixtures'

export const select = (name, key) => {
  if (!key && fixtures[name]) {
    return cloneDeep(fixtures[name])
  }
  if (key && fixtures[name][key]) {
    return cloneDeep(fixtures[name][key])
  }
}

export const update = (name, key, data) => {
  if (!key) {
    throw new Error('Need a exact key to add/update data')
  }
  if (fixtures[name]) {
    if (fixtures[name][key]) {
      Object.assign(fixtures[name][key], { ...data })
    } else {
      Object.assign(fixtures[name], { ...data })
    }
  } else {
    throw new Error('Need a exact store name to add/update data')
  }
}

export const remove = (name, key) => {
  if (!key) {
    throw new Error('Need a exact key to delete data')
  }
  if (fixtures[name]) {
    delete fixtures[name][key]
  } else {
    throw new Error('Need a exact store name to delete data')
  }
}
