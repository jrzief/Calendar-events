const sql = require('mssql');
const LISconfig = require('../dbconfig/dbLISconfig');

export async function connectDatabase() {
    //const client = await MongoClient.connect();

    let clientpool = await sql.connect(LISconfig);
  
    return clientpool;
}