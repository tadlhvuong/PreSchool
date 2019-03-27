var cashTable = $('#UserCashTable').DataTable({
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
        infoEmpty: "",
        zeroRecords: "Không có dữ liệu",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Đang tải... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Cash/GetCashLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#MainSearchId').val(),
                modeFilter: $('#CashModeFilter').val()
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
            data: "mode",
            orderable: false,
            render: $.fn.dataTable.render.statusm()
        },
        {
            targets: 2,
            data: "change",
            orderable: false,
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 3,
            data: "balance",
            orderable: false,
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 4,
            data: "id",
            orderable: false,
            render: function (id) {
                return '<a href="/Cash/CashDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="Xem chi tiết giao dịch"><i class="la la-search"></i></a>';
            }
        }
    ]
});

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
        infoEmpty: "",
        zeroRecords: "Không có dữ liệu",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Đang tải... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Cash/GetChargeLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#ChargeSearch').val(),
                statusFilter: $('#ChargeStatusFilter').val()
            };
        }
    },
    columnDefs: [
        {
            targets: 0,
            data: "createTime",
            render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
        },
        {
            targets: 1,
            data: "cardType",
            orderable: false,
            render: $.fn.dataTable.render.telco()
        },
        {
            targets: 2,
            data: "cardAmount",
            orderable: false,
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 3,
            data: "cardSeri",
            orderable: false
        },
        {
            targets: 4,
            data: "status",
            orderable: false,
            render: $.fn.dataTable.render.statusc()
        },
        {
            targets: 5,
            data: "id",
            orderable: false,
            render: function (id) {
                return '<a href="/Cash/ChargeDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
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
        infoEmpty: "",
        zeroRecords: "Không có dữ liệu",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Đang tải... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Cash/GetWithdrawLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#MainSearchId').val(),
                statusFilter: $('#WithdrawStatusFilter').val()
            };
        }
    },
    columnDefs: [
        {
            targets: 0,
            data: "createTime",
            render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
        },
        {
            targets: 1,
            data: "bankId",
            orderable: false
        },
        {
            targets: 2,
            data: "branch",
            orderable: false
        },
        {
            targets: 3,
            data: "accNumber",
            orderable: false
        },
        {
            targets: 4,
            data: "amount",
            orderable: false,
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 5,
            data: "status",
            orderable: false,
            render: $.fn.dataTable.render.statusw()
        },
        {
            targets: 6,
            data: "id",
            orderable: false,
            render: function (id) {
                return '<a href="/Cash/WithdrawDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
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
        infoEmpty: "",
        zeroRecords: "Không có dữ liệu",
        lengthMenu: "Mỗi trang _MENU_ dòng",
        processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Đang tải... </div>'
    },
    dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
    listAction: {
        disableResponseHtmlEncoding: true,
        ajaxFunction: function (inputFilter) {
            return $.ajax('/Cash/GetExchangeLogs' + $.fn.dataTable.buildQuery(inputFilter));
        },
        inputFilter: function () {
            return {
                search: $('#MainSearchId').val(),
                statusFilter: $('#ExchangeStatusFilter').val()
            };
        }
    },
    columnDefs: [
        {
            targets: 0,
            data: "createTime",
            render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
        },
        {
            targets: 1,
            data: "itemName",
            orderable: false
        },
        {
            targets: 2,
            data: "itemPrice",
            orderable: false,
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 3,
            data: "quantity",
            orderable: false,
            render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        {
            targets: 4,
            data: "totalPrice",
            orderable: false,
            render: $.fn.dataTable.render.number(',', '.', 0, '')
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
                return '<a href="/Cash/ExchangeDetails/' + id + '" class="modal-opener btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
            }
        }
    ]
});

$(document).ready(function () {
    $('.nav-tabs a').on('shown.bs.tab', function (event) {
        var hash = $(event.target)[0].hash;
        switch (hash) {
            case '#cashx':
                cashTable.ajax.reload();
                break;
            case '#charge':
                chargeTable.ajax.reload();
                break;
            case '#withdraw':
                withdrawTable.ajax.reload();
                break;
            case '#exchange':
                exchangeTable.ajax.reload();
                break;
        }
    });
    $('.ajax-select').change(function () {
        var thisForm = $(this).closest('form');
        thisForm.submit();
    });
    $('#ChargeSearch').keyup(function (e) {
        clearTimeout($.data(this, 'timer'));
        var timer = setTimeout(function () { chargeTable.ajax.reload(); }, 800);
        $(this).data('timer', timer);
    });
    $('#cashFilterForm').submit(function (e) {
        e.preventDefault();
        cashTable.ajax.reload();
    });
    $('#chargeFilterForm').submit(function (e) {
        e.preventDefault();
        chargeTable.ajax.reload();
    });
    $('#withdrawFilterForm').submit(function (e) {
        e.preventDefault();
        withdrawTable.ajax.reload();
    });
    $('#exchangeFilterForm').submit(function (e) {
        e.preventDefault();
        exchangeTable.ajax.reload();
    });
    cashTable.ajax.reload();
});
