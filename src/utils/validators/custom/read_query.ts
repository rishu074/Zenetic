// Validates queries in read requests
// ?filters={}
// ?limit=50/100 etc
// ?page=3

import FlowCoord from "../../globals/FlowCoord";
import CustomValidatorError from "../../globals/structures/custom_validator_error";

/**
 * 
 * @param limit Array of limit [lowest, highest]
 * @returns sets this.local.filters, this.local.limit and this.local.page
 */
export default function GetReadQueryValidator(limit: [number, number]) {
    return function (this: FlowCoord) {
        var message: string | undefined;
        // Validate ?filters
        const _throw_invalid_filters = () => { throw new CustomValidatorError(`Invalid filters`, { key: "filters", value: this.req.query.filters, in: "QueryParams", message }) }


        const _throw_invalid_limit = () => { throw new CustomValidatorError(`Invalid limit`, { key: "limit", value: this.req.query.limit, in: "QueryParams", message }) }


        const _throw_invalid_page = () => { throw new CustomValidatorError(`Invalid page`, { key: "page", value: this.req.query.page, in: "QueryParams", message }) }

        try {
            if (this.req.query.filters === undefined) {
                message = "No filters provided."
                _throw_invalid_filters()
            };
            this.local.filters = JSON.parse(this.req.query.filters as string);
        } catch (error) {
            message = "Invalid json"
            _throw_invalid_filters()
        }

        // Validate limit
        try {
            const _limit = parseInt(this.req.query.limit as any);
            if (_limit === undefined || Number.isNaN(_limit)) {
                message = "limit is not a number."
                _throw_invalid_limit()
            };

            if (_limit < limit[0] || _limit > limit[1]) {
                message = `limit must be less than ${limit[1]} and greater than ${limit[0]}`;
                _throw_invalid_limit()
            };
            this.local.limit = _limit;
        } catch (error: any) {
            if (!(error instanceof CustomValidatorError)) {
                message = error?.message || "undefined error";
            }
            _throw_invalid_limit()
        }

        // Validate page
        try {
            const page = parseInt(this.req.query.page as any);
            if (page === undefined || Number.isNaN(page)) {
                message = "page is not a number";
                _throw_invalid_page()
            };

            if (page === 0) {
                message = "Pagination starts at 1.",
                    _throw_invalid_page()
            };
            this.local.page = page;
        } catch (error: any) {
            if (!(error instanceof CustomValidatorError)) {
                message = error?.message || "undefined error [2]"
            }
            _throw_invalid_page()
        }
    }
}