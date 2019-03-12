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
                return $.ajax('/Admin/BlogPost/GetPostCatList' + $.fn.dataTable.buildQuery(inputFilter));
            }
        },
        columnDefs: [
            {
                targets: 0,
                data: "id"
            },
            {
                targets: 1,
                data: "parentName"
            },
            {
                targets: 2,
                data: "name"
            },
            {
                targets: 3,
                data: "id",
                orderable: false,
                render: function (id) {
                    return editButton(id);
                }
            }
        ]
    });

    function reloadData() {
        dataTable.ajax.reload();
    }

    function editButton(id) {
        return '<a href="/Admin/BlogPost/PostCatUpdate/' + id + '" class="modal-opener btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Update"><i class="la la-edit"></i></a>';
    }

    $('#advancedFilterForm').submit(function (e) {
        e.preventDefault();
        reloadData();
    });
})();
