let joi = require("joi")


module.exports = {
    registerValidation: {
        body: joi.object().required().keys({
            language: joi.string().optional().messages({
                "string.base": "please enter a valid language",
                "any.required": "language must be entered",
                "string.empty": "language cannot be empty"
            }),

            name: joi.string().required().messages({
                "string.base": "please enter a valid name",
                "any.required": "name must be entered",
                "string.empty": "name cannot be empty"
            }),

            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).empty().required().messages({
                "string.email": "please enter a valid email",
                "any.required": "email must be entered",
                "string.empty": "email cannot be empty"
            }),


            password: joi.string().empty().required().min(8).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 8 characters"
            }),

            otherParentName: joi.string().optional().messages({
                "string.base": "please enter a valid Parent name",
                "any.required": "Parent name must be entered",
                "string.empty": "Parent name cannot be empty"
            }),

            otherParentEmail: joi.string().optional().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).empty().optional().messages({
                "string.email": "please enter a valid email",
                "any.required": "email must be entered",
                "string.empty": "email cannot be empty"
            }),

            familyUsername: joi.string().required().messages({
                "string.base": "please enter a valid username",
                "any.required": "username must be entered",
                "string.empty": "username cannot be empty",
            }),

            familyPassword: joi.string().empty().required().min(8).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 8 characters"
            }),

            helpersNo: joi.number().optional().messages({
                "number.base": "please enter a valid number",
                "any.required": "number must be entered",
                "string.empty": "number cannot be empty"
            }),

            childrenNo: joi.number().optional().messages({
                "number.base": "please enter a valid number",
                "any.required": "number must be entered",
                "string.empty": "number cannot be empty"
            }),

            helpers: joi.array().optional().messages({
                "array.base": "please enter a valid helpers"
            }),

            children: joi.array().optional().messages({
                "array.base": "please enter a valid children"
            }),


            image: joi.object().optional().messages({
                "object.base": "please enter a valid image"
            }),
            role: joi.string().optional().messages({
                "string.base": "please enter a valid role",
                "any.required": "role must be entered",
                "string.empty": "role cannot be empty"
            }),
        })
    },

    loginValidation: {
        body: joi.object().required().keys({

            familyUsername: joi.string().required().messages({
                "string.base": "please enter a valid username",
                "any.required": "username must be entered",
                "string.empty": "username cannot be empty"
            }),

            familyEmail: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).empty().required().messages({
                "string.email": "please enter a valid email",
                "any.required": "email must be entered",
                "string.empty": "email cannot be empty"
            }),

            familyPassword: joi.string().empty().required().min(8).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 8 characters"
            })
        })
    },



    resetPasswordValidation: {
        body: joi.object().required().keys({

            newPassword: joi.string().empty().required().min(8).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 8 characters"
            })
        })
    },
}