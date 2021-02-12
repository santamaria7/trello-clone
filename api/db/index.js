//Apparently this file gets transpiled before app.js so we need to use dotenv
// here to add our env to the process.
// Otherwise the database connection with our user won't happen.

import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();




class Connection {
  static instance;
  db;
  constructor() {
    this.createConnection()
  }
  createConnection(){
    this.db = mysql.createConnection({
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Connection();
    return this.instance;
  }
}

export const { db } = Connection.getInstance();
