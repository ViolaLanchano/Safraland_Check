using System;
namespace Safraland_ViolaEdenLanchano_AvivSpector.DTOs
{
    public class StationDto
    {
        public int ID { get; set; }
        public string StationName { get; set; }
        public bool IsCompleted { get; set; }
        public int StationCode { get; set; }
        public int UserId { get; set; }
        public List<ActivityDto> ActivitiesList { get; set; }
    }
}

