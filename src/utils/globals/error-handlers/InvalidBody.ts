import FlowCoord from "../FlowCoord";
import ResponseMessages from "../structures/res-messages";

export default function InvalidBodyError(this: FlowCoord, error?: any): boolean {
    const ParseError = (er: any): any => {
        if(er?.length > 0) {
            return er.map((el: any) => el.message || el)
        } else return er
    }


    this.send({
        status: 400,
        message: ResponseMessages.INVALID_BODY,
        error: ParseError(error)
    })

    // All the error handlers must return a boolean specifying if the error was handled or not.
    return true
}