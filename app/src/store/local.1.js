const localEvent = {
  StorageGetter: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  StorageSetter: function (key, val) {
    return localStorage.setItem(key, JSON.stringify(val))
  }
}

export default localEvent
