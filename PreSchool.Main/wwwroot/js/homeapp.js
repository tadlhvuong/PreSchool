$(document).ready(function () {
    ajaxInit();
    modalInit();
});

function ajaxInit() {
    $.ajaxSetup({ cache: false });
    $('.ajax-form').submit(function () {
        var target = $(this).data('target');
        if (!target)
            return false;

        if (!$(this).valid())
            return false;

        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (result) { $(target).html(result); },
            error: function () { $(target).html(''); }
        });

        return false;
    });
    $(document).on('click', '.ajax-link', function (e) {
        e.preventDefault();
        var target = $(this).data('target');
        if (target) {
            $(target).load(this.href);
        }
    });
}

function modalInit() {
    $('form input:checkbox').on('change', function () {
        if ($(this).is(':checked')) {
            $(this).attr('value', 'true');
        } else {
            $(this).attr('value', 'false');
        }
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
    $(document).on('click', '#CaptchaImg', function (e) {
        e.preventDefault();
        $('#CaptchaImg').removeAttr('src').attr('src', '/Home/Captcha');
    });
    $('#modalContainer').on('d-none.bs.modal', function () {
        $('#modalContent').html('');
    });

    modalAjax('.modalForm');
}

function modalOpen(href) {
    $.get(href, function (result) {
        modalRender(result);
    });
}

function modalReset(form) {
    $('#progress').hide();
    $(form).find(':submit').show();
    $('#Captcha').val('');
    $('.input-captcha').removeClass('state-success');
    $('#CaptchaImg').removeAttr('src').attr('src', '/Home/Captcha');
}

function modalRender(result) {
    if (result.code === 1) {
        $('#modalContainer').modal('hide');
        if (result.message) {
            swal(result.title, result.message, result.icon).then(function () { location.reload(); });
        } else {
            location.reload();
        }
        return false;
    }
    else if (result.code === 2) {
        if (result.message) {
            swal(result.title, result.message, result.icon);
        }
        return true;
    }
    else if (result.code === 3) {
        $('#modalContainer').modal('hide');
        swal(result.title, result.message, result.icon).then(function () { location.reload(); });
        return false;
    }
    else if (result.code === 10) {
        if (result.returnUrl)
            location.href = result.returnUrl;
        else
            location.reload();

        return false;
    }
    else {
        $('#modalContent').html(result);
        $('#modalContainer').modal({ keyboard: true });
        $('#Captcha').val('');
        $('form').removeData('validator');
        $('form').removeData('unobtrusiveValidation');
        $.validator.unobtrusive.parse('form');
        modalAjax('.modalForm');
        return false;
    }
}

function modalAjax(form) {
    $(form).submit(function () {
        if (!$(this).valid())
            return false;

        $(form).find(':submit').hide();
        $('#progress').show();

        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (result) {
                if (modalRender(result))
                    modalReset(form);
            },
            error: function () {
                modalReset(form);
            }
        });

        return false;
    });
}
