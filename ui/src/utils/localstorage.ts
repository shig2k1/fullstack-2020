import localforage from 'localforage'

const NAME = 'localdb'

class Session {
  static _instance: Session
  private _store!: LocalForage

  constructor () {
    if (!Session._instance) {
      this.create(NAME)

      Session._instance = this
    }

    return Session._instance
  }

  public create (name: string) {
    this._store = localforage.createInstance({
      name
    })
  }

  get localStorage () {
    return this._store
  }
}

const session = new Session()
Object.freeze(session)

export default session
