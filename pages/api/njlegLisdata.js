//import { connectDatabase } from '../../db-helpers/dbutils';
const sql = require('mssql');

//const sql = require('mssql');
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
    //const eventId = req.query.eventId;

    //let clientpool;
  if (req.method === 'GET') {

  
    try {
      let clientpool = await connectDatabase();
      console.log("Database connection success");

      const agendaDate = new Date("4/22/2021").toISOString();
      console.log('agendaDate', agendaDate);
      console.log(clientpool);

      let agenda = await clientpool.request()
      .input('p_agendadate', sql.DateTime, agendaDate)
      .query("SELECT Code_Description, Agenda_Date, Agenda_Date_for_Query, Agenda_Location, Agenda_Sequence, Committee_House, Agenda_Type, Agenda_Comment FROM viewAgendaforWeb WHERE Agenda_Date_for_Query > @p_agendadate and Agenda_Sequence = 0 ORDER BY Sort_House, Agenda_Time_for_Query, Code_Description");
         //return res.recordsets;
      console.log("agenda", agenda.recordsets);
      res.status(200).json(agenda.recordsets);

    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

  } // nothing to do if not a GET request
    //if (req.method === 'GET') {

     /*  try {
        let pool = await sql.connect(config);
        let venues = await pool.request().query("SELECT Distinct Code_Description, Comm_Status, Code_House FROM viewCommittees"); 
        //return res.recordsets;
        console.log("res", venues.recordsets);
        res.status(200).json(venues.recordsets);
      }
      catch (error) {
        console.log(error);
      }
    } */
      /* const agendaDate = new Date("4/22/2021").toISOString();
      console.log('agendaDate', agendaDate);
      console.log(clientpool); */

         /* try {
            //let pool = await sql.connect(config);
            let agenda = await clientpool.request()
              .input('p_agendadate', sql.DateTime, agendaDate)
              .query("SELECT Code_Description, Agenda_Date, Agenda_Date_for_Query, Agenda_Location, Agenda_Sequence, Committee_House, Agenda_Type, Agenda_Comment FROM viewAgendaforWeb WHERE Agenda_Date_for_Query > @p_agendadate and Agenda_Sequence = 0 ORDER BY Sort_House, Agenda_Time_for_Query, Code_Description");
            //return res.recordsets;
            console.log("agenda", agenda.recordsets);
            res.status(200).json(agenda.recordsets);
        } catch (error) {
          res.status(500).json({ message: 'Getting agenda failed.' });
        }
       
     }  */
   
           // console.log("res", res.recordsets);
           // clientpool.close();
}

export default handler;