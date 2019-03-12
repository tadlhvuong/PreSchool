using PreSchool.Shared.Models;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq.Expressions;

namespace PreSchool.Shared.Helpers
{
    public static class MvcExtensions
    {
        public static bool IsActive(this IHtmlHelper html, string controller = null, string action = null)
        {
            var currentAction = (string)html.ViewContext.RouteData.Values["action"];
            var currentController = (string)html.ViewContext.RouteData.Values["controller"];

            if (string.IsNullOrEmpty(controller))
                controller = currentController;

            if (string.IsNullOrEmpty(action))
                action = currentAction;

            return controller == currentController && action == currentAction;
        }

        public static IHtmlContent GetHtml(this TagBuilder tagBuilder)
        {
            using (var writer = new StringWriter())
            {
                tagBuilder.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);
                return new HtmlString(writer.ToString());
            }
        }

        public static IHtmlContent EnumStatusFor<TModel, TValue>(this IHtmlHelper<TModel> html, Expression<Func<TModel, TValue>> expression)
        {
            var enumType = typeof(TValue);
            if (!enumType.IsEnum)
                return html.DisplayFor(expression);

            var enumValue = (expression.Compile())(html.ViewData.Model);
            var enumText = EnumHelper<TValue>.GetDisplayValue(enumValue);

            var fieldInfo = enumType.GetField(enumValue.ToString());
            if (fieldInfo == null)
                return html.DisplayFor(expression);

            var attributes = fieldInfo.GetCustomAttributes(typeof(StatusCssAttribute), false) as StatusCssAttribute[];
            if (attributes == null || attributes.Length == 0)
                return html.EnumDisplayFor(expression);

            return new HtmlString(string.Format("<span class=\"m-badge m-badge--wide m-badge--{0}\">{1}</span>", attributes[0].Name, enumText));
        }

        public static IHtmlContent EnumDisplayFor<TModel, TValue>(this IHtmlHelper<TModel> html, Expression<Func<TModel, TValue>> expression)
        {
            var enumType = typeof(TValue);
            if (!enumType.IsEnum)
                return html.DisplayFor(expression);

            var enumValue = (expression.Compile())(html.ViewData.Model);

            var fieldInfo = enumType.GetField(enumValue.ToString());
            if (fieldInfo == null)
                return html.DisplayFor(expression);

            var attributes = fieldInfo.GetCustomAttributes(typeof(DisplayAttribute), false) as DisplayAttribute[];
            if (attributes == null || attributes.Length == 0)
                return html.DisplayFor(expression);

            return new HtmlString(attributes[0].Name);
        }

        public static IHtmlContent DetailsLink(this IHtmlHelper html, string actionName, object routeValues, bool openModal = false)
        {
            var urlHelper = new UrlHelper(html.ViewContext);
            var actionLink = urlHelper.Action(actionName, routeValues);
            var aTag = new TagBuilder("a");
            aTag.InnerHtml.SetHtmlContent("<i class='fas fa-search'></i>");
            aTag.MergeAttribute("href", actionLink);
            aTag.MergeAttribute("title", "Xem chi tiết");
            if (openModal)
                aTag.AddCssClass("modal-opener btn btn-xs btn-info");
            else
                aTag.AddCssClass("btn btn-xs btn-info");
            return aTag.GetHtml();
        }

        public static IHtmlContent UpdateLink(this IHtmlHelper html, string actionName, object routeValues, bool openModal = false)
        {
            var urlHelper = new UrlHelper(html.ViewContext);
            var actionLink = urlHelper.Action(actionName, routeValues);
            var aTag = new TagBuilder("a");
            aTag.InnerHtml.SetHtmlContent("<i class='fas fa-edit'></i>");
            aTag.MergeAttribute("href", actionLink);
            aTag.MergeAttribute("title", "Cập nhật thông tin");
            if (openModal)
                aTag.AddCssClass("modal-opener btn btn-xs btn-warning");
            else
                aTag.AddCssClass("btn btn-xs btn-warning");
            return aTag.GetHtml();
        }

        public static IHtmlContent DeleteLink(this IHtmlHelper html, string actionName, object routeValues, bool openModal = false)
        {
            var urlHelper = new UrlHelper(html.ViewContext);
            var actionLink = urlHelper.Action(actionName, routeValues);
            var aTag = new TagBuilder("a");
            aTag.InnerHtml.SetHtmlContent("<i class='fas fa-times'></i>");
            aTag.MergeAttribute("href", actionLink);
            aTag.MergeAttribute("title", "Xóa bỏ thông tin");
            if (openModal)
                aTag.AddCssClass("modal-opener btn btn-xs btn-danger");
            else
                aTag.AddCssClass("btn btn-xs btn-danger");
            return aTag.GetHtml();
        }

        public static IHtmlContent EnableLink(this IHtmlHelper html, string actionName, object routeValues, bool openModal = false)
        {
            var urlHelper = new UrlHelper(html.ViewContext);
            var actionLink = urlHelper.Action(actionName, routeValues);
            var aTag = new TagBuilder("a");
            aTag.InnerHtml.SetHtmlContent("<i class='fas fa-play-circle'></i>");
            aTag.MergeAttribute("href", actionLink);
            aTag.MergeAttribute("title", "Enable this item");
            if (openModal)
                aTag.AddCssClass("modal-opener btn btn-xs btn-success");
            else
                aTag.AddCssClass("btn btn-xs btn-success");
            return aTag.GetHtml();
        }

        public static IHtmlContent DisableLink(this IHtmlHelper html, string actionName, object routeValues, bool openModal = false)
        {
            var urlHelper = new UrlHelper(html.ViewContext);
            var actionLink = urlHelper.Action(actionName, routeValues);
            var aTag = new TagBuilder("a");
            aTag.InnerHtml.SetHtmlContent("<i class='fas fa-stop-circle'></i>");
            aTag.MergeAttribute("href", actionLink);
            aTag.MergeAttribute("title", "Disable this item");
            if (openModal)
                aTag.AddCssClass("modal-opener btn btn-xs btn-danger");
            else
                aTag.AddCssClass("btn btn-xs btn-danger");

            return aTag.GetHtml();
        }
    }
}
