$(document).ready(function () {
    var emailReg = /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,3}|[.][\w-]{2,3}[.][a-zA-Z]{2,3})$/;
    var characterReg = /^[A-Za-z]+$/;
    var addressReg = /^[a-zA-Z0-9-\/] ?([a-zA-Z0-9-\/]|[a-zA-Z0-9-\/] )*[a-zA-Z0-9-\/]$/;

    // function empty_field() {
    //     $('form').each(function() {
    //        var inputs = ($(this).find(':input'));
    //        console.log(inputs)
    //        inputs.each(function() {
    //           if($(this).val() == ""){
    //               $('.error-message').text("**This field is required!!**")
    //           } else {
    //               $('.error-message').text('')
    //           }
    //        })
    //     })
    // }

    function validateData(name,error,regex,error_msg) {
        $(error).removeClass('invalid');
        if(name.val() == '' || name.val() === null) {
            $(error).addClass('invalid');
            $(error).text('This field is required');
            return false;
        } else if(!regex.test(name.val())) {
            $(error).addClass('invalid');
            $(error).text(error_msg);
            return false;
        } else if($(error) != '') {
            $(error).hide()
            return true;
        }
    }

    
    function validateGender(gender) {
        $('#gender-msg').removeClass('invalid');
        if(!(gender.is(':checked'))) {
            $('#gender-msg').addClass('invalid');
            $('#gender-msg').text('**Please select your gender**')
            return false;
        }
    }
    
    function remove_error_radio(gender) {
        $(gender).change(function() {
            $('#gender-msg').removeClass('invalid');
            $('#gender-msg').hide();
            return true;
        })
    }

    function validateCheckbox(terms) {
        $('#terms-msg').removeClass('invalid');
        if (!(terms.is(':checked'))) {
            $('#terms-msg').addClass('invalid');
            $('#terms-msg').show();
            $('#terms-msg').text('**Please accept terms and condition!!**');
            return false;
        } 
    }

    function remove_terms(terms) {
        $(terms).change(function() {
            $('#terms-msg').removeClass('invalid');
            $('#terms-msg').toggle();
            return true;
        })
    }
    
    function validateForm() {
        var fname = $('#fname');
        var lname = $('#lname');
        var email = $('#email');
        var gender_radio_btn = $('input:radio[name="gender"]');
        var terms = $('input:checkbox[name="terms"]');
        var address = $('#address');
        var fname_error = $('#fname-msg')
        var lname_error = $('#lname-msg')
        var address_error = $('#address-msg')
        validateData(fname,fname_error,characterReg,'Please enter valid first name');
        validateData(lname,lname_error,characterReg,'Please enter valid last name');
        validateData(address,address_error,addressReg,'Please enter valid Address');
        validateGender(gender_radio_btn);
        remove_error_radio(gender_radio_btn);
        validateCheckbox(terms);
        remove_terms(terms);

        $('#email-msg').removeClass('invalid');
        if(email.val() == '' || email.val() === null) {
            $('#email-msg').addClass('invalid');
            $('#email-msg').text('**Email Field cant be empty!!**');
            return false
        } else if(!emailReg.test(email.val())) {
            $('#email-msg').addClass('invalid');
            $('#email-msg').text('**Please enter valid email**');
            return false
        } else if($('#email-msg') != '') {
            $('#email-msg').removeClass('invalid');
            $('#email-msg').hide();
        }

        if($('.error-message').hasClass('invalid')){
            return false;
        } else { 
            alert('form submitted successfully!!')
            return true;
        } 
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