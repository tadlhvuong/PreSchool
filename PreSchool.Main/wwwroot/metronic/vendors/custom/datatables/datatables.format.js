/**
 * Date / time formats often from back from server APIs in a format that you
 * don't wish to display to your end users (ISO8601 for example). This rendering
 * helper can be used to transform any source date / time format into something
 * which can be easily understood by your users when reading the table, and also
 * by DataTables for sorting the table.
 *
 * The [MomentJS library](http://momentjs.com/) is used to accomplish this and
 * you simply need to tell it which format to transfer from, to and specify a
 * locale if required.
 *
 * This function should be used with the `dt-init columns.render` configuration
 * option of DataTables.
 *
 * It accepts one, two or three parameters:
 *
 *     $.fn.dataTable.render.moment( to );
 *     $.fn.dataTable.render.moment( from, to );
 *     $.fn.dataTable.render.moment( from, to, locale );
 *
 * Where:
 *
 * * `to` - the format that will be displayed to the end user
 * * `from` - the format that is supplied in the data (the default is ISO8601 -
 *   `YYYY-MM-DD`)
 * * `locale` - the locale which MomentJS should use - the default is `en`
 *   (English).
 *
 *  @name datetime
 *  @summary Convert date / time source data into one suitable for display
 *  @author [Allan Jardine](http://datatables.net)
 *  @requires DataTables 1.10+
 *
 *  @example
 *    // Convert ISO8601 dates into a simple human readable format
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 1,
 *        render: $.fn.dataTable.render.moment( 'Do MMM YYYYY' )
 *      } ]
 *    } );
 *
 *  @example
 *    // Specify a source format - in this case a unix timestamp
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: $.fn.dataTable.render.moment( 'X', 'Do MMM YY' )
 *      } ]
 *    } );
 *
 *  @example
 *    // Specify a source format and locale
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: $.fn.dataTable.render.moment( 'YYYY/MM/DD', 'Do MMM YY', 'fr' )
 *      } ]
 *    } );
 */


// UMD
(function (factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], function ($) {
            return factory($, window, document);
        });
    }
    else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function (root, $) {
            if (!root) {
                root = window;
            }

            if (!$) {
                $ = typeof window !== 'undefined' ?
                    require('jquery') :
                    require('jquery')(root);
            }

            return factory($, root, root.document);
        };
    }
    else {
        // Browser
        factory(jQuery, window, document);
    }
}
    (function ($, window) {
        $.fn.dataTable.render.moment = function (from, to, locale) {
            // Argument shifting
            if (arguments.length === 1) {
                locale = 'en';
                to = from;
                from = 'YYYY-MM-DD';
            }
            else if (arguments.length === 2) {
                locale = 'en';
            }

            return function (d, type) {
                if (!d)
                    return '';
                var m = window.moment(d, from, locale, true);
                return m.format(type === 'sort' || type === 'type' ? 'x' : to);
            };
        };

        $.fn.dataTable.render.status = function () {
            return function (s) {
                var e = {
                    0: { title: 'Không rõ', class: 'm-badge--default' },
                    1: { title: 'Hoạt động', class: 'm-badge--success' },
                    2: { title: 'Tạm ngưng', class: 'm-badge--warning' },
                    3: { title: 'Hết hạn', class: 'm-badge--danger' }
                };

                return '<span class="m-badge m-badge--wide ' + e[s].class + '">' + e[s].title + '</span>';
            };
        };

        $.fn.dataTable.render.telco = function () {
            return function (t) {
                return '<i class="telco telco-' + t.toLowerCase() + '"></i>';
            };
        };

        $.fn.dataTable.render.statusb = function () {
            return function (s) {
                var e = {
                    '-1': { title: 'Tin đã khóa', class: 'm-badge--danger' },
                    0: { title: 'Chờ đăng tin', class: 'm-badge--warning' },
                    1: { title: 'Tin thường', class: 'm-badge--default' },
                    2: { title: 'Đặc biệt', class: 'm-badge--success' }
            };

                return '<span class="m-badge m-badge--wide ' + e[s].class + '">' + e[s].title + '</span>';
            };
        };

        $.fn.dataTable.render.statusc = function () {
            return function (s) {
                var e = {
                    0: { title: 'Đang treo', class: 'm-badge--brand' },
                    1: { title: 'Thất bại', class: ' m-badge--warning' },
                    2: { title: 'Thành công', class: ' m-badge--success' },
                    3: { title: 'Lỗi Game', class: ' m-badge--danger' },
                    '-1': { title: 'Nghiêm trọng', class: ' m-badge--danger' }
                };

                return '<span class="m-badge m-badge--wide ' + e[s].class + '">' + e[s].title + '</span>';
            };
        };

        $.fn.dataTable.render.statusx = function () {
            return function (s) {
                var e = {
                    0: { title: 'Đang treo', class: 'm-badge--brand' },
                    1: { title: 'Thất bại', class: ' m-badge--warning' },
                    2: { title: 'Thành công', class: ' m-badge--success' },
                    3: { title: 'Lỗi Game', class: ' m-badge--danger' },
                    '-1': { title: 'Nghiêm trọng', class: ' m-badge--danger' }
                };

                return '<span class="m-badge m-badge--wide ' + e[s].class + '">' + e[s].title + '</span>';
            };
        };

        $.fn.dataTable.render.statusw = function () {
            return function (s) {
                var e = {
                    0: { title: "Đang chờ", class: "m-badge--brand" },
                    1: { title: "Đang xử lý", class: "m-badge--info" },
                    2: { title: "Thất bại", class: "m-badge--warning" },
                    3: { title: "Thành công", class: "m-badge--success" },
                    '-1': { title: 'Nghiêm trọng', class: ' m-badge--danger' }
                };

                return '<span class="m-badge m-badge--wide ' + e[s].class + '">' + e[s].title + '</span>';
            };
        };

        $.fn.dataTable.render.statusm = function () {
            return function (s) {
                var e = {
                    0: { title: "Đổi thẻ", class: "m-badge--brand" },
                    1: { title: "Rút tiền", class: "m-badge--info" },
                    2: { title: "Mua thẻ", class: "m-badge--success" },
                    3: { title: "Chuyển khoản", class: "m-badge--metal" },
                    4: { title: "Hoàn rút", class: "m-badge--warning" },
                    5: { title: "Hoàn mua", class: "m-badge--warning" }
                };

                return '<span class="m-badge m-badge--wide ' + e[s].class + '">' + e[s].title + '</span>';
            };
        };

        $.fn.dataTable.render.action = function () {
            return function (x, type, row) {
                var viewBtn = '<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
                var editBtn = '<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Update"><i class="la la-edit"></i></a>';
                var delBtn = '<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete"><i class="la la-trash"></i></a>';
                return viewBtn + editBtn + delBtn;
            };
        };

        $.fn.dataTable.buildQuery = function (inputFilter) {
            var queryString = '';
            for (var key in inputFilter) {
                if (queryString === '')
                    queryString += '?';
                else
                    queryString += '&';
                queryString += key + '=' + encodeURIComponent(inputFilter[key]);
            }
            return queryString;
        };
    }));
