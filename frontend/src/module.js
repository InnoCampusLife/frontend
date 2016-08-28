/**
 * Creates an instance of Module.
 * 
 * @param {string} name
 * @param {Array<string>} userTypes (ascending)
 */
function Module (name, userTypes) {
    this.name = name;
    this.userTypes = userTypes;
    

    /**
     * Checks if a user has a specific role in a module
     * 
     * @param {user} user
     * @param {string} ofType
     * @returns boolean
     */
    this.is = function (user, ofType) {
        if (user.roles[this.name] !== null && user.roles[this.name] !== undefined && user.roles[this.name].toLowerCase() === ofType.toLowerCase())
            return true;
        else
            return false;
    }

    /**
     * Checks if a module has a specific role
     * 
     * @param {string} role
     * @returns boolean
     */
    this.get = function (role) {
        return this.userTypes[this.userTypes.indexOf(role)];
    }
}

module.exports = Module;