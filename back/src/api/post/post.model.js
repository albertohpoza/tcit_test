/**
 * From queryman lib syntaxis (Check https://www.npmjs.com/package/bodymen)
 * Which could be use as validating fetching tool at controller or event at express
 * example of schema definitions:
 * attribute: {
 *   type: String,
 *   match: /^\S+@\S+\.\S+$/,
 *   required: true,
 *   unique: true,
 *   trim: true,
 *   lowercase: true,
 *   minlength: 6,
 *   enum: roles
 * }
 *
 */
export const postDataSchema = {
        name: 
   {  
       type:  String,
       required: true 
   }, 
    description: 
   {  
       type:  String,
       required: true 
   } 

}

/**
 * This method build usefull attr to be declared in many places as it could be necessary (migrations example)
 * @param {*} DataTypes From Sequelize instance
 */
export const postAttributes = (DataTypes) => {
  return {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },    
      name: 
   {  
       type:  DataTypes.STRING,
       allowNull: false 
   }, 
    description: 
   {  
       type:  DataTypes.STRING,
       allowNull: false 
   } 
  
  }
}


/**
 * Sequelize model
 */
export default (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    ...postAttributes(DataTypes)
  }, {
    tableName: 'posts',
    hooks: {
      /**
       * hooks methods from models recognize some
       * lifecycle hooks from the user model component
       * to execute some custom 'scripts' on them
       * (Check https://sequelize.org/master/manual/hooks.html)
       */
      beforeSave: async (user) => {
        // My before save logic
      }
    }
  });

  post.associate = function(models) {
    /**
     * An example of association is the follow
     * Guess post has a collection of cookies table.
     * At the same time, cookies just saves one reference 
     * (foreign key) to it's post's
     * 
     *   models.post.hasMany(models.cookie, {
     *     as: 'cookies', allowNull: true
     *   }, {
     *     onDelete: 'CASCADE',
     *     hooks: true
     *   })
     * 
     * At cookie.model.js must be declared the reference to it's post owner 
     * on associate function as follow:
     * 
     *   models.cookie.belongsTo(models.post, {
     *     foreignKey: 'postId',
     *     allowNull: true
     *   })
     * 
     * 
     */
  };

  return post;
}



  