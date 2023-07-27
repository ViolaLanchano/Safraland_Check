using System;
namespace Safraland_ViolaEdenLanchano_AvivSpector.DTOs
{
    public class UserDto
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public string Age { get; set; }
        public string Character { get; set; }
        public string FavoriteColor { get; set; }
        public List<StationDto> StationsList { get; set; }
    }
}

