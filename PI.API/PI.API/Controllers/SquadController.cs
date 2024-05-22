using Microsoft.AspNetCore.Mvc;
using PI.Domain.Interfaces;
using PI.Domain.Models;
using PI.Domain.Models.Prove;

namespace PI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SquadController : ControllerBase
    {
        private readonly ISquadService _squadService;

        public SquadController(ISquadService squadService)
        {
            _squadService = squadService;
        }

        [HttpGet]
        [Route("GetSquad")]
        public Task<List<Squad>> GetSquadList()
        {
            return _squadService.GetSquadList();
        }
        
        [HttpGet]
        [Route("GetProve/{squadId}")]
        public ProveDto GetProve(int squadId)
        {
            return _squadService.GetProve(squadId);
        }     
        

        [HttpGet]
        [Route("GetOverallRanking")]
        public IQueryable<RankingDto> GetOverallRanking()
        {
            return _squadService.GetRankingList();
        }
    }
}
