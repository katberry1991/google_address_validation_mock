(function () {

    'use strict';
    
    var resultOutput = $('.result');

    function init () {
        $('.submit-data').on('click', function () {
            resultOutput.html('');
            geocodeAddress();
        });
    }

    function geocodeAddress() {
        var geocoder = new google.maps.Geocoder(),
            address = $('.address-street').val() + ', ' + $('.address-post-number').val() + ', ' + $('.address-town').val() + ', ' + $('.address-post-country').val();

        geocoder.geocode({'address': address}, function(results, status) {
            var definitive = false,
                partial = false,
                suggestions = [];

            if (status === google.maps.GeocoderStatus.OK) {
                // TODO: remove this console log, it is here just for testing purposes
                console.log(results);

                // TODO: Remove appends, they are here just for testing purposes
                results.forEach(function (result) {
                    if (result.partial_match && result.address_components.length > 7) {
                        resultOutput.append('<br> Address you provided is not valid, best we found is ' + result.formatted_address);
                        suggestions.push(result);
                        partial = true;
                    } else if (result.partial_match && result.address_components.length < 7) {
                        resultOutput.append('<br> Address you provided is not valid, we can not give you suggestions, we only found ' + result.formatted_address);
                    } else {
                        resultOutput.append('<br> Address is valid: ' + result.formatted_address);
                        suggestions.push(result);
                        definitive = true;
                    }
                });

                // TODO: change this to fit your templating logic
                if (suggestions.length === 0 && definitive === false) {
                    resultOutput.append('<br><br> No suggestions to offer');
                } else if (results.length === 1 && definitive === true) {
                    resultOutput.append('<br><br> Your address is valid');
                } else {
                    resultOutput.append('<br><br> Choose one from following: <br>');
                    suggestions.forEach(function (suggestion) {
                        resultOutput.append('<br>' + suggestion.formatted_address);
                    });
                }

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    module.exports = {
        init: init,
        geocodeAddress: geocodeAddress
    };
})();
