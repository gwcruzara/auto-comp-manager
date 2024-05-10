using PI.Core.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PI.Data.Repository
{
    public class TeamRepository : BaseRepository, ITeamRepository
    {
        public TeamRepository(AutoCompManagerContext context) : base(context)
        {
        }
    }
}
