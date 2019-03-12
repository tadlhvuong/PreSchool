(function () {
    var dataTable = $('#MainTable').DataTable({
        order: [],
        paging: true,
        serverSide: true,
        processing: true,
        searching: false,
        pagingType: "full_numbers",
        language: {
            loadingRecords: '&nbsp;',
            processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Loading... </div>'
        },
        dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
        listAction: {
            disableResponseHtmlEncoding: true,
            ajaxFunction: function (inputFilter) {
                return $.ajax('/Admin/BlogPost/GetList' + $.fn.dataTable.buildQuery(inputFilter));
            },
            inputFilter: function () {
                return {
                    search: $('#MainSearchId').val(),
                    //CatFilterId: $('#CatFilterId').val(),
                    BlogFormatFilter: $('#FormatFilterId').val(),
                    statusFilter: $('#StatusFilterId').val()
                };
            }
        },
        columnDefs: [
            {
                targets: 0,
                data: "image"
            },
            {
                targets: 1,
                data: "title"
            },
            {
                targets: 2,
                data: "preview"
            },
            {
                targets: 3,
                data: "format"
            },
            {
                targets: 4,
                data: "createTime",
                render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
            },
            {
                targets: 5,
                data: "publishTime",
                render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
            },
            {
                targets: 6,
                data: "status",
                orderable: false,
                render: $.fn.dataTable.render.status()
            },
            {
                targets: 7,
                data: "id",
                orderable: false,
                render: function (id) {
                    return viewButton(id) + editButton(id);
                }
            }
        ]
    });

    function reloadData() {
        dataTable.ajax.reload();
    }

    function viewButton(id) {
        return '<a href="/Admin/BlogPost/Details/' + id + '" class="btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
    }

    function editButton(id) {
        return '<a href="/Admin/BlogPost/Update/' + id + '" class="btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Update"><i class="la la-edit"></i></a>';
    }

    $('#advancedFilterForm').submit(function (e) {
        e.preventDefault();
        reloadData();
    });
})();
