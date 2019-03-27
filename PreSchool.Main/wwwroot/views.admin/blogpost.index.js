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
            info: "Tổng số: _TOTAL_; Hiển thị từ _START_ tới _END_",
            lengthMenu: "Mỗi trang _MENU_ dòng",
            processing: '<div class="m-loader m-loader--brand m-loader--right m-loader--lg">Loading... </div>'
        },
        dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 dataTables_pager'lp>>",
        listAction: {
            disableResponseHtmlEncoding: true,
            ajaxFunction: function (inputFilter) {
                return $.ajax('/Admin/BlogPost/GetList' + $.fn.dataTable.buildQuery(inputFilter));
            },
            inputFilter: function () {
                return {
                    search: $('#MainSearchId').val(),
                    BlogFormatFilter: $('#FormatFilterId').val(),
                    statusFilter: $('#StatusFilterId').val()
                };
            }
        },
        columnDefs: [
            {
                targets: 0,
                data: "image",
                "sName": "category_image",
                "bSearchable": false,
                "bSortable": false,
                "mRender": function (data) {
                    if (data === null || data === '')
                        return '<img src="/img/image-not-found.gif" width="50" height="50" />'
                    return '<img src="' + data + '" width="50" height="50" />';
                }
            },
            {
                targets: 1,
                data: "title"
            },
            {
                targets: 2,
                data: "preview",
                render: function (data) {
                    if (!data)
                        return '';
                    return data.substr(0, 10) + " ...";
                }
            },
            {
                targets: 3,
                data: "firstCatName"
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
                render: $.fn.dataTable.render.statusb()
            },
            {
                targets: 7,
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
        return '<a href="/Admin/BlogPost/Details/' + id + '" class="btn m-btn m-btn--hover-primary m-btn--icon m-btn--icon-only m-btn--pill" title="View"><i class="la la-search"></i></a>';
    }

    function editButton(id) {
        return '<a  href="/Admin/BlogPost/Update/' + id + '" class="btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Update"><i class="la la-edit"></i></a>';
    }

    function deleteButton(id) {
        return '<a data-id="' + id + '" href="" class="btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Delete" id="remove"><i class="la la-trash"></i></a>';
    }

    $(document).on('click', '#remove', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        console.log(id);
        // Show the user a swal confirmation window
        swal({
            title: "Are you sure!",
            type: "error",
            confirmButtonClass: "swal2-confirm btn btn-danger m-btn m-btn--custom",
            confirmButtonText: "Yes",
            showCancelButton: true
        }).then(function (dismiss) {
            if (dismiss.value) {
                $.ajax({
                    url: "/Admin/BlogPost/Delete/" + id,
                    type: "POST",
                    success: function (data) {
                        console.log(data.icon);
                        if (data !== false) {
                            swal(data.title, "", data.icon);
                            reloadData();
                        } else {
                            swal(data.title, "", data.icon);
                        }
                    }, error: function () {
                        swal(data.title, "", data.icon);
                    }
                });
            } if (dismiss === "cancel") {
                reloadData();
            }
        });
    });
    $('#advancedFilterForm').submit(function (e) {
        e.preventDefault();
        reloadData();
    });
})();
