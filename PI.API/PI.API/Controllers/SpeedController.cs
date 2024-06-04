using Microsoft.AspNetCore.Mvc;
using PI.Domain.Models;
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

        [HttpPost]
        [Route("SaveSpeed")]
        public Task<Speed> SaveSpeed([FromBody] SpeedDto speed)
        {
            return _speedService.SaveSpeed(speed);
        }

        [HttpGet]
        [Route("GetSpeed/{squadId}")]
        public Speed GetSpeed(int squadId)
        {
            return _speedService.GetSpeed(squadId);
        }

        [HttpGet]
        [Route("GetRank")]
        public IQueryable<RankingDto> GetRank()
        {
            return _speedService.GetRanking();
        }


        [HttpDelete]
        [Route("Delete/{id}")]
        public IActionResult  Remove(int id)
        {
            _speedService.Remove(id);

            return Ok();
        }
    }
}
