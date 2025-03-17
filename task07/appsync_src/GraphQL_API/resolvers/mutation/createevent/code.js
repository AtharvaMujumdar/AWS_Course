import { util } from '@aws-appsync/utils';

/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {
    const id = ctx.util.autoId(); // Generate UUID
    const createdAt = ctx.util.time.nowISO8601(); // Generate timestamp
    return {
        operation: "PutItem",
        key: { id: { S: id } },
        attributeValues: {
            id: { S: id },
            userId: { N: ctx.args.userId.toString() },
            createdAt: { S: createdAt },
            payLoad: { S: JSON.stringify(ctx.args.payLoad) }
        }
    };
}


/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
    if (!ctx.result) {
        return null;
    }
    
    return {
        id: ctx.result.id.S,
        createdAt: ctx.result.createdAt.S
    };
}

