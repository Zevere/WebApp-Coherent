export function ensureSuccessResponse(resp: any) {
    if (Array.isArray(resp.errors) && resp.errors.length) {
        throw resp.errors[0].message || 'Sorry! an unexpected error happened';
    }
}
