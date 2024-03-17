/**
 * Configuration for frontend app URLs.
 * Loaded from .env file. Variable names should start with VITE_.
 * @type {string}
 */
export const baseUrl = import.meta.env.VITE_BASE_URL;
export const frontendUrlProd = import.meta.env.VITE_frontendUrlProd;
export const frontendUrlProdCode = import.meta.env.VITE_frontendUrlProd + "/code";
export const frontendUrlDev = import.meta.env.VITE_frontendUrlDev;

// console.log("baseUrl", baseUrl);
// console.log("frontendUrlProd", frontendUrlProd);
// console.log("frontendUrlProdCode", frontendUrlProdCode);
// console.log("frontendUrlDev", frontendUrlDev);
//test
