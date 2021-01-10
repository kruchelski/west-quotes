export function signIn() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				token: 'tokenzinho',
				user: {
					name: 'Teste',
					email: 'teste@teste.com'
				}
			})
		}, 2000)
	})
}