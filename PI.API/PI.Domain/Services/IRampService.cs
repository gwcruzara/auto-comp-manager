using PI.Domain.Models;

namespace PI.Domain.Interfaces
{
    public interface IRampService
    {
        Task<Ramp> SaveRamp(RampDto ramp);
    }
}
