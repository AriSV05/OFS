import mysql from "serverless-mysql";

export const connexion = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "rootpasswor000d",
    port: 3306,
    database: "OFS",
  },
});
