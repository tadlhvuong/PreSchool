using System.Collections.Generic;

namespace PreSchool.Shared.Models
{
    public class PagedRequestDto
    {
        public string Search { get; set; }
        public virtual string Sorting { get; set; }
        public virtual int SkipCount { get; set; }
        public virtual int MaxResultCount { get; set; } = 20;
    }

    public class PagedResultDto<T>
    {
        public PagedResultDto(int totalCount, IReadOnlyList<T> items)
        {
            TotalCount = totalCount;
            Items = items;
        }

        public int TotalCount { get; set; }
        public IReadOnlyList<T> Items { get; set; }
    }
}
