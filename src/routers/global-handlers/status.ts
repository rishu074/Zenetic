import CreateRequestHandler from "../../utils/globals/ReqHandler";
import ServerError from "../../utils/globals/error-handlers/ServerError";

// function ExtractUserPermissions(user: { roles: RoleI[] }) {
//     let permissions = [];

//     for (let i = 0; i < user.roles.length; i++) {
//         permissions.push(...user.roles[i].permissions);
//     }

//     return permissions;
// }
// ExtractUserPermissions(await ((await GetUsers({}, {roles: true}))[0]).populate<{roles: RoleI[]}>("roles"))

const STATUS_HANDLER = CreateRequestHandler(async function () {
    this.send({
        status: 200,
        message: "The service is up and ready to serve."
    })

}, [ServerError])

export default STATUS_HANDLER;