using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Safraland_ViolaEdenLanchano_AvivSpector.DTOs;
using SafralandDbRepository;
using static System.Collections.Specialized.BitVector32;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Safraland_ViolaEdenLanchano_AvivSpector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly DbRepository _db;

        public UsersController(DbRepository db)
        {
            _db = db;
        }



        //שיטה להוספת משתמש חדש לבסיס הנתונים
        [HttpPost("insertUser")]
        public async Task<IActionResult> InsertUser(UserDto user)
        {
            string ActivitiesQuery = "";
            bool isUpdateActivityQuery = false;

            string query = "INSERT INTO Users (UserName, Gender, Age, Character, FavoriteColor) VALUES (@UserName, @Gender, @Age, @Character, @FavoriteColor);";
            int newUserId = await _db.InsertReturnId(query, user);

            string StationQuery = "INSERT INTO Stations (StationName, StationCode, IsCompleted, UserId) VALUES (@StationName, @StationCode, @IsCompleted, @UserId);";


            if (newUserId > 0)
            {
                foreach (StationDto station in user.StationsList)
                {
                    station.UserId = newUserId;

                    int newStationId = await _db.InsertReturnId(StationQuery, station);
                    if (newUserId > 0)
                    {

                        foreach (ActivityDto activity in station.ActivitiesList)
                        {

                            activity.StationId = newStationId;
                            ActivitiesQuery = "INSERT INTO Activities (ActivityNumber, AnswerContent, IsCompleted, StationId) VALUES (@ActivityNumber, @AnswerContent, @IsCompleted, @StationId);";

                        }
                        isUpdateActivityQuery = await _db.SaveDataAsync(ActivitiesQuery, station.ActivitiesList);
                    }
                    else
                    {
                        return BadRequest("The stations were not saved");
                    }
                }


                if (isUpdateActivityQuery == true)
                {
                    return Ok(newUserId);
                }
                else
                {
                    return BadRequest("The activities were not saved");
                }

            }
            return BadRequest("The user was not saved");
        }





        //שיטה לשליפת שמות המשתמשים הקיימים בבסיס הנתונים על מנת שנוכל לבדוק האם המשתמש כבר קיים במערכת
        [HttpGet("AllUsersName")]
        public async Task<IActionResult> GetAllUsers()
        {
            object param = new
            {
            };
            string queryUsers = "SELECT * FROM Users";

            var usersRecord = await _db.GetRecordsAsync<UserDto>(queryUsers, param);

            List<UserDto> usersList = usersRecord.ToList();

            for (int i = 0; i < usersList.Count; i++)
            {
                var id = usersList[i].ID;

                object param2 = new
                {
                    userId = id
                };

                foreach (UserDto user in usersList)
                {

                    string queryStations = "SELECT * FROM Stations WHERE UserId = @userId";

                    var stationsRecord = await _db.GetRecordsAsync<StationDto>(queryStations, param2);

                    usersList[i].StationsList = stationsRecord.ToList();
                }

                Console.WriteLine(id);
            }


            return Ok(usersList);
        }


        //שיטה לשליפת פרטי המשתמש לפי id
        [HttpGet("userByID/{userID}")]
        public async Task<IActionResult> GetUserByID(int userID)
        {
            object param = new
            {
                userID = userID
            };
            string queryUser = "SELECT * FROM Users WHERE ID = @userID";

            string queryStations = "SELECT * FROM Stations WHERE UserId = @userID";

            var userRecord = await _db.GetRecordsAsync<UserDto>(queryUser, param);
            var stationsRecord = await _db.GetRecordsAsync<StationDto>(queryStations, param);


            foreach (StationDto station in stationsRecord)
            {
                object param2 = new
                {
                    stationID = station.ID
                };
                string queryActivities = "SELECT * FROM Activities WHERE StationId = @stationID";

                var ActivitiesRecord = await _db.GetRecordsAsync<ActivityDto>(queryActivities, param2);

                station.ActivitiesList = ActivitiesRecord.ToList();
            }

            UserDto userToReturn = userRecord.FirstOrDefault();
            userToReturn.StationsList = stationsRecord.ToList();

            return Ok(userToReturn);
        }


        //שיטה לשליפת פרטי המשתמש לפי id לעריכת הפרטים (הגדרות)
        [HttpGet("userByIDSettings/{userID}")]
        public async Task<IActionResult> GetUserByIDSettings(int userID)
        {
            object param = new
            {
                userID = userID
            };

            string queryUsers = "SELECT ID, UserName, Character,Gender, FavoriteColor FROM Users WHERE ID = @userID";

            var usersRecord = await _db.GetRecordsAsync<UsersForListDto>(queryUsers, param);

            UsersForListDto usersList = usersRecord.FirstOrDefault();

            return Ok(usersList);
        }



        //שיטה לעדכון פרטי המשתמש לפי id
        [HttpPost("updateUserByID")]
        public async Task<IActionResult> updateUserByID(UsersForListDto user)
        {
            if (user.ID > 0)
            {
                string queryUser = "UPDATE Users SET UserName = @UserName,Gender = @Gender, Character = @Character, FavoriteColor = @FavoriteColor  WHERE ID = @ID";


                bool isUserUpdate = await _db.SaveDataAsync(queryUser, user);


                if (isUserUpdate == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("User Update Failed");
                }
            }
            return BadRequest("ID not sent");
        }

    }

}

