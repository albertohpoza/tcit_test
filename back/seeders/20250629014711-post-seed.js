'use strict'
import postFactory from '../src/api/post/post.factory'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let postsArray = []
    const posts = await postFactory.buildMany('post', 100)
    posts.map(postFactory => {
      postsArray.push(postFactory.dataValues)
    })
    postsArray = postsArray.map(post => { delete post.id; return post })
    return queryInterface.bulkInsert('posts', postsArray, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {})
  }
}
