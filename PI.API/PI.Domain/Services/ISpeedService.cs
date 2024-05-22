using PI.Domain.Models;

namespace PI.Domain.Services 
{
    public interface ISpeedService 
    {
        Task<Speed> SaveSpeed(SpeedDto speed);
    }
}
