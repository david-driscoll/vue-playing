﻿using System.Threading;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.NodeServices;
using System.Threading.Tasks;

namespace Microsoft.AspNetCore.SpaServices.Prerendering
{
    /// <summary>
    /// Default implementation of a DI service that provides convenient access to
    /// server-side prerendering APIs. This is an alternative to prerendering via
    /// the asp-prerender-module tag helper.
    /// </summary>
    internal class DefaultVuePrerenderer : IVuePrerenderer
    {
        private readonly string _applicationBasePath;
        private readonly CancellationToken _applicationStoppingToken;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly INodeServices _nodeServices;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DefaultVuePrerenderer(
            INodeServices nodeServices,
            IApplicationLifetime applicationLifetime,
            IHostingEnvironment hostingEnvironment,
            IHttpContextAccessor httpContextAccessor)
        {
            _applicationBasePath = hostingEnvironment.ContentRootPath;
            _applicationStoppingToken = applicationLifetime.ApplicationStopping;
            _httpContextAccessor = httpContextAccessor;
            _nodeServices = nodeServices;
            _hostingEnvironment = hostingEnvironment;
        }

        public Task<VueRenderResult> Render(
            string moduleName,
            string exportName = null,
            object customDataParameter = null,
            int timeoutMilliseconds = default(int))
        {
            return VueRenderer.Render(
                _applicationBasePath,
                _nodeServices,
                _hostingEnvironment,
                _applicationStoppingToken,
                new JavaScriptModuleExport(moduleName) { ExportName = exportName },
                _httpContextAccessor.HttpContext,
                customDataParameter,
                timeoutMilliseconds);
        }
    }
}
