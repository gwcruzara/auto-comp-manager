using EFCore.BulkExtensions;
using PI.Core.DataContext;
using PI.Domain.Models;
using PI.Domain.Services;

namespace PI.Core.Services
{
    public class SpeedService : ISpeedService 
    {
        private readonly AutoCompManagerContext _context;

        public SpeedService(AutoCompManagerContext context) 
        {
            _context = context;
        }

        public async Task<Speed> SaveSpeed(SpeedDto speed)
        {
            var squadSpeed = _context.Speeds.Where(x => x.IdSquad == speed.IdSquad).FirstOrDefault();

            var listOfspeeds = _context.Speeds.ToList();

            Speed speedModifiedOrAdded;

            if (squadSpeed != null)
            {
                squadSpeed.Time = GetTime(speed);
                speedModifiedOrAdded = squadSpeed;
            }
            else
            {
                var speedToSave = new Speed
                {
                    IdSquad = speed.IdSquad,
                    Time = GetTime(speed)
                };

                listOfspeeds.Add(speedToSave);
                speedModifiedOrAdded = speedToSave;
            }

            listOfspeeds = listOfspeeds.OrderBy(r => r.Time).ToList();

            for (int i = 0; i < listOfspeeds.Count; i++)
            {
                listOfspeeds[i].Ranking = i + 1;
                listOfspeeds[i].Score = GetScore(listOfspeeds[i].Ranking);
            }

            await _context.BulkInsertOrUpdateAsync(listOfspeeds);

            return speedModifiedOrAdded;
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

        private double GetTime(SpeedDto speed)
        {
            var realTime = speed.Time;

            if (speed.BurnedStart)
            {
                realTime = Math.Abs(realTime + 3.0);
            }

            if (speed.CutWay)
            {
                realTime = Math.Abs(realTime + 5.0);
            }

            if (speed.OutsideLine)
            {
                realTime = Math.Abs(realTime + 2.0);
            }

            return realTime;
        }
    }
}
