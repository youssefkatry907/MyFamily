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


            password: joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.pattern.base": "please enter a valid family password A-Z, a-z, 1-9, special character"
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
                "string.empty": "username cannot be empty"
            }),

            familyPassword: joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.pattern.base": "please enter a valid password A-Z, a-z, 1-9, special character"
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


            familyPassword: joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
                .messages({
                    "string.base": "please enter a valid password",
                    "any.required": "password must be entered",
                    "string.empty": "password cannot be empty",
                    "string.pattern.base": "please enter a valid password A-Z, a-z, 1-9, special character"
                })
        })
    },


    resetPasswordValidation: {
        body: joi.object().required().keys({

            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).empty().required().messages({
                "string.email": "please enter a valid email",
                "any.required": "email must be entered",
                "string.empty": "email cannot be empty"
            }),


            newPassword: joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
                .messages({
                    "string.base": "please enter a valid new password",
                    "any.required": "new password must be entered",
                    "string.empty": "new password cannot be empty",
                    "string.pattern.base": "please enter a valid new password A-Z, a-z, 1-9, special character"
                })
        })
    },
}