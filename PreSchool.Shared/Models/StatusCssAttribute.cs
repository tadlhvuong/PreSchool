using System;

namespace PreSchool.Shared.Models
{
    public class StatusCssAttribute : Attribute
    {
        public string Name { get; private set; }

        public StatusCssAttribute(string name)
        {
            Name = name;
        }
    }
}
