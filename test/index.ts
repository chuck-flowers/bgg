import bgg from '..';
var client = bgg({});

client('user', { name: 'monteslu', guilds: 1 })
	.then(response => {
		console.log('Success', response.entity);
	}, err => {
		console.error('Failed', err);
	});

