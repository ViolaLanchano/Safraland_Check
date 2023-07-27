using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Safraland_ViolaEdenLanchano_AvivSpector.DTOs;
using SafralandDbRepository;
using static System.Collections.Specialized.BitVector32;

namespace Safraland_ViolaEdenLanchano_AvivSpector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationsController : Controller
    {
        private readonly DbRepository _db;

        public StationsController(DbRepository db)
        {
            _db = db;
        }



        //שיטה לשליפת פרטי התחנה לפי id
        [HttpGet("stationByID/{userID}/{stationCode}")]
        public async Task<IActionResult> GetStationByID(int userID, int stationCode)
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

            foreach (StationDto station in stationsRecord)
            {
                object param3 = new
                {
                    stationID = station.ID
                };
                string queryActivities = "SELECT * FROM Activities WHERE StationId = @stationID";
                var ActivitiesRecord = await _db.GetRecordsAsync<ActivityDto>(queryActivities, param3);
                station.ActivitiesList = ActivitiesRecord.ToList();
            }

            UserDto userToReturn = userRecord.FirstOrDefault();
            userToReturn.StationsList = stationsRecord.ToList();


            return Ok(userToReturn);
        }



        //שיטה לעדכון התחנה לאחר ביצועה
        [HttpPost("updateStation")]
        public async Task<IActionResult> UpdateStation(StationIsCompletedDto station)
        {

            //קודם כל נבדוק שאכן נשלחה תחנה קיימת לעדכון
            if (station.ID > 0)
            {

                //נכתוב את שאילתת העדכון, במקרה זה נעדכן את השדה המציג שהתחנה בוצעה
                string stationQuery = "UPDATE Stations SET IsCompleted = @IsCompleted WHERE ID=@ID";

                //נקרא לקובץ DbRepository ונשלח את השאילתה ואת מודל התחנה
                bool isStationUpdate = await _db.SaveDataAsync(stationQuery, station);

                if (isStationUpdate == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Station Update Failed");
                }

            }
            return BadRequest("ID not sent");
        }


        //שיטה לאיפוס סטטוס התחנה והפעילויות 
        [HttpPost("resetStationAndActivities")]
        public async Task<IActionResult> resetStationAndActivities(StationIsCompletedDto station)
        {

            //קודם כל נבדוק שאכן נשלחה תחנה קיימת לעדכון
            if (station.ID > 0)
            {
                string stationQuery = "UPDATE Stations SET IsCompleted = @IsCompleted WHERE ID=@ID";

                bool isStationUpdate = await _db.SaveDataAsync(stationQuery, station);

                if (isStationUpdate == true)
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
                else
                {
                    return BadRequest("station Update Failed");
                }

            }
            return BadRequest("ID not sent");
        }


        // פונקציה לאיפוס כל התחנות והפעילויות
        [HttpPost("resetAllStationAndActivities")]
        public async Task<IActionResult> resetAllStationAndActivities(UserDto user)
        {
            string activityQuery = "";
            bool isActivityUpdate = false;

            Console.WriteLine(user.StationsList);

            for (int i = 0; i < 8; i++)
            {
                int stationId = user.StationsList[i].ID;
                object param2 = new
                {
                    stationId = stationId
                };

                string stationQuery = "UPDATE Stations SET IsCompleted = @IsCompleted WHERE ID=@ID";

                bool isStationUpdate = await _db.SaveDataAsync(stationQuery, user.StationsList);

                if (isStationUpdate == true)
                {
                    foreach (ActivityDto activity in user.StationsList[i].ActivitiesList)
                    {
                        activityQuery = "UPDATE Activities SET AnswerContent = @AnswerContent, IsCompleted = @IsCompleted WHERE ID=@ID";
                    }
                    isActivityUpdate = await _db.SaveDataAsync(activityQuery, user.StationsList[i].ActivitiesList);
                }
                else
                {
                    return BadRequest("station Update Failed");
                }
            }

            if (isActivityUpdate == true)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest("Acticities Update Failed");
            }

        }

    }
}


