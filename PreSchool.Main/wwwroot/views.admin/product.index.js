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
                return $.ajax('/Admin/Product/GetList' + $.fn.dataTable.buildQuery(inputFilter));
            },
            inputFilter: function () {
                return {
                    search: $('#MainSearchId').val(),
                    nameFilter: $('#NameFilterId').val(),
                    statusFilter: $('#StatusFilterId').val()
                };
            }
        },
        columnDefs: [
            {
                targets: 0,
                data: "name"
            },
            {
                targets: 1,
                data: "catName"
            },
            {
                targets: 2,
                data: "price",
                render: $.fn.dataTable.render.number(',', '.', 0, '')
            },
            {
                targets: 3,
                data: "createTime",
                render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
            },
            {
                targets: 4,
                data: "lastUpdate",
                render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
            },
            {
                targets: 5,
                data: "status",
                orderable: false,
                render: $.fn.dataTable.render.status()
            },
            {
                targets: 6,
                data: "id",
                orderable: false,
                render: function (id) {
                    return viewButton(id) + editButton(id) + deleteButton(id);
                }
            }
        ]
    });

    function reloadData() {
        dataTable.ajax.reload();
    }

    function viewButton(id) {
        return '<a href="/Admin/Product/Details/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
    }

    function editButton(id) {
        return '<a href="/Admin/Product/Update/' + id + '" class="modal-opener btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Update"><i class="la la-edit"></i></a>';
    }

    function deleteButton(id) {
        return '<a href="/Admin/Product/Delete/' + id + '" class="modal-opener btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete"><i class="la la-trash"></i></a>';
    }

    $('#advancedFilterForm').submit(function (e) {
        e.preventDefault();
        reloadData();
    });
})();
