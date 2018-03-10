var pizza = (function (window) {
    var configuration = {
        size: null,
        crust: null,
        ingredients: {
            salami: false,
            prosciutto: false,
            ham: false,
            pollo: false,
            mozzarella: false,
            parmesan: false,
            gorgonzola: false,
            tomatoes: false,
            onions: false,
            olives: false,
            corn: false
        }
    };

    function toggleSize(name) {
        var sizes = window.document.querySelectorAll('.pizza-size');

        sizes.forEach(function (sizeElement) {
            sizeElement.classList.remove('selected');
        });

        var sizeToSelect = window.document.querySelector('.pizza-size[data-pizza-size="' + name + '"]');
        sizeToSelect.classList.toggle('selected');

        if (sizeToSelect.classList.contains('selected')) {
            configuration.size = name;
        }
        storeConfiguration();
    }

    function toggleCrust(name) {
        var crusts = window.document.querySelectorAll('.pizza-crust');

        crusts.forEach(function (crustElement) {
            crustElement.classList.remove('selected');
        });

        var crustToSelect = window.document.querySelector('.pizza-crust[data-pizza-crust="' + name + '"]');
        crustToSelect.classList.toggle('selected');

        if (crustToSelect.classList.contains('selected')) {
            configuration.crust = name;
        }
        storeConfiguration();
    }

    function toggleIngredient(name) {
        var ingredientToSelect = window.document.querySelector('.pizza-ingredient[data-pizza-ingredient="' + name + '"]');
        ingredientToSelect.classList.toggle('selected');
        configuration.ingredients[name] = ingredientToSelect.classList.contains('selected');
        storeConfiguration();
    }

    function reset() {
        var sizes = window.document.querySelectorAll('.pizza-size');

        sizes.forEach(function (sizeElement) {
            sizeElement.classList.remove('selected');
        });

        var crusts = window.document.querySelectorAll('.pizza-crust');

        crusts.forEach(function (crustElement) {
            crustElement.classList.remove('selected');
        });

        var ingredients = window.document.querySelectorAll('.pizza-ingredient');

        ingredients.forEach(function (ingredientElement) {
            ingredientElement.classList.remove('selected');
        });

        configuration.size = null;
        configuration.crust = null;
        for (var i in configuration.ingredients) {
            configuration.ingredients[i] = false;
        }

        localStorage.removeItem('configuration');
    }

    function isValid() {
        var ingredientsLength = 0;
        for (var i in configuration.ingredients) {
            if (configuration.ingredients[i]) {
                ingredientsLength++;
            }
        }
        return configuration.size != null && configuration.crust != null && ingredientsLength >= 3;
    };

    function storeConfiguration() {
        localStorage['configuration'] = JSON.stringify(configuration);
    }

    function loadConfigurationIfExists() {
        if (typeof localStorage['configuration'] != 'undefined') {
            configuration = JSON.parse(localStorage['configuration']);

            if (configuration.size != null) {
                toggleSize(configuration.size);
            }

            if (configuration.crust != null) {
                toggleCrust(configuration.crust);
            }

            for(var i in configuration.ingredients) {
                if (configuration.ingredients[i]) {
                    toggleIngredient(i);
                }
            }
        }
    }

    return {
        toggleSize: toggleSize,
        toggleCrust: toggleCrust,
        toggleIngredient: toggleIngredient,
        reset: reset,
        isValid: isValid,
        loadConfigurationIfExists: loadConfigurationIfExists
    }
})(window);