using Microsoft.AspNetCore.Mvc;
using PI.Domain.Interfaces;
using PI.Domain.Models;

namespace PI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RampController : ControllerBase
    {
        private readonly IRampService _RampService;

        public RampController(IRampService RampService)
        {
            _RampService = RampService;
        }

        [HttpPost]
        [Route("SaveRamp")]
        public Task<Ramp> SaveRamp([FromBody] RampDto ramp)
        {
            return _RampService.SaveRamp(ramp);
        }
    }
}
