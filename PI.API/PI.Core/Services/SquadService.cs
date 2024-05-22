using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Domain.Interfaces;
using PI.Domain.Models;
using PI.Domain.Models.Prove;
using System.Linq;

namespace PI.Core.Services
{
    public class SquadService : ISquadService
    {
        private readonly AutoCompManagerContext _context;

        public SquadService(AutoCompManagerContext context)
        {
            _context = context;
        }

        public async Task<List<Squad>> GetSquadList()
        {            
            return await _context.Squads.Include(x => x.Student).ToListAsync();
        }

        public ProveDto GetProve(int squadId)
        { 
            return _context.Squads.AsNoTracking()
                .Where(squad => squad.Id == squadId)
                .Select(squad => new ProveDto
                {
                    SquadId = squad.Id,
                    Ramp = squad.Ramp.FirstOrDefault(),
                    Speed = squad.Speed.FirstOrDefault(),
                    Traction = squad.Traction.FirstOrDefault()
                }).FirstOrDefault();
        }

        public IQueryable<RankingDto> GetRankingList()
        {
            var squadRankingList = _context.Squads.AsNoTracking()
                    .Select(squad => new RankingDto
                    {
                        SquadName = squad.Name,
                        CarNumber = squad.CarNumber,
                        Score = GetSquadScore(squad.Ramp.FirstOrDefault().Score, squad.Speed.FirstOrDefault().Score, squad.Traction.FirstOrDefault().Score),
                    }).ToList();

            var squadScores = squadRankingList.Select(squad => squad.Score).ToList();

            foreach (var squadRanking in squadRankingList)
            {
                squadRanking.Ranking = GetOverallRanking(squadScores, squadRanking.Score);
            }

            return squadRankingList.AsQueryable();
        }

        private static double GetSquadScore(double rampScore, double speedScore, double tractionScore)
        {
            return rampScore + speedScore + tractionScore;
        }

        private int GetOverallRanking(List<double> squadScores, double currentSquadScore)
        {
            squadScores.Sort((a, b) => b.CompareTo(a));

            int rank = squadScores.IndexOf(currentSquadScore) + 1;

            return rank;
        }
    }
}
