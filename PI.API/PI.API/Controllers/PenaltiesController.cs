using Microsoft.AspNetCore.Mvc;
using PI.Domain.Models;
using PI.Domain.Services;

namespace PI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PenaltiesController : ControllerBase
    {
        private readonly IPenaltiesService _penaltiesService;

        public PenaltiesController(IPenaltiesService penaltiesService)
        {
            _penaltiesService = penaltiesService;
        }

        [HttpGet]
        [Route("GetPenalties")]
        public async Task<List<Penalties>> GetPenaltiesAsync()
        {
            return await _penaltiesService.GetPenaltiesAsync();
        }
    }
}
