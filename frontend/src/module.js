class Module {
    /**
     * Creates an instance of Module.
     * 
     * @param {string} name
     * @param {Array<string>} userTypes (ascending)
     */
    constructor (name, userTypes) {
        this.name = name;
        this.userTypes = userTypes;
    }
    
    /**
     * Checks if a user has a specific role in a module
     * 
     * @param {user} user
     * @param {string} ofType
     * @returns boolean
     */
    is (user, ofType) {
        return user.roles[this.name] 
            && this.has(ofType)
            && user.roles[this.name].toLowerCase() == ofType.toLowerCase();
    }

    /**
     * Checks if a module has a specific role
     * 
     * @param {string} role
     * @returns boolean
     */
    has (role) {
        return this.userTypes.indexOf(role) > -1;
    }
}
module.exports = Module;