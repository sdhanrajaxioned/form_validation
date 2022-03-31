$(document).ready(function () {
    var fname = $('#fname');
    var lname = $('#lname');
    var gender_radio_btn = $('input:radio[name="gender"]');
    var address = $('#address');
    var terms = $('input:checkbox[name="terms"]');
    console.log(terms.is(':checked'));
    var characterReg = /^[A-Za-z]+$/;
    var addressReg = /^[a-zA-Z0-9-\/] ?([a-zA-Z0-9-\/]|[a-zA-Z0-9-\/] )*[a-zA-Z0-9-\/]$/;

    $('#fname-msg').hide()
    $('#lname-msg').hide()
    $('#gender-msg').hide()
    $('#address-msg').hide()
    $('#terms-msg').hide()


    function validateForm() {
        if (fname.val() == '' || fname.val() === null) {
            $('#fname-msg').show();
            $('#fname-msg').text('**First Name Field cant be empty!!**');
            return false;
        } else if ((fname.val().length < 3) || (fname.val().length > 12)) {
            $('#fname-msg').show();
            $('#fname-msg').text('**First Name should not be less than 3 or greater than 12!**');
            return false;
        } else if (!characterReg.test(fname.val())) {
            $('#fname-msg').show();
            $('#fname-msg').text('**Please Enter a valid name!**');
            return false;
        }

        if (lname.val() == "" || lname.val() == null) {
            $('#lname-msg').show();
            $('#lname-msg').text('**Last Name Field cant be empty!!**');
            return false;
        } else if (!characterReg.test(lname.val())) {
            $('#lname-msg').show();
            $('#lname-msg').text('**Please Enter a valid Last name!**');
            return false;
        } else if ((lname.val().length < 3) || (lname.val().length > 12)) {
            $('#fname-msg').show();
            $('#fname-msg').text('**last Name should not be less than 3 or greater than 12!**');
            return false;
        }

        if (!(gender_radio_btn.is(':checked'))) {
            $('#gender-msg').show();
            $('#gender-msg').text('**Please select your gender!!**')
            return false;
        }

        if (address.val() == "" || address.val() === null) {
            $('#address-msg').show();
            $('#address-msg').text('**Address field cant be empty!!**')
            return false;
        } else if (!addressReg.test(address.val())) {
            $('#address-msg').show();
            $('#address-msg').text('**Plese enter valid Address!!**');
            return false;
        } else if (address.val().length < 10) {
            $('#address-msg').show();
            $('#address-msg').text('**PLease enter Full Address!**');
            return false;
        }

        if (!(terms.is(':checked'))) {
            $('#terms-msg').show();
            $('#terms-msg').text('**Please accept terms and condition!!**');
            return false;
        }

        $('main').html('<h1>Form Sent Successfully!!</h1>');
        return true;
    }

    $('#submit-btn').click(validateForm);

    $('#cancel-btn').click(function (e) {
        $('input[type="text"]').val('');
        $('#address').val('');
        $(gender_radio_btn).prop('checked', false)
        $(terms).prop('checked', false);
        $('.error-message').hide();
        e.preventDefault();
    })
})