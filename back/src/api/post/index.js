/* eslint-disable camelcase */
import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { index, show, create, update, destroy } from './post.controller'
import { postDataSchema } from './post.model'

const router = new Router()
const {
        name,    description,
} = postDataSchema

/**
 * @api {get} /posts Retrieve posts
 * @apiName Retrieveposts
 * @apiGroup post
 * @apiPermission admin
 * @apiParam {String} access_token post access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)



/**
 * @api {get} /posts/:id Retrieve post
 * @apiName Retrievepost
 * @apiGroup post
 * @apiPermission public
 * @apiSuccess {Object} post post's data.
 * @apiError 404 post not found.
 */
router.get('/:id',
  show)

/**
 * @api {post} /posts Create post
 * @apiName Createpost
 * @apiGroup post
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Sucess 201) {Object} post post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  master(),
  body({
      ...postDataSchema
  }),
  create)

/**
 * @api {put} /posts/:id Update post
 * @apiName Updatepost
 * @apiGroup post
 * @apiPermission post
 * @apiParam {String} access_token post access_token.
 * @apiSuccess {Object} post post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current post or admin access only.
 * @apiError 404 post not found.
 */
router.put('/:id',
  token({ required: true }),
  body({
      ...postDataSchema
  }),
  update)


/**
 * @api {delete} /posts/:id Delete post
 * @apiName Deletepost
 * @apiGroup post
 * @apiPermission admin
 * @apiParam {String} access_token post access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 post not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
