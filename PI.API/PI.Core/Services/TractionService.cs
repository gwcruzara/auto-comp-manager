using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Domain.Models;
using PI.Domain.Services;

namespace PI.Core.Services
{
    public class TractionService : ITractionService 
    {
        private readonly AutoCompManagerContext _context;

        public TractionService(AutoCompManagerContext context) 
        {
            _context = context;
        }

        public IQueryable<RankingDto> GetRanking()
        {
            var rankList = _context.Tractions.AsNoTracking()
            .Select(traction => new RankingDto
            {
                SquadName = traction.Squad.Name,
                CarNumber = traction.Squad.CarNumber,
                Score = GetRankScore(traction.Score)
            }).ToList();

            var scores = rankList.Select(traction => traction.Score).ToList();

            foreach (var rank in rankList)
            {
                rank.Ranking = GetOverallRank(scores, rank.Score);
            }

            return rankList.AsQueryable().OrderBy(x => x.Ranking);
        }

        public Traction GetTraction(int squadId)
        {
            return _context.Tractions.AsNoTracking()
                .Where(traction => traction.IdSquad == squadId)
                .FirstOrDefault() ?? throw new Exception("Traction not found");
        }

        public async Task<Traction> SaveTraction(TractionDto traction)
        {
            var squadTraction = _context.Tractions.Where(x => x.IdSquad == traction.IdSquad).FirstOrDefault();

            var listOfTractions = _context.Tractions.ToList();

            Traction tractionModifiedOrAdded;

            if (squadTraction != null)
            {
                squadTraction.Weight = traction.Weight;
                tractionModifiedOrAdded = squadTraction;
            }
            else
            {
                var tractionToSave = new Traction
                {
                    IdSquad = traction.IdSquad,
                    Weight = traction.Weight
                };

                listOfTractions.Add(tractionToSave);
                tractionModifiedOrAdded = tractionToSave;
            }

            listOfTractions = listOfTractions.OrderByDescending(r => r.Weight).ToList();

            for (int i = 0; i < listOfTractions.Count; i++)
            {
                listOfTractions[i].Ranking = i + 1;
                listOfTractions[i].Score = GetScore(listOfTractions[i].Ranking);
            }

            await _context.BulkInsertOrUpdateAsync(listOfTractions);

            return tractionModifiedOrAdded;
        }

        private double GetScore(int ranking)
        {
            List<int> topRanking = new List<int> { 1, 2, 3 };
            List<int> secondRanking = new List<int> { 4, 5, 6 };
            List<int> thirdRanking = new List<int> { 7, 8 };
            List<int> fourtyRanking = new List<int> { 9, 10, 11, 12, 13, 14, 15 };

            if (topRanking.Contains(ranking))
            {
                return 1.0;
            }

            if (secondRanking.Contains(ranking))
            {
                return 0.8;
            }

            if (thirdRanking.Contains(ranking))
            {
                return 0.6;
            }

            if (fourtyRanking.Contains(ranking))
            {
                return 0.4;
            }

            return 0.0;
        }

        private static double GetRankScore(double? score)
        {
            if (score.HasValue)
            {
                return score.Value;
            }

            return 0;
        }

        private int GetOverallRank(List<double> scores, double currentScore)
        {
            scores.Sort((a, b) => b.CompareTo(a));

            int rank = scores.IndexOf(currentScore) + 1;

            return rank;
        }
    }
}
