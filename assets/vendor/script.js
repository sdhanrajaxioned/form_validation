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

    function emptyFields(input) {
        input.addClass('invalid');
        input.next().text('This field is required')
        input.next().show();
    }

    function fieldValidation(name, regex, error_msg) {
        if(!regex.test(name.val())) {
            name.next().show()
            name.addClass('invalid');
            name.next().text(error_msg);
        }
    }
    
    function validateData(name,regex,error_msg) {
        name.removeClass('invalid');
        name.next().hide();
        if(name.val() === '' ) {
            emptyFields(name);
        } else {
            fieldValidation(name, regex, error_msg)
        }
    }

    function validateEmail(email, emailReg) {
        email.removeClass('invalid');
        if(email.val() == '') {
            email.addClass('invalid');
            email.next().text('**Email Field cant be empty!!**')
        } else if(!emailReg.test(email.val())) {
            email.addClass('invalid');
            email.next().text('**Please enter valid email**')
            return false
        } else if($('#email-msg') != '') {
            email.removeClass('invalid');
            email.next().hide();
        }
      }

    function validateGender(gender) {
        gender.each(function() {
            $(this).removeClass('invalid');
        })
        if(!(gender.is(':checked'))) {
            gender.each(function() {
                $(this).addClass('invalid');
            })
            gender.parentsUntil('form').next('#gender-msg').text('**Please select your gender**')
        }
    }
    
    function remove_error_radio(gender) {
        gender.change(function() {
            gender.each(function() {
                $(this).removeClass('invalid');
            })
            gender.parentsUntil('form').next('#gender-msg').hide();
        })
    }

    function validateCheckbox(terms) {
        terms.removeClass('invalid');
        if (!(terms.is(':checked'))) {
            terms.addClass('invalid');
            // $('#terms-msg').addClass('invalid');
            terms.parentsUntil('form').next('#terms-msg').show()
            terms.parentsUntil('form').next('#terms-msg').text('**Please accept terms and condition!!**')
        } 
    }

    function remove_terms(terms) {
        $(terms).change(function() {
            terms.removeClass('invalid');
            terms.parentsUntil('form').next('#terms-msg').toggle();
        })
    }
    
    function validateForm() {
        var fname = $('#fname');
        var lname = $('#lname');
        var email = $('#email');
        var gender_radio_btn = $('input:radio[name="gender"]');
        var terms = $('input:checkbox[name="terms"]');
        var address = $('#address');
        validateData(fname,characterReg,'Please enter valid first name');
        validateData(lname,characterReg,'Please enter valid last name');
        validateData(address,addressReg,'Please enter valid Address');
        validateEmail(email,emailReg);
        validateGender(gender_radio_btn);
        remove_error_radio(gender_radio_btn);
        validateCheckbox(terms);
        remove_terms(terms);
        
        if($('.form-container input').hasClass('invalid') || $('.form-container textarea').hasClass('invalid')){
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