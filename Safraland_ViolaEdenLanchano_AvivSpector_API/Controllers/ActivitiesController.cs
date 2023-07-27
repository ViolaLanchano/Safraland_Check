using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Safraland_ViolaEdenLanchano_AvivSpector.DTOs;
using SafralandDbRepository;

namespace Safraland_ViolaEdenLanchano_AvivSpector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : Controller
    {
        private readonly DbRepository _db;

        public ActivitiesController(DbRepository db)
        {
            _db = db;
        }

        //שיטה לשליפת פרטי התחנה לפי id של המשתמש , קוד התחנה, ומספר הפעילות
        [HttpGet("activityByID/{userID}/{stationCode}/{activityNumber}")]
        public async Task<IActionResult> GetUserInfoByID(int userID, int stationCode, int activityNumber)
        {
            object param = new
            {
                userID = userID
            };

            object param2 = new
            {
                userID = userID,
                stationCode = stationCode

            };

            string queryUser = "SELECT * FROM Users WHERE ID = @userID";

            string queryStations = "SELECT * FROM Stations WHERE UserId = @userID AND StationCode = @stationCode";

            var userRecord = await _db.GetRecordsAsync<UserDto>(queryUser, param);
            var stationsRecord = await _db.GetRecordsAsync<StationDto>(queryStations, param2);


            StationDto stationsList = stationsRecord.FirstOrDefault();

            foreach (StationDto station in stationsRecord)
            {
                object param3 = new
                {
                    activityNumber = activityNumber,
                    stationID = station.ID
                };
                string queryActivities = "SELECT * FROM Activities WHERE activityNumber = @activityNumber AND StationId = @stationID";
                var ActivitiesRecord = await _db.GetRecordsAsync<ActivityDto>(queryActivities, param3);
                station.ActivitiesList = ActivitiesRecord.ToList();
            }


            UserDto userToReturn = userRecord.FirstOrDefault();
            userToReturn.StationsList = stationsRecord.ToList();


            return Ok(userToReturn.StationsList);
        }




        //שיטה לעדכון הפעילויות
        [HttpPost("updateActivity")]
        public async Task<IActionResult> updateActivity(StationDto station)
        {

            //קודם כל נבדוק שאכן נשלחה תחנה קיימת לעדכון
            if (station.ID > 0)
            {

                //נכתוב את שאילתת העדכון, במקרה זה נעדכן את השדה המציג שהתחנה בוצעה
                string activityQuery = "UPDATE Activities SET AnswerContent = @AnswerContent, IsCompleted = @IsCompleted  WHERE ID=@ID";

                //נקרא לקובץ DbRepository ונשלח את השאילתה ואת מודל התחנה
                bool isActivityUpdate = await _db.SaveDataAsync(activityQuery, station.ActivitiesList);

                if (isActivityUpdate == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Acticities Update Failed");
                }


            }
            return BadRequest("ID not sent");
        }

    }
}

