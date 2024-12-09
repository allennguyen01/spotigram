import PropTypes from 'prop-types';
import { useState } from 'react';
import supabase from '../config/supabaseClient';

export default function SignUpModal() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState('');
	const [formSuccess, setFormSuccess] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(
			`Email: ${email}, Username: ${username}, Password: ${password}`,
		);

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				emailRedirectTo: 'http://localhost:3000/welcome',
			},
		});

		if (error) {
			console.error('Error inserting user:', error);

			setFormError(
				`Error signing up. Please try again. Error: ${error.message}`,
			);
			setFormSuccess(null);
		}

		if (data.user) {
			console.log('User inserted:', data);

			setFormSuccess('User signed up successfully!');
			setFormError(null);
		}
	}

	return (
		<dialog
			id='sign-up-modal'
			className='modal'
		>
			<div className='modal-box rounded-sm bg-slate-700'>
				<form method='dialog'>
					<button className='btn btn-circle btn-ghost btn-lg absolute right-0 top-0 m-0 p-0 hover:bg-transparent hover:text-white'>
						✕
					</button>
				</form>

				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4'
				>
					<h3 className='text-base font-light'>JOIN JUKEBOXD</h3>

					<SignUpInput
						label='Email address'
						setValue={setEmail}
					/>
					<SignUpInput
						label='Username'
						setValue={setUsername}
					/>
					<SignUpInput
						label='Password'
						setValue={setPassword}
					/>

					{formError && <p className='text-red-500'>{formError}</p>}
					{formSuccess && <p className='text-green-500'>{formSuccess}</p>}

					<button
						type='submit'
						className='btn btn-primary btn-sm mt-4 self-start rounded-sm text-white'
					>
						SIGN UP
					</button>
				</form>
			</div>
		</dialog>
	);
}

function SignUpInput({ label, setValue }) {
	const inputWidth = {
		'Email address': 'max-w-md',
		Username: 'max-w-xs',
		Password: 'max-w-xs',
	};

	const type = {
		'Email address': 'email',
		Username: 'text',
		Password: 'password',
	};

	return (
		<div>
			<div className='label px-0 pt-0'>
				<span className='label-text text-white'>{label}</span>
			</div>
			<input
				type={type[label]}
				onChange={(e) => setValue(e.target.value)}
				required
				className={`input input-bordered input-sm w-full ${inputWidth[label]} rounded-sm bg-neutral-content text-neutral-700 focus:bg-white`}
			/>
		</div>
	);
}

SignUpInput.propTypes = {
	label: PropTypes.string,
	setValue: PropTypes.func,
};
