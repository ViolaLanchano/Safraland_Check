using System;
namespace Safraland_ViolaEdenLanchano_AvivSpector.DTOs
{
    public class ActivityDto
    {
        public int ID { get; set; }
        public int ActivityNumber { get; set; }
        public string AnswerContent { get; set; }
        public bool IsCompleted { get; set; }
        public int StationId { get; set; }
    }
}

