using Microsoft.AspNetCore.Mvc;
using PI.Domain.Interfaces;
using PI.Domain.Models;

namespace PI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RampController : ControllerBase
    {
        private readonly IRampService _rampService;

        public RampController(IRampService rampService)
        {
            _rampService = rampService;
        }

        [HttpPost]
        [Route("SaveRamp")]
        public Task<Ramp> SaveRamp([FromBody] RampDto ramp)
        {
            return _rampService.SaveRamp(ramp);
        }
        
        [HttpGet]
        [Route("GetRamp/{squadId}")]
        public Ramp GetRamp(int squadId)
        {
            return _rampService.GetRamp(squadId);
        }

        [HttpGet]
        [Route("GetRank")]
        public IQueryable<RankingDto> GetRank()
        {
            return _rampService.GetRanking();
        }
    }
}
