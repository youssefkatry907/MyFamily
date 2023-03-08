
let parentEndPoints = [
    "/parent/register", "/parent/login", "/parent/resetPassword", "/parent/logout"
]

parentEndPoints = new Set(parentEndPoints);

let permissions = new Map();

permissions.set("parent", parentEndPoints);

module.exports = permissions;