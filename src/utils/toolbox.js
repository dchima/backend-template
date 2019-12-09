/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import joi from '@hapi/joi';
import env from '../config/env';
import ApiError from './apiError';

const { SECRET, PORT } = env;

/**
 * Class for api tools methods
 *
 * @class Toolbox
 */
export default class Toolbox {
  /**
   * Synchronously sign the given payload into a JSON Web Token string.
   * @static
   * @param {string | number | Buffer | object} payload Payload to sign.
   * @param {string | number} expiresIn Expressed in seconds or a string describing a
   * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 1day.
   * @memberof Toolbox
   * @returns {string} JWT token.
   */
  static createToken(payload, expiresIn = '1d') {
    return jwt.sign(payload, SECRET, { expiresIn });
  }

  /**
   * Synchronously sign the given payload into a JSON Web Token string that never expires.
   * @static
   * @param {string | number | Buffer | object} payload Payload to sign.
   * @memberof Toolbox
   * @returns {string} JWT token.
   */
  static createEternalToken(payload) {
    return jwt.sign(payload, SECRET);
  }

  /**
   *
   *  Synchronously verify the given JWT token using a secret
   * @static
   * @param {*} token - JWT token.
   * @returns {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   * @memberof Toolbox
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET);
    } catch (err) {
      throw new ApiError(400, 'Invalid Token');
    }
  }

  /**
   * Hashes a password
   * @static
   * @param {string} password - Password to encrypt.
   * @memberof Toolbox
   * @returns {string} - Encrypted password.
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
   * Compares a password with a given hash
   * @static
   * @param {string} password - Plain text password.
   * @param {string} hash - Encrypted password.
   * @memberof Toolbox
   * @returns {boolean} - returns true if there is a match and false otherwise.
   */
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} data - The payload.
   * @param {number} code -  HTTP Status code.
   * @memberof Toolbox
   * @returns {JSON} - A JSON success response.
   */
  static successResponse(res, data, code = 200) {
    return res.status(code).json({
      status: 'success',
      data
    });
  }

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - The payload.
   * @param {number} options.code -  HTTP Status code, default is 500.
   * @param {string} options.message -  Error message.
   * @param {object|array  } options.errors -  A collection of  error message.
   * @memberof Toolbox
   * @returns {JSON} - A JSON failure response.
   */
  static errorResponse(res, { code = 500, message = 'Some error occurred while processing your Request', errors }) {
    return res.status(code).json({
      status: 'fail',
      error: {
        message,
        errors
      }
    });
  }

  /**
   * Generates email verification link
   * @static
   * @param { Request } req - Request object
   * @param { string } id - User's unique ID.
   * @param { string } email - User's email.
   * @memberof Toolbox
   * @returns {URL} - Verification link.
   */
  static createVerificationLink(req, { id, email }) {
    const token = Toolbox.createToken({ id, email });
    const host = req.hostname === 'localhost' ? `${req.hostname}:${PORT}` : req.hostname;
    return `${req.protocol}://${host}/v1.0/api/auth/verify?token=${token}`;
  }

  /**
   * Generates email password reset link
   * @param {*} req
   * @param {*} id
   * @param {*} email
   * @returns {URL} - password reset link
   * @memberof Toolbox
   */
  static createPasswordResetLink(req, { id, email }) {
    const token = Toolbox.createToken({ id, email }, '5h');
    return `${req.protocol}://${req.get('host')}/v1.0/api/auth/reset-password/email?token=${token}`;
  }

  /**
   * Validates a value using the given Joi schema
   * @param {object} value
   * @param {Joi.SchemaLike} schema
   * @returns {Promise} Validation result
   */
  static validate(value, schema) {
    return joi.validate(value, schema, { abortEarly: false, allowUnknown: true });
  }

  /**
   * Checks token from request header for user authentication
   * @param {object} req - The request from the endpoint
   * @memberof Toolbox
   * @returns {Token} Token
   */
  static checkToken(req) {
    const {
      headers: { authorization },
      cookies: { token: cookieToken }
    } = req;
    let bearerToken = null;
    if (authorization) {
      bearerToken = authorization.split(' ')[1]
        ? authorization.split(' ')[1] : authorization;
    }
    return cookieToken || bearerToken || req.headers['x-access-token'] || req.headers.token || req.body.token;
  }

  /**
   * Extracts Array Records from sequelize object.
   * @static
   * @param {array} dataArray - An array of unformatted records.
   * @memberof Toolbox
   * @returns { array } - An array containing formatted records.
   */
  static extractArrayRecords(dataArray) {
    return dataArray.map(({ dataValues }) => dataValues);
  }

  /**
   * Adds new properties to the items of a collection.
   * @static
   * @param {array} collection - An array of objects.
   * @param {object} options - An object with properties to be added to the items of a collection.
   * @returns {Promise<Array>} A promise object with an updated collection.
   * @memberof Toolbox
   */
  static async updateCollection(collection, options) {
    return collection.map((item) => {
      const newItem = { ...item, ...options };
      return newItem;
    });
  }

  /**
   * match id input array with equivalent item ids in database
   * @static
   * @param {array} items - item array with ids
   * @param {array} databaseItems = databaese items array with equivalent values
   * @returns {boolean} true if all input items match items in database, false if not
   * @memberof Toolbox
   */
  static matchIds(items, databaseItems) {
    let allItemsMatch = true;
    items.forEach((id) => {
      const match = databaseItems.find((databaseValue) => databaseValue.id === id);
      if (match === undefined) allItemsMatch = false;
    });
    return allItemsMatch;
  }
}
