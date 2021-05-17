﻿using System;
using System.Security.Claims;
using EventsExpress.Core.Exceptions;
using EventsExpress.Db.Bridge;
using Microsoft.AspNetCore.Http;

namespace EventsExpress.Core.Services
{
    public class SecurityContextService : ISecurityContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SecurityContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetCurrentUserId()
        {
            Claim guidClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name);

            return Guid.Parse(guidClaim.Value);
        }

        public Guid GetCurrentAccountId()
        {
            Claim guidClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid);

            return Guid.Parse(guidClaim.Value);
        }
    }
}
