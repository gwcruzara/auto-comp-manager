using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
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

        public IQueryable<RankingDto> GetRanking()
        {
            return _context.Speeds.AsNoTracking()
            .Select(speed => new RankingDto
            {
                SquadName = speed.Squad.Name,
                CarNumber = speed.Squad.CarNumber,
                Score = speed.Score,
                Ranking = speed.Ranking,
                SpeedTime = speed.Time
            }).OrderBy(speed => speed.Ranking);
        }

        public Speed GetSpeed(int squadId)
        {
            return _context.Speeds.AsNoTracking()
                .Where(speed => speed.IdSquad == squadId)
                .FirstOrDefault() ?? throw new Exception("Speed not found");
        }

        public void Remove(int id)
        {
            var speedToDelete = _context.Speeds.Where(x => x.IdSquad == id).FirstOrDefault();

            if (speedToDelete is null)
            {
                throw new Exception("Speed not found.");
            }

            _context.Speeds.Remove(speedToDelete);

            _context.SaveChanges();
        }

        public async Task<Speed> SaveSpeed(SpeedDto speed)
        {
            var squadSpeed = _context.Speeds
                .Where(x => x.IdSquad == speed.IdSquad)
                .FirstOrDefault();

            var listOfSpeeds = _context.Speeds.ToList();

            Speed speedModifiedOrAdded;

            if (squadSpeed != null)
            {
                squadSpeed.Time = GetTime(speed);
                squadSpeed.BurnedStart = speed.BurnedStart;
                squadSpeed.OutsideLine = squadSpeed.OutsideLine + speed.OutsideLine;
                squadSpeed.CutWay = squadSpeed.CutWay + speed.CutWay;

                speedModifiedOrAdded = squadSpeed;
            }
            else
            {
                var speedToSave = new Speed
                {
                    IdSquad = speed.IdSquad,
                    Time = GetTime(speed),
                    TimeWithoutPenalties = speed.Time,
                    BurnedStart = speed.BurnedStart,
                    OutsideLine = speed.OutsideLine,
                    CutWay = speed.CutWay,
                };

                listOfSpeeds.Add(speedToSave);
                speedModifiedOrAdded = speedToSave;
            }

            listOfSpeeds = listOfSpeeds.OrderBy(r => r.Time).ToList();

            for (int i = 0; i < listOfSpeeds.Count; i++)
            {
                listOfSpeeds[i].Ranking = i + 1;
                listOfSpeeds[i].Score = GetScore(listOfSpeeds[i].Ranking);
            }

            await _context.BulkInsertOrUpdateAsync(listOfSpeeds);

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

            if (speed.CutWay > 0)
            {
                realTime = Math.Abs(realTime + (5.0 * speed.CutWay));
            }

            if (speed.OutsideLine > 0)
            {
                realTime = Math.Abs(realTime + (2.0 * speed.OutsideLine));
            }

            return realTime;
        }
    }
}
