
import { success, notFound } from '../../services/response'
import models from '../../services/sequelize'
import consoleColors from '../../utils/console_colors'
import { errorHandler } from '../../utils/error_handler'

export const index = async ({ querymen: { query, select, cursor } }, res, next) => {
  try {
    const posts = await models.post.findAll()
    success(res, 200)({ posts: posts })
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

export const show = async ({ params }, res, next) => {
  try {
    const s = await models.post.findOne({ where: { id: params.id } })
    if (s != null) success(res)({ post: s })
    else notFound(res)({})
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

/**
 * This method creates a new post by using bodymen and other usefull functions from the response service, check it ;)
 * @param {*} param0 params from the request, getting it with bodymen
 * @param {*} res res object to return to fetcher
 * @param {*} next next function from Express to go through the next middleware on the fetch
 */
export const create = async ({ bodymen: { body } }, res, next) => {
  try {
    const newpost = await models.post.build(body)
    if (newpost) {
      await newpost.save()
            if (newpost.id) {
                success(res, 200)(newpost)
            } else throw 'Cant save the post on DB'
        } else throw 'Cant build the post model'
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

export const update = async ({ bodymen: { body }, params, post }, res, next) => {
  try {
    const s = await models.post.update(body, { where: { id: params.id } })
    if (s != null) success(res)({ msj: 'post updated', post: s })
    // eslint-disable-next-line no-throw-literal
    else throw 'post dont exist!'
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

export const destroy = async ({ params }, res, next) => {
  try {
    const s = await models.post.findOne({ where: { id: params.id } })
    const deleted = await s.destroy()
    success(res, 200)({ msj: 'post deleted', post: deleted })
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}
