import CreateRequestHandler from "../../utils/globals/ReqHandler";

const NOT_FOUND_HANDLER = CreateRequestHandler(function() {
    this.send({
        status: 404,
        message: "The requested resource was not found."
    })
}, [])

export default NOT_FOUND_HANDLER