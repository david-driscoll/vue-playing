// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using System;
using System.Collections.Generic;

namespace Microsoft.AspNetCore.Builder
{
    /// <summary>
    /// Represents options for the SPA prerendering middleware.
    /// </summary>
    public class VuePrerenderingOptions
    {
        /// <summary>
        /// Gets or sets the path, relative to your application root, of the JavaScript file
        /// containing prerendering logic.
        /// </summary>
        public string BootModulePath { get; set; }

        /// <summary>
        /// Gets or sets an array of URL prefixes for which prerendering should not run.
        /// </summary>
        public string[] ExcludeUrls { get; set; }

        /// <summary>
        /// Gets or sets a callback that will be invoked during prerendering, allowing you to pass additional
        /// data to the prerendering entrypoint code.
        /// </summary>
        public Action<HttpContext, IDictionary<string, object>> SupplyData { get; set; }
    }
}
