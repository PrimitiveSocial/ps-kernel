/**
 * Return a Vue route object (https://router.vuejs.org/api/#route-object-properties)
 * to tell the kernel which route to go
 *
 * @param route
 * @returns route
 */
export function redirect(route) {
    return route
}

/**
 * Returns null to tell the kernel to proceed with the next request.
 *
 * @returns {null}
 */
export function next() {
    return null;
}
