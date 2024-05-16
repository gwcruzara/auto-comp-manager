using Microsoft.AspNetCore.Mvc;
using PI.Domain.Services;

namespace PI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpeedController : ControllerBase
    {
        private readonly ISpeedService _speedService;

        public SpeedController(ISpeedService speedService)
        {
            _speedService = speedService;
        }
    }
}
