using PI.Domain.Models;

namespace PI.Domain.Interfaces
{
    public interface ISquadService
    {
        public Task<List<Squad>> GetSquadList();
    }
}
