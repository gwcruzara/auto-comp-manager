using PI.Domain.Models;

namespace PI.Domain.Interfaces
{
    public interface IRampService
    {
        Task<Ramp> SaveRamp(RampDto ramp);
        Ramp GetRamp(int squadId);
        IQueryable<RankingDto> GetRanking();
    }
}
