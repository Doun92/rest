Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
    extraSignupFields:[{
        fieldName: 'social_worker',
        fieldLabel: 'Êtes-vous un travailleur social?',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: true
    }],
    });

