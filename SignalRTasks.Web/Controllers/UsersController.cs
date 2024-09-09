using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalRTasks.Data;
using SignalRTasks.Web.Models;
using System.Security.Claims;

namespace SignalRTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly string _connectionString;

        public UsersController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("signup")]
        public void SignUp(SignUpVM vm)
        {
            UserRepository repository = new UserRepository(_connectionString);
            repository.AddUser(vm.User, vm.User.Password);
        }

        [HttpGet]
        [Route("emailexists")]
        public EmailCheck EmailExists(string email)
        {
            UserRepository repository = new UserRepository(_connectionString);
            EmailCheck check = new EmailCheck
            {
                EmailExists = repository.EmailExists(email)
            };

            return check;
        }

        [HttpPost]
        [Route("login")]
        public User LogIn(LogInVM vm)
        {
            UserRepository repository = new UserRepository(_connectionString);
            User user = repository.LogIn(vm.Email, vm.Password);

            if (user == null)
            {
                return null;
            }

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", ClaimTypes.Email, "role"))).Wait();

            return user;
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            UserRepository repository = new UserRepository(_connectionString);
            return repository.GetByEmail(User.Identity.Name);
        }

        [HttpPost]
        [Route("logout")]
        public void LogOut()
        {
            HttpContext.SignOutAsync().Wait();
        }
    }
}
