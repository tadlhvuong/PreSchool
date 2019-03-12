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
                return $.ajax('/Admin/CashLog/GetChargeLogs' + $.fn.dataTable.buildQuery(inputFilter));
            },
            inputFilter: function () {
                return {
                    search: $('#MainSearchId').val(),
                    vendorFilter: $('#VendorFilterId').val(),
                    cardTypeFilter: $('#CardTypeFilterId').val(),
                    statusFilter: $('#StatusFilterId').val()
                };
            }
        },
        columnDefs: [
            {
                targets: 0,
                data: "userName",
                render: function (name, type, row) {
                    return '<a href="/Admin/Member/Details/' + row.userId + '">' + name + '</a>';
                }
            },
            {
                targets: 1,
                data: "orderId"
            },
            {
                targets: 2,
                data: "vendorId"
            },
            {
                targets: 3,
                data: "cardType",
                render: $.fn.dataTable.render.telco()
            },
            {
                targets: 4,
                data: "cardSeri"
            },
            {
                targets: 5,
                data: "originAmount",
                render: $.fn.dataTable.render.number(',', '.', 0, '')
            },
            {
                targets: 6,
                data: "createTime",
                render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
            },
            {
                targets: 7,
                data: "status",
                orderable: false,
                render: $.fn.dataTable.render.statusc()
            },
            {
                targets: 8,
                data: "id",
                orderable: false,
                render: function (id) {
                    return '<a href="/Admin/CashLog/ChargeDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
                }
            }
        ]
    });

    function reloadData() {
        dataTable.ajax.reload();
    }

    $('#advancedFilterForm').submit(function (e) {
        e.preventDefault();
        reloadData();
    });
})();