using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddNodeServices(c =>
            {
                c.EnvironmentVariables = new Dictionary<string, string>() {
                    { "TS_NODE_CACHE_DIRECTORY", Environment.GetEnvironmentVariable("TS_NODE_CACHE_DIRECTORY") }
                };
            });
            services.AddSpaPrerenderer();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory factory)
        {
            factory.CreateLogger("ABCD").LogCritical(Environment.GetEnvironmentVariable("TS_NODE_CACHE_DIRECTORY"));
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    ProjectPath = "../"
                    // ConfigFile = "../webpack.config.ts",
                    // HotModuleReplacement = true,
                    // EnvironmentVariables = new Dictionary<string, string>() {
                    //     { "TS_NODE_CACHE_DIRECTORY", Environment.GetEnvironmentVariable("TS_NODE_CACHE_DIRECTORY") }
                    // }
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
