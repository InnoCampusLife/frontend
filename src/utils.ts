import storage from './storage'
import config from './config'

export function token () { return storage.getItem(config.tokenName) }