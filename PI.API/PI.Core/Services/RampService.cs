using EFCore.BulkExtensions;
using PI.Core.DataContext;
using PI.Domain.Interfaces;
using PI.Domain.Models;

namespace PI.Core.Services
{
    public class RampService : IRampService
    {
        private readonly AutoCompManagerContext _context;
        public RampService(AutoCompManagerContext context)
        {
            _context = context;
        }

        public async Task<Ramp> SaveRamp(RampDto ramp)
        {
            var squadRamp = _context.Ramps.Where(x => x.IdSquad == ramp.IdSquad).FirstOrDefault();

            var listOfRamps = _context.Ramps.ToList();

            Ramp rampModifiedOrAdded;

            if (squadRamp != null)
            {
                squadRamp.Distance = ramp.Distance;
                rampModifiedOrAdded = squadRamp;
            }
            else
            {
                var rampToSave = new Ramp
                {
                    IdSquad = ramp.IdSquad,
                    Distance = ramp.Distance
                };

                listOfRamps.Add(rampToSave);
                rampModifiedOrAdded = rampToSave;
            }

            listOfRamps = listOfRamps.OrderByDescending(r => r.Distance).ToList();

            for (int i = 0; i < listOfRamps.Count; i++)
            {
                listOfRamps[i].Ranking = i + 1;
                listOfRamps[i].Score = GetScore(listOfRamps[i].Ranking);
            }

            await _context.BulkInsertOrUpdateAsync(listOfRamps);

            ////int currentRank = 1;

            ////for (int i = 0; i < listOfRamps.Count; i++)
            ////{
            ////    if (i > 0 && listOfRamps[i].Distance == listOfRamps[i - 1].Distance)
            ////    {
            ////        listOfRamps[i].Ranking = listOfRamps[i - 1].Ranking;
            ////    }
            ////    else
            ////    {
            ////        listOfRamps[i].Ranking = currentRank;
            ////    }

            ////    listOfRamps[i].Score = GetScore(listOfRamps[i].Ranking);
            ////    currentRank++;
            ////}

            return rampModifiedOrAdded;
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

        private int GetRank(List<Ramp> ramps, Ramp targetRamp)
        {
            var ranking = ramps.OrderByDescending(ramp => ramp.Distance).ToList();

            int rank = ranking.FindIndex(ramp => ramp == targetRamp);

            return rank + 1;
        }
    }
}
