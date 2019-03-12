using System;
using System.Linq;
using System.Linq.Expressions;

namespace PreSchool.Shared.Helpers
{
    public static class LinqExtensions
    {
        public static IQueryable<T> PageBy<T>(this IQueryable<T> query, int skipCount, int maxResultCount)
        {
            return query.Skip(skipCount).Take(maxResultCount);
        }

        public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
        {
            if (!condition)
                return query;

            return query.Where(predicate);
        }
    }
}
