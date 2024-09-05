using Microsoft.AspNetCore.SignalR;

namespace SignalRTasks.Web
{
    public class TaskHub : Hub
    {
        public void TaskUpdate()
        {
            Clients.All.SendAsync("refresh");
        }
    }
}
