using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ACEX.Startup))]
namespace ACEX
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
