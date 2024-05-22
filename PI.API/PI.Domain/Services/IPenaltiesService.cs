using PI.Domain.Models;

namespace PI.Domain.Services 
{
    public interface IPenaltiesService 
    {

        public Task<List<Penalties>> GetPenaltiesAsync();
    }
}
