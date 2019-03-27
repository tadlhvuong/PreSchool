$(document).ready(function () {
    mainInit();
    ajaxInit();
});

function mainInit() {
    $(document).on('click', '#CaptchaImg', function (e) {
        e.preventDefault();
        captchaReload();
    });
    $(document).on('click', '.modal-opener', function (e) {
        e.preventDefault();
        modalOpen(this.href);
    });
    $(document).on('click', '.modal-closer', function (e) {
        e.preventDefault();
        $('#modalContainer').modal('hide');
    });
    $(document).on('click', '.modal-refresh', function (e) {
        e.preventDefault();
        location.reload();
    });
    $('#modalContainer').on('d-none.bs.modal', function () {
        $('#modalContent').html('');
    });
}

function ajaxInit() {
    $.ajaxSetup({ cache: false });
    $(document).on('submit', '.form-ajax', function (e) {
        if (!$(this).valid())
            return false;

        var target = $(this).data('target');

        $('#progress').show();
        $(this).find(':submit').hide();

        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (result) {
                if (target)
                    $(target).html(result);
                else
                    modalRender(result);
                captchaReload();
            },
            error: function () {
                modalReset();
                captchaReload();
            }
        });

        return false;
    });
}

function captchaReload() {
    $('#Captcha').val('');
    $('#CaptchaImg').removeAttr('src').attr('src', '/Home/Captcha');
}

function modalOpen(href) {
    $.get(href, function (result) {
        modalRender(result);
    });
}

function modalRender(result) {
    if (result.code === 1) {
        $('#modalContainer').modal('hide');
        if (result.message) {
            swal(result.title, result.message, result.icon).then(function () { location.reload(); });
        } else {
            location.reload();
        }
    }
    else if (result.code === 2) {
        if (result.message) { swal(result.title, result.message, result.icon); }
        modalReset();
    }
    else if (result.code === 3) {
        $('#modalContainer').modal('hide');
        swal(result.title, result.message, result.icon).then(function () { location.reload(); });
    }
    else if (result.code === 10) {
        if (result.returnUrl)
            location.href = result.returnUrl;
        else
            location.reload();
    }
    else {
        $('#modalContent').html(result);
        $('#modalContainer').modal({ keyboard: true });
        modalReset();
    }
}

function modalReset() {
    $('#progress').hide();
    $('.form-ajax').find(':submit').show();
    $('.form-ajax').removeData('validator');
    $('.form-ajax').removeData('unobtrusiveValidation');
    $('.input-captcha').removeClass('state-success');
    $.validator.unobtrusive.parse('form');
}
