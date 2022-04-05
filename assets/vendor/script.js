$(document).ready(function () {
    var emailReg = /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,3}|[.][\w-]{2,3}[.][a-zA-Z]{2,3})$/;
    var characterReg = /^[A-Za-z]+$/;
    var addressReg = /^[a-zA-Z0-9-\/] ?([a-zA-Z0-9-\/]|[a-zA-Z0-9-\/] )*[a-zA-Z0-9-\/]$/;

    // display empty fields error message
    function emptyFields(input) {
        input.addClass('invalid');
        input.next().text('This field is required')
        input.next().show();
    }

    // Validates whether First Name , Last Name and Address is valid or not.
    function fieldValidation(name, regex, error_msg) {
        if(!regex.test(name.val())) {
            name.next().show()
            name.addClass('invalid');
            name.next().text(error_msg);
        }
    }
    
    //Validates whether First Name , Last Name and Address fields is empty or valid.
    function validateData(name,regex,error_msg) {
        name.removeClass('invalid');
        name.next().hide();
        if(name.val() === '' ) {
            emptyFields(name);
        } else {
            fieldValidation(name, regex, error_msg)
        }
    }

    //Validates whether Email field is empty or valid
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

    // validates whether user checked the gender field
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
        gender.change(function() {
            gender.each(function() {
                $(this).removeClass('invalid');
            })
            gender.parentsUntil('form').next('#gender-msg').hide();
        })
    }

    // validates whether user accepted terms and condition
    function validateCheckbox(terms) {
        terms.removeClass('invalid');
        if (!(terms.is(':checked'))) {
            terms.addClass('invalid');
            terms.parentsUntil('form').next('#terms-msg').show()
            terms.parentsUntil('form').next('#terms-msg').text('**Please accept terms and condition!!**')
        } 
        $(terms).change(function() {
            terms.removeClass('invalid');
            terms.parentsUntil('form').next('#terms-msg').toggle();
        })
    }
    
    // validates all the fields 
    function validateForm() {
        var fname = $('#fname');
        var lname = $('#lname');
        var email = $('#email');
        var gender_radio_btn = $('input:radio[name="gender"]');
        var terms = $('#terms');
        var address = $('#address');
        validateData(fname,characterReg,'Please enter valid First Name');
        validateData(lname,characterReg,'Please enter valid Last Name');
        validateData(address,addressReg,'Please enter valid Address');
        validateEmail(email,emailReg);
        validateGender(gender_radio_btn);
        validateCheckbox(terms);
        
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