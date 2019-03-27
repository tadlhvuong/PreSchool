var chargeTable = $('#UserChargesTable').DataTable({
    order: [],
    paging: true,
    serverSide: true,
    processing: true,
    searching: false,
    deferLoading: true,
    pagingType: "full_numbers",
    language: {
        loadingRecords: '&nbsp;',
        info: "Tổng số: _TOTAL_; Hiển thị từ _START_ tới _END_",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Loading... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Admin/CashLog/GetChargeLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#MainSearchId').val(),
                userId: $('#UserFilterId').val(),
                statusFilter: $('#StatusFilterId').val()
            };
        }
    },
    columnDefs: [
        {
            targets: 0,
            data: "orderId"
        },
        {
            targets: 1,
            data: "vendorId"
        },
        {
            targets: 2,
            data: "cardType",
            render: $.fn.dataTable.render.telco()
        },
        {
            targets: 3,
            data: "cardSeri"
        },
        {
            targets: 4,
            data: "cardAmount",
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 5,
            data: "createTime",
            render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
        },
        {
            targets: 6,
            data: "status",
            orderable: false,
            render: $.fn.dataTable.render.statusc()
        },
        {
            targets: 7,
            data: "id",
            orderable: false,
            render: function (id) {
                return '<a href="/Admin/CashLog/ChargeDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
            }
        }
    ]
});

var withdrawTable = $('#UserWithdrawsTable').DataTable({
    order: [],
    paging: true,
    serverSide: true,
    processing: true,
    searching: false,
    deferLoading: true,
    pagingType: "full_numbers",
    language: {
        loadingRecords: '&nbsp;',
        info: "Tổng số: _TOTAL_; Hiển thị từ _START_ tới _END_",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Loading... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Admin/CashLog/GetWithdrawLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#MainSearchId').val(),
                userId: $('#UserFilterId').val(),
                statusFilter: $('#StatusFilterId').val()
            };
        }
    },
    columnDefs: [
        {
            targets: 0,
            data: "orderId"
        },
        {
            targets: 1,
            data: "bankId"
        },
        {
            targets: 2,
            data: "branch"
        },
        {
            targets: 3,
            data: "accNumber"
        },
        {
            targets: 4,
            data: "amount",
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 5,
            data: "createTime",
            render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
        },
        {
            targets: 6,
            data: "status",
            orderable: false,
            render: $.fn.dataTable.render.statusw()
        },
        {
            targets: 7,
            data: "id",
            orderable: false,
            render: function (id) {
                return '<a href="/Admin/CashLog/WithdrawDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
            }
        }
    ]
});

var exchangeTable = $('#UserExchangesTable').DataTable({
    order: [],
    paging: true,
    serverSide: true,
    processing: true,
    searching: false,
    deferLoading: true,
    pagingType: "full_numbers",
    language: {
        loadingRecords: '&nbsp;',
        info: "Tổng số: _TOTAL_; Hiển thị từ _START_ tới _END_",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Loading... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Admin/CashLog/GetExchangeLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#MainSearchId').val(),
                userId: $('#UserFilterId').val(),
                statusFilter: $('#StatusFilterId').val()
            };
        }
    },
    columnDefs: [
        {
            targets: 0,
            data: "orderId"
        },
        {
            targets: 1,
            data: "vendor"
        },
        {
            targets: 2,
            data: "itemName"
        },
        {
            targets: 3,
            data: "totalPrice",
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 4,
            data: "createTime",
            render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
        },
        {
            targets: 5,
            data: "status",
            orderable: false,
            render: $.fn.dataTable.render.statusx()
        },
        {
            targets: 6,
            data: "id",
            orderable: false,
            render: function (id) {
                return '<a href="/Admin/CashLog/ExchangeDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
            }
        }
    ]
});

var accountTable = $('#UserAccLogsTable').DataTable({
    order: [],
    paging: true,
    serverSide: true,
    processing: true,
    searching: false,
    deferLoading: true,
    pagingType: "full_numbers",
    language: {
        loadingRecords: '&nbsp;',
        info: "Tổng số: _TOTAL_; Hiển thị từ _START_ tới _END_",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Loading... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Admin/Member/GetAccountLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#MainSearchId').val(),
                userId: $('#UserFilterId').val(),
                statusFilter: $('#StatusFilterId').val()
            };
        }
    },
    columnDefs: [
        {
            targets: 0,
            data: "logTime",
            render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
        },
        {
            targets: 1,
            data: "remoteIP"
        },
        {
            targets: 2,
            data: "action"
        },
        {
            targets: 3,
            data: "logData"
        }
    ]
});
