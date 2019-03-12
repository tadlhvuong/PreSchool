(function () {
    var dataTable = $('#MainTable').DataTable({
        order: [],
        paging: true,
        serverSide: true,
        processing: true,
        searching: false,
        layout: { theme: "default", class: "", scroll: !0, height: 380, footer: !1 },
        pagingType: "full_numbers",
        language: {
            loadingRecords: '&nbsp;',
            processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Loading... </div>'
        },
        dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-7'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
        listAction: {
            disableResponseHtmlEncoding: true,
            ajaxFunction: function (inputFilter) {
                return $.ajax('/Admin/Member/GetList' + $.fn.dataTable.buildQuery(inputFilter));
            },
            inputFilter: function () {
                return {
                    search: $('#MainSearchId').val(),
                    userTypeFilter: $('#UserTypeFilterId').val(),
                    userNameFilter: $('#UserNameFilterId').val(),
                    emailFilter: $('#EmailFilterId').val(),
                    phoneNumberFilter: $('#PhoneNumberFilterId').val(),
                    createIPFilter: $('#CreateIPFilterId').val(),
                    statusFilter: $('#StatusFilterId').val()
                };
            }
        },
        columnDefs: [
            {
                targets: 0,
                data: "userName"
            },
            {
                targets: 1,
                data: "email"
            },
            {
                targets: 2,
                data: "balance",
                render: $.fn.dataTable.render.number(',', '.', 0, '')
            },
            {
                targets: 3,
                data: "createTime",
                render: $.fn.dataTable.render.moment('', 'YYYY-MM-DD HH:mm:ss')
            },
            {
                targets: 4,
                data: "status",
                orderable: false,
                render: $.fn.dataTable.render.status()
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
