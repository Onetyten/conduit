import Joi from 'joi'

export const newUserValidationSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required().messages({
        'string.base':"Firstname must be text",
        'string.empty':"Firstname is required",
        'string.min' : "Firstname must be at least 3 characters",
        'string.max' : "Firstname cannot exceed 50 characters",
        'any.required': "Firstname is required",
    }),
    lastName: Joi.string().min(3).max(50).required().messages({
        'string.base':"Lastname must be text",
        'string.empty':"Lastname is required",
        'string.min' : "Lastname must be at least 3 characters",
        'string.max' : "Lastname cannot exceed 50 characters",
        'any.required': "Lastname is required",
    }),

    email: Joi.string().email().required().messages({
        'string.email': "please provide a vailid email address",
        'string.empty': "Email is required",
        'any.required': "Email is required"
    }),

    phoneNumber: Joi.object({
        code:Joi.string(),
        num:Joi.string()
    }).optional().messages({
        'object.base':'phone number is required',
        'any.required':'phone number is required'
    }),

    isTalent: Joi.boolean().optional().messages({
        'boolean.base': 'isTalent must be true or false',
        'any.required': 'isTalent is required'
    }),
    bio: Joi.string().optional().allow(null).max(500).messages({
        'string.base':'bio must be text',
        'string.max': 'your bio cannot exceed 500 words'
    }),
    socialLinks: Joi.object().optional().default({}).messages({
        'object.base': 'Social links must be an object'
    }),
    location: Joi.object({
        district:Joi.string().optional(),
        state:Joi.string().optional(),
        country:Joi.string().optional()
    }).optional().messages({
        'object.base': 'Location must be an object'
    }),
    skills: Joi.array().items(Joi.string()).optional().default([]).messages({
        'array.base':'please include your skills',
        'array.includes': 'Each skill must be text'
    }),
    password: Joi.string().min(8).max(100).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password cannot exceed 100 characters',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    }),
  
    profileImage: Joi.object().optional().allow(null).messages({
        'object.base': 'Profile image must be a file'
    })
})
