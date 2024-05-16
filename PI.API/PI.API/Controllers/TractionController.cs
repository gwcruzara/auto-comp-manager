using Microsoft.AspNetCore.Mvc;
using PI.Domain.Services;

namespace PI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TractionController : ControllerBase
    {
        private readonly ITractionService _tractionService;

        public TractionController(ITractionService tractionService)
        {
            _tractionService = tractionService;
        }
    }
}
