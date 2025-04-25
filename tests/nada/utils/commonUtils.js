// emailUtils.js
// emailUtils.js (ES Module)
export function generateUniqueEmail() {
    const timestamp = Date.now(); // Gets the current timestamp
    return `test_nada_${timestamp}@yopmail.com`;
}