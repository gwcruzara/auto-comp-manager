using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Domain.Interfaces;
using PI.Domain.Models;

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
            return await _context.Squads
                .Include(x => x.Student)
                .OrderBy(x => x.Name)
                .ToListAsync();
        }

        public IQueryable<RankingDto> GetRankingList()
        {
            var squadRankingList = _context.Squads.AsNoTracking()
                    .Select(squad => new RankingDto
                    {
                        SquadName = squad.Name,
                        CarNumber = squad.CarNumber,
                        Score = GetSquadScore(squad.Ramp.FirstOrDefault().Score, squad.Speed.FirstOrDefault().Score, squad.Traction.FirstOrDefault().Score),
                        SpeedTime = squad.Speed.FirstOrDefault().Time != null ? squad.Speed.FirstOrDefault().Time : null,
                        RampDistance = squad.Ramp.FirstOrDefault().Distance != null ? squad.Ramp.FirstOrDefault().Distance : null,
                        TractionWeight = squad.Traction.FirstOrDefault().Weight != null ? squad.Traction.FirstOrDefault().Weight : null,
                    }).ToList();

            var squadScores = squadRankingList.Select(squad => squad.Score).ToList();

            foreach (var squadRanking in squadRankingList)
            {
                squadRanking.Ranking = GetOverallRanking(squadScores, squadRanking.Score);
            }

            return squadRankingList.AsQueryable().OrderBy(x => x.Ranking);
        }

        public IQueryable<StudentRankingDto> GetStudentRanking()
        {
            var studentRanking = _context.Students.AsNoTracking()
                    .Select(student => new StudentRankingDto
                    {
                        SquadName = student.Squad.Name,
                        StudentName = student.Name,
                        Score = GetSquadScore(student.Squad.Ramp.FirstOrDefault().Score, student.Squad.Speed.FirstOrDefault().Score, student.Squad.Traction.FirstOrDefault().Score),
                        SpeedTime = student.Squad.Speed.FirstOrDefault().Time != null ? student.Squad.Speed.FirstOrDefault().Time : null,
                        RampDistance = student.Squad.Ramp.FirstOrDefault().Distance != null ? student.Squad.Ramp.FirstOrDefault().Distance : null,
                        TractionWeight = student.Squad.Traction.FirstOrDefault().Weight != null ? student.Squad.Traction.FirstOrDefault().Weight : null,
                    }).ToList();

            var studentScores = studentRanking.Select(student => student.Score).ToList();

            foreach (var studentRank in studentRanking)
            {
                studentRank.Ranking = GetOverallRanking(studentScores, studentRank.Score);
            }

            return studentRanking.AsQueryable().OrderBy(x => x.Ranking);
        }

        public Squad Create(SquadDto squad)
        {
            var createdSquad = new Squad()
            {
                Name = squad.Name,
                CarNumber = squad.CarNumber
            };

            _context.Squads.Add(createdSquad);
            _context.SaveChanges();

            return createdSquad;
        }

        private static double GetSquadScore(double? rampScore, double? speedScore, double? tractionScore)
        {
            if (rampScore.HasValue && speedScore.HasValue && tractionScore.HasValue )
            {
                return rampScore.Value + speedScore.Value + tractionScore.Value;
            }

            return 0;
        }

        private int GetOverallRanking(List<double> squadScores, double currentSquadScore)
        {
            squadScores.Sort((a, b) => b.CompareTo(a));

            int rank = squadScores.IndexOf(currentSquadScore) + 1;

            return rank;
        }
    }
}
