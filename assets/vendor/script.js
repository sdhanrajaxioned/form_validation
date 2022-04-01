$(document).ready(function () {
    var fname = $('#fname');
    var lname = $('#lname');
    var email = $('#email');
    var gender_radio_btn = $('input:radio[name="gender"]');
    var address = $('#address');
    var terms = $('input:checkbox[name="terms"]');
    var emailReg = /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,3}|[.][\w-]{2,3}[.][a-zA-Z]{2,3})$/;
    var characterReg = /^[A-Za-z]+$/;
    var addressReg = /^[a-zA-Z0-9-\/] ?([a-zA-Z0-9-\/]|[a-zA-Z0-9-\/] )*[a-zA-Z0-9-\/]$/;
    var fname_error = $('#fname-msg')
    var lname_error = $('#lname-msg')

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

    function validateName(name,error,regex) {
        if(name.val() == '' || name.val() === null) {
            $(error).show()
            $(error).text(`**${$(name).attr('name')} name field cant be empty!!**`);
            return false;
        } else if(!regex.test(name.val())) {
            $(error).show()
            $(error).text('**Please Enter a valid name!**');
            return false;
        } else if($(error) != '') {
            $(error).hide()
        }
    }

    function remove_error_radio() {
        $(gender_radio_btn).change(function() {
            $('#gender-msg').hide();
        })
    }

    function validateGender() {
        if(!(gender_radio_btn.is(':checked'))) {
            $('#gender-msg').show();
            $('#gender-msg').text('**Please select your gender**')
            return false;
        }
    }

    function validateAddress() {
        if(address.val() == "" || address.val() === null) {
        $('#address-msg').show()
        $('#address-msg').text('**Address field cant be empty!!**')
        return false;
        } else if(!addressReg.test(address.val())) {
            $('#address-msg').show()
            $('#address-msg').text('**Plese enter valid Address**');
            return false;
        } else if('#address-msg' != '') {
            $('#address-msg').hide();
        }
    }

    function validateCheckbox() {
        if (!(terms.is(':checked'))) {
            $('#terms-msg').show();
            $('#terms-msg').text('**Please accept terms and condition!!**');
            return false;
        } 
    }

    function remove_terms() {
        $(terms).change(function() {
            $('#terms-msg').toggle()
        })
    }
    
    function validateForm() {
        validateName(fname,fname_error,characterReg);
        validateName(lname,lname_error,characterReg);
        validateAddress()
        validateGender();
        remove_error_radio();
        validateCheckbox();
        remove_terms();

        if(email.val() == '' || email.val() === null) {
            $('#email-msg').show();
            $('#email-msg').text('**Email Field cant be empty!!**');
            return false
        } else if(!emailReg.test(email.val())) {
            $('#email-msg').show();
            $('#email-msg').text('**Please enter valid email**');
            return false
        } else if($('#email-msg') != '') {
            $('#email-msg').hide();
        }
        alert('form submitted Successfully')
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