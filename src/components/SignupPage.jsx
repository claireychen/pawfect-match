import { useState } from 'react';

function SignupPage() {
	const [signupName, setSignupName] = useState('');
	const [signupEmail, setSignupEmail] = useState('');

	async function signupResult(signupData) {
		try {
			const loginResponse = await fetch(`https://frontend-take-home-service.fetch.com/auth/login`, {  // ?name=${name}&email=${email}
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(signupData),
				credentials: "include", 
			})

			window.location.href = "/search";

			if (!loginResponse.ok) {
				throw new Error('Failed to sign up')
			}
		} catch (error) {
			console.error('Error sending message:', error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		signupResult({ name: signupName, email: signupEmail });
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-40 text-center text-5xl/15 font-bold tracking-tight">🐾</h2>
				<h1 className="mt-13 text-center text-3xl/15 font-bold tracking-tight text-gray-800"> Welcome to Pawfect Match</h1>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
					<div>
						<label htmlFor="name" className="block text-sm/8 font-medium text-gray-900">Name</label>
						<div className="mt-2">
							<input 
								type="name" name="name" id="name" autoComplete="name" required value={signupName} onChange={(e) => setSignupName(e.target.value)}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
								outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
						</div>
					</div>

					<div>
						<label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
						<div className="mt-2">
							<input type="email" name="email" id="email" autoComplete="email" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
							outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
						</div>
					</div>

					<div>
						<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignupPage;