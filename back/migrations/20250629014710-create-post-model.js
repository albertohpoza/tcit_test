'use strict'

import { postAttributes } from '../src/api/post/post.model'

/**
 * With postAttributes we can spread whole attr model config
 */
module.exports = (() => {
  return {
    up: (sequelize, DataTypes) => {
      return sequelize.createTable('posts', {
        ...postAttributes(DataTypes)
      })
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('posts')
    }
  }
})()
