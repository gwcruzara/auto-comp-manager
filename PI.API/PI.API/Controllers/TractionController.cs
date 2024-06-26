﻿using Microsoft.AspNetCore.Mvc;
using PI.Core.Services;
using PI.Domain.Models;
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

        [HttpPost]
        [Route("SaveTraction")]
        public Task<Traction> SaveTraction([FromBody] TractionDto traction)
        {
            return _tractionService.SaveTraction(traction);
        }

        [HttpGet]
        [Route("GetTraction/{squadId}")]
        public Traction GetTraction(int squadId)
        {
            return _tractionService.GetTraction(squadId);
        }

        [HttpGet]
        [Route("GetRank")]
        public IQueryable<RankingDto> GetRank()
        {
            return _tractionService.GetRanking();
        }
    }
}
