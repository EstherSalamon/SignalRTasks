using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRTasks.Data
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Status Status { get; set; }
        public int UserId { get; set; }
        [NotMapped]
        public User User { get; set; }
    }
}
