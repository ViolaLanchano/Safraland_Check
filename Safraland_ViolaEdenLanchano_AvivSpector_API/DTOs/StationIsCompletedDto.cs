using System;
namespace Safraland_ViolaEdenLanchano_AvivSpector.DTOs
{
    public class StationIsCompletedDto
    {
        public int ID { get; set; }
        public bool IsCompleted { get; set; }
        public List<ActivityDto> ActivitiesList { get; set; }
    }
}

