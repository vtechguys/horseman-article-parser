const parser = require('./index.js')

/** add some names | https://observablehq.com/@spencermountain/compromise-plugins */
const testPlugin = function (Doc, world) {
  world.addWords({
    rishi: 'FirstName',
    sunak: 'LastName'
  })
}

const options = {
  url:
    'https://www.theguardian.com/commentisfree/2020/jul/08/the-guardian-view-on-rishi-sunak-right-words-right-focus-wrong-policies',
  enabled: [
    'lighthouse',
    'screenshot',
    'links',
    'sentiment',
    'entities',
    'spelling',
    'keywords'
  ],
  nlp: {
    plugins: [testPlugin]
  }
}

async function test () {
  const Axios = require('axios')
  const url =
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search'
  const page = (await Axios.get(url)).data
  // console.log(page)
  parser
    .parseArticleFromHtmlString(page, url, options)
    .then(function (article) {
      console.log(article.processed.text)
    })
    .catch(function (error) {
      console.log(error.message)
      console.log(error.stack)
    })
}
test()
