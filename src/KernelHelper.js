/**
 * Return a Vue route object (https://router.vuejs.org/api/#route-object-properties)
 * to tell the kernel which route to go
 *
 * @param routeName
 * @returns {{name: *}}
 */
export function redirect(routeName) {
    return {
        name: routeName
    }
}

/**
 * Returns null to tell the kernel to proceed with the next request.
 *
 * @returns {null}
 */
export function next() {
    return null;
}
