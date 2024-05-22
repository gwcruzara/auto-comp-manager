using PI.Domain.Models;
using PI.Domain.Models.Prove;

namespace PI.Domain.Interfaces
{
    public interface ISquadService
    {
        public Task<List<Squad>> GetSquadList();
        public ProveDto GetProve(int squadId);
        public IQueryable<RankingDto> GetRankingList();
    }
}
