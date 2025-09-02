const {defaultCtx} = require("../utils/context");
const db = require("./database");
const {errorHandler} = require("../utils/errorCodes");

async function login(req,where,ctx = defaultCtx){
    try {
        console.log("comes for login admin")
        const user = await db.findUnique(ctx,'Admin',where);
        console.log("login by admin",user);
        return user;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
async function register(req,data,ctx = defaultCtx){
    try {
        const user = await db.create(ctx,'Admin',data);
        console.log("created user",user);
        return user;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
async function forgotPassword(req,where,data,ctx = defaultCtx){
    try {
        const user = await db.update(ctx,'Admin',where,data);
        console.log("updated admin password",user);
        return user;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
async function findAdmin(req,where,ctx = defaultCtx){
    try {
        const admin = await db.findUnique(ctx,'Admin',where);
        console.log("admin",admin);
        return admin;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}

module.exports = {
    login,
    register,
    forgotPassword,
    findAdmin
}