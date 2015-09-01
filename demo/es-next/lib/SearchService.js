/**
 *
 */
class SearchService {
  constructor ($timeout) {
    this.timeout = $timeout
  }

  fetch (txt) {
    // return a promise
    return this.timeout(() => {
      if(!txt) {
        return {items: [], len: 0}
      }

      var res = []
      for (var i = 0; i < 10; i++) {
        res.push(txt + i)
      }
      return {items: res, len: res.length}
    }, 100)
  }
}

SearchService.$inject = ['$timeout']

export { SearchService }