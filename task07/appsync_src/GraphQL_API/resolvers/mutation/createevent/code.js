import { util } from '@aws-appsync/utils';

/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {
    const { userId, payLoad } = ctx.args;

    const event = {
        id: util.autoId(),  // Generates a UUID
        userId,
        createdAt: util.time.nowISO8601(),
        payLoad
    };

    return {
        operation: 'PutItem',
        key: { id: { S: event.id } },
        attributeValues: util.dynamodb.toMapValues(event)
    };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
    return ctx.result ? ctx.result.attributes : null;
}

