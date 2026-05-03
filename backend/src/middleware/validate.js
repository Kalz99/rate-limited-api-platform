const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {

        if (err.name === 'ZodError' || err instanceof z.ZodError) {
            const issues = err.issues || err.errors || [];
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: issues[0]?.message || "Validation failed"
                }
            });
        }


        next(err);
    }
};

module.exports = validate;