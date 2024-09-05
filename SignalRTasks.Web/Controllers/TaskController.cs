using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalRTasks.Data;
using SignalRTasks.Web.Models;

namespace SignalRTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly string _connection;

        public TaskController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("get")]
        public List<TaskItem> GetToDoList()
        {
            TaskRepository reaps = new TaskRepository(_connection);
            UserRepository uRepo = new UserRepository(_connection);
            List<TaskItem> list = reaps.GetAll();
            foreach(var task in list)
            {
                task.User = uRepo.GetById(task.UserId);
            }
            return list;
        }

        [HttpPost]
        [Route("additem")]
        public void GrowTheToDoList(AddItemVM vm)
        {
            TaskRepository reap = new TaskRepository(_connection);
            reap.Add(vm.Task);
        }

        [HttpPost]
        [Route("updatestatus")]
        public void ThereWasAChangeInStatus(UpdateVM task)
        {
            TaskRepository repo = new TaskRepository(_connection);
            TaskItem toUpdate = repo.GetById(task.Id);
            int statusInt = (int)toUpdate.Status;
            statusInt++;
            Status updated = (Status)statusInt;
            UserRepository uRepo = new UserRepository(_connection);
            User current = uRepo.GetByEmail(User.Identity.Name);
            repo.UpdateStatus(task.Id, current.ID, updated);
        }
    }
}
