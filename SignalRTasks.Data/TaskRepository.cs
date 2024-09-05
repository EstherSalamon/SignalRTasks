using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRTasks.Data
{
    public class TaskRepository
    {
        private readonly string _connection;

        public TaskRepository(string connection)
        {
            _connection = connection;
        }

        public List<TaskItem> GetAll()
        {
            using TaskDataContext context = new TaskDataContext(_connection);
            return context.TaskItems.Where(i => i.Status != Status.Done).ToList();
        }

        public void Add(TaskItem weGotWork)
        {
            using TaskDataContext context = new TaskDataContext(_connection);
            context.TaskItems.Add(weGotWork);
            context.SaveChanges();
        }

        public void UpdateStatus(int id, int userId, Status status)
        {
            using TaskDataContext context = new TaskDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"UPDATE TaskItems set Status = {status}, UserId = {userId} WHERE Id = {id}");
        }

        public TaskItem GetById(int id)
        {
            using TaskDataContext context = new TaskDataContext(_connection);
            return context.TaskItems.FirstOrDefault(i => i.Id == id);
        }
    }
}
