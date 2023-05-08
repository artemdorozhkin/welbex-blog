import { DataTypes } from "sequelize";
import sequelize from "../db.js";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePostInput:
 *      type: object
 *      required:
 *        - message
 *      properties:
 *        message:
 *          type: string
 *        file:
 *          type: string
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        message:
 *          type: string
 *        file:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },

  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  file: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Post);
Post.belongsTo(User);
