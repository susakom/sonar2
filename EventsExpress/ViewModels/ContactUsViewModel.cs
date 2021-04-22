﻿using EventsExpress.Db.Enums;

namespace EventsExpress.ViewModels
{
    public class ContactUsViewModel
    {
        public string Description { get; set; }

        public ContactAdminReason Subject { get; set; }

        public string Title { get; set; }

        public string Email { get; set; }
    }
}
