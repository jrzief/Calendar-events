const sql = require('mssql');

//const LISconfig = require('../../dbconfig/dbLISconfig');

 const config = {
  user: 'pa',
  password: 'pa',
  server: 'SQLSERVER1',
  database: 'LIS2020',
  options: {
    trustedconnection: true,
    enableArithAbort : true, 
    instancename :''
  }
}  
 
 async function connectDatabase() {
  const client = await sql.connect(config);
  
  return client;
}
 
async function handler(req, res) {
    //will need date passed in with query
    const {myDate} = req.query;
    console.log('myDate', myDate);

    const testdate = new Date("3/15/2021");
    testdate.setUTCHours(0,0,0,0);
    const agendaDate = testdate.toISOString();

    //let clientpool;
  if (req.method === 'GET') {
   
    console.log('agendaDate', agendaDate);
  
    try {
      let clientpool = await connectDatabase();
      console.log("Database connection success");
          //return sql.query`
      let res = await sql.query`
        SELECT Code_Description, Agenda_Date, Agenda_Date_for_Query, Agenda_Location, Agenda_Sequence, Committee_House, Agenda_Type, Agenda_Comment
          FROM viewAgendaforWeb
          WHERE Agenda_Date_for_Query = ${agendaDate}
          AND Agenda_Sequence = 0
          ORDER BY Sort_House, Agenda_Time_for_Query, Code_Description
      `;
    
      return res.recordsets;
    } catch (error) {
         console.log(" pilot-error :" + error);
    }

  } // nothing to do if not a GET request
    
}       
    

export default handler;