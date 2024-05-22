using EFCore.BulkExtensions;
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
    }
}
