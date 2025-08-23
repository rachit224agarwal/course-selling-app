const jwtSecretUser = process.env.JWT_USER_SECRET;
const jwtSecretAdmin = process.env.JWT_ADMIN_SECRET;

module.exports = {
    jwtSecretAdmin,
    jwtSecretUser
}