﻿(function () {
    var dataTable = $('#MainTable').DataTable({
        order: [],
        paging: true,
        serverSide: true,
        processing: true,
        searching: false,
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
                data: "userType"
            },
            {
                targets: 2,
                data: "email"
            },
            {
                targets: 3,
                data: "phoneNumber"
            },
            {
                targets: 4,
                data: "balance",
                render: $.fn.dataTable.render.number(',', '.', 0, '')
            },
            {
                targets: 5,
                data: "createIP"
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
                render: $.fn.dataTable.render.status()
            },
            {
                targets: 8,
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
        return '<a href="/Admin/Member/Details/' + id + '" class="btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
    }

    function editButton(id) {
        return '<a href="/Admin/Member/Update/' + id + '" class="modal-opener btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Update"><i class="la la-edit"></i></a>';
    }

    $('#advancedFilterForm').submit(function (e) {
        e.preventDefault();
        reloadData();
    });
})();
