//modal
const buyBtns = document.querySelectorAll('.js-buy-news');
const modal = document.querySelector('.js-modal');
const modalClose = document.querySelector('.js-modal-close');
const modalContainer = document.querySelector('.js-modal-container');

function showBuyNews() {
    modal.classList.add('modal-open');
}

function hideBuyNews() {
    modal.classList.remove('modal-open');
}

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyNews);
}

modalClose.addEventListener('click', hideBuyNews);

modal.addEventListener('click',hideBuyNews);

modalContainer.addEventListener('click',function(event) {
    event.stopPropagation();
})

function confirmModal() {
    var arr = document.getElementsByClassName('modal-input');
    var name = arr[0].value;
    var contact = arr[1].value;
    var address = arr[2].value;
    var number = arr[3].value;
    if(name != "" && contact != "" && address != "" && number != "") {
        alert('Done!')
    }
}

function Validator(options) {

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector('.form-error');
        var errorMessage = rule.test(inputElement.value);
                    
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');   
        }
    }

    var formElement = document.querySelector(options.form);

    if(formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                inputElement.oninput = function() {               
                    var errorElement = inputElement.parentElement.querySelector('.form-error');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid'); 
                }
            }
        });
    }
}

Validator.isName = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : 'Please input your name';
        }
    }
}

Validator.isContact = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex_mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var regex_number = /^[0-9]*[1-9]+$|^[1-9]+[0-9]*$/;
            if(regex_mail.test(value) || regex_number.test(value)) {
                undefined;
            }
            else {
                return 'Please input your email or your phone number';
            }
        }
    };
}

Validator.isAddress = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : 'Please input your address';
        }
    }
}

Validator.isQuantity = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : 'Please input the number of newspapers you want';
        }
    }
}

Validator({
    form: '#modal-form',
    rules:[
        Validator.isName('#modal-name'),
        Validator.isContact('#modal-contact'),
        Validator.isAddress('#modal-address'),
        Validator.isQuantity('#modal-quantity'),
    ]
});