const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().min(10).max(32).required(),
  description: Joi.string().min(20).max(128).required(),
  isbn: Joi.string().max(32).required()
});

const validator = (req, res, next) => {
    const {error} = schema.validate(req.body);

    if (error) {
        const message = {message: error.details[0].message.replace('"', "'")
        .replace('"', "'")}; 

        return res.status(400).send(message);
    } 
    
    next();
}

module.exports = validator;