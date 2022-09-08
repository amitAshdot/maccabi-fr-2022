document.addEventListener("DOMContentLoaded", function () {
    // -----START IS ON SCREEN-----
    // // Helper function from: http://stackoverflow.com/a/7557433/274826
    // const isElementInViewport = el => {
    //     const pixFromElementTop = 1;
    //     // special bonus for those using jQuery
    //     if (typeof jQuery === "function" && el instanceof jQuery) {
    //         el = el[0];
    //     }
    //     let rect = el.getBoundingClientRect();
    //     return (
    //         (rect.top + pixFromElementTop <= 0 && rect.bottom >= 0) ||
    //         (rect.bottom + pixFromElementTop >=
    //             (window.innerHeight || document.documentElement.clientHeight) &&
    //             rect.top + pixFromElementTop <=
    //             (window.innerHeight || document.documentElement.clientHeight)) ||
    //         (rect.top + pixFromElementTop >= 0 &&
    //             rect.bottom + pixFromElementTop <=
    //             (window.innerHeight || document.documentElement.clientHeight))
    //     );
    // };
    // // Detect request animation frame
    // let scroll =
    //     window.requestAnimationFrame ||
    //     // IE Fallback
    //     function (callback) {
    //         window.setTimeout(callback, 1000 / 60);
    //     };
    // let elementsToShow = document.querySelectorAll(".show-on-scroll");

    // const loop = () => {
    //     Array.prototype.forEach.call(elementsToShow, function (element) {
    //         if (isElementInViewport(element)) {
    //             element.classList.add("is-visible");
    //         } else {
    //             element.classList.remove("is-visible");
    //         }
    //     });
    //     scroll(loop);
    // };

    // // Call the loop for the first time
    // loop();

    // -----END IS ON SCREEN-----

    // -----START URL PARAMS-----
    //get url params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const locationNum = urlParams.get("locationNum");
    const site = urlParams.get("site");
    const from = urlParams.get("from");
    let inputLocation = document.getElementsByClassName("systemfield12");
    let inputSite = document.getElementsByClassName("systemfield52");
    let inputFrom = document.getElementsByClassName("originatingleadcode");

    let locationArray = [...inputLocation];
    let siteArray = [...inputSite];
    let fromArray = [...inputFrom];
    locationArray.map(item => (item.value = locationNum));
    siteArray.map(item => (item.value = site));
    fromArray.map(item => (item.value = from));
    // -----END URL PARAMS-----
    // -----START EMAIL VALIDATION-----
    const isNumberKey = (evt) => {
        let charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    let phoneNumberInput = document.getElementById("phone");
    phoneNumberInput.onkeypress = isNumberKey

    // const validateEmail = (email) => {
    //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    const validateId = (id) => {
        // with the help of https://github.com/atlanteh/israeli-id-validator
        let strId = String(id).trim();
        if (strId.length > 9 || strId < 4) {
            return false;
        }
        if (strId.length < 9) {
            while (strId.length < 9) strId = "0" + strId;
        }
        let counter = 0, rawVal, actualVal;
        for (let i = 0; i < strId.length; i++) {
            rawVal = Number(strId[i]) * ((i % 2) + 1);
            actualVal = rawVal > 9 ? (rawVal - 9) : rawVal;
            counter += actualVal;
        }
        return (counter % 10 === 0);
    }

    const validatePhone = (phone) => {
        // const re = /^[0-9]{10}$/;
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        return re.test(String(phone));
    }

    const validateForm = () => {
        let flag = false, Fname = document.getElementById("Fname"), Sname = document.getElementById("Sname")
        id = document.getElementById("id"),
            phone = document.getElementById("phone"), time = document.getElementById("time"),
            city = document.getElementById("city"), message = document.getElementById("message");
        Fname.classList.remove("error");
        Sname.classList.remove("error");
        id.classList.remove("error");
        phone.classList.remove("error");
        time.classList.remove("error");
        city.classList.remove("error");
        message.classList.remove("error");
        if (Fname.value.length < 2) {
            Fname.classList.add("error");
            flag = true;
        }
        if (Sname.value.length < 2) {
            Sname.classList.add("error");
            flag = true;
        }

        if (!validateId(id.value)) {
            id.classList.add("error");
            flag = true;
        }
        if (validatePhone(phone.value) === false) {
            phone.classList.add("error");
            flag = true;
        }
        if (time.value === "") {
            time.classList.add("error");
            flag = true;
        }
        if (city.value === "") {
            city.classList.add("error");
            flag = true;
        }
        if (flag) {
            message.innerHTML = "Veuillez remplir tous les champs obligatoires";
            message.classList.add("error");
        }
        return flag ? false : true;
    }
    const submitForm = (e) => {
        e.preventDefault();
        if (validateForm()) {
            var data = $(this).serialize();
            if (validateForm()) {
                $.ajax({
                    type: "POST",
                    url: './mail.php',
                    data: data,
                    success: function (mail) {
                        alert('הפרטים נשלחו בהצלחה');
                        // window.location.href = 'thankyou.html';
                    }
                });
            }

            return true
        } else {
            return false
        }
    }
    document.getElementById("form").addEventListener("submit", submitForm);
    // -----END EMAIL VALIDATION-----
});