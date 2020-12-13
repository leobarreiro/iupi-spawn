exports.keycloakFeatures = [
	{
		type	: 'rawlist', 
		name	: 'keycloak', 
		default : 'no', 
		message : 'Do you want to integrate with Keycloak? (+)', 
		choices : ['no', 'yes']
	}, 
	{
		type: 'input',
		name: 'kcRealm', 
		when: (answers) => answers.keycloak === 'yes', 
		message: '  (Keycloak) - Type the Realm to the keycloak integration: ',
		validate: function (kcRealm) {
			var pattern = /^[a-zA-Z]{3,}$/g;
			var validKcRealm = pattern.exec(kcRealm);
			if (!validKcRealm) {
				console.log('\n "   ERROR: The keycloak Realm must have a string format (only letters)');
			}
			return (validKcRealm != null);
		}
	},
	{
		type: 'input',
		name: 'kcUrl', 
		when: (answers) => answers.keycloak === 'yes', 
		message: '  (Keycloak) - Enter the keycloak URL you want to connect to: ',
		validate: function (kcUrl) {
			var pattern = /^(http:\/\/|https:\/\/){1}((([a-z0-9]{2,})([a-zA-Z0-9\.\-]{1,})([\.]{1,})([a-z0-9]{2,3}))|([0-9\.]{1,}))([\:0-9]{0,})(\/{0,})([a-z0-9]{0,})$/g;
			var validKcUrl = pattern.exec(kcUrl);
			if (!validKcUrl) {
				console.log('\n "   ERROR: The keycloak URL must be a valid URL');
			}
			return (validKcUrl != null);
		}
	},
	{
		type: 'input',
		name: 'kcClientId', 
		when: (answers) => answers.keycloak === 'yes', 
		message: '  (Keycloak) - Please inform the client-id: ',
		validate: function (kcClientId) {
			var pattern = /^[a-zA-Z0-9\-]{3,}[a-z]{1,}$/g;
			var validKcClientId = pattern.exec(kcClientId);
			if (!validKcClientId) {
				console.log('\n "   ERROR: The keycloak client-id is not valid');
			}
			return (validKcClientId) != null;
		}
	},
	{
		type: 'input',
		name: 'kcClientSecret', 
		when: (answers) => answers.keycloak === 'yes', 
		message: '  (Keycloak) - Please inform the client-secret: ', 
		validate: function (kcClientSecret) {
			var pattern = /^([a-z0-9]{3,})([\-]{1})([([a-z0-9\-]{1,})([\-]{1})([a-z0-9]{1,})$/g;
			var validKcClientSecret = pattern.exec(kcClientSecret);
			if (!validKcClientSecret) {
				console.log('\n "   ERROR: The keycloak client-secret is not valid');
			}
			return (validKcClientSecret) != null;
		}
	}
];

