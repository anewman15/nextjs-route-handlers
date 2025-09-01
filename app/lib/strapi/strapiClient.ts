import { strapi } from "@strapi/client";

const strapiClient = strapi({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  auth: process.env.API_TOKEN_SALT,
});

export const revenues = strapiClient.collection("revenues");
export const invoices = strapiClient.collection("invoices");
export const customers = strapiClient.collection("customers");
