const Joi = require("joi");

const itemSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    description: Joi.string().optional(),
    stock: Joi.number().integer().min(0).required(),
    brand: Joi.string().optional(),
    rating: Joi.number().min(0).max(5).optional()
});

function validateItem(req, res, next) {
    const { error } = itemSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
}

module.exports = { validateItem };