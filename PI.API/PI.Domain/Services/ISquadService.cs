using PI.Domain.Models;

namespace PI.Domain.Interfaces
{
    public interface ISquadService
    {
        Task<List<Squad>> GetSquadList();
        IQueryable<RankingDto> GetRankingList();
        IQueryable<StudentRankingDto> GetStudentRanking();
        Squad Create(SquadDto squad);
    }
}
