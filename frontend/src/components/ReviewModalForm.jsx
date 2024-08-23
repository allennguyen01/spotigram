import { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewRatingStars from './ReviewRatingStars';
import supabase from '../config/supabaseClient';

export default function ReviewModalForm({
	albumID,
	albumName,
	albumCoverURL,
	albumYear,
}) {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const [formError, setFormError] = useState('');
	const [formSuccess, setFormSuccess] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		if (!albumID || !albumName || !albumCoverURL || !albumYear || !rating) {
			setFormError(
				`${!albumID ? 'albumID' : ''}
				${!albumName ? 'albumName' : ''}
				${!albumCoverURL ? 'albumCoverURL' : ''}
				${!albumYear ? 'albumYear' : ''}
				${!rating ? 'rating' : ''}
				 does not exist, please try again.`
			);
			return;
		}

		const { data, error } = await supabase
			.from('reviews')
			.insert([
				{
					id: albumID,
					album_name: albumName,
					album_cover_url: albumCoverURL,
					year: albumYear,
					rating,
					review,
				},
			])
			.select();

		if (error) {
			console.error('Error inserting review:', error);

			if (error.code === '23505') {
				setFormError('Review already exists.');
			} else {
				setFormError('Error inserting review. Please try again.');
			}

			setFormSuccess(null);
		}

		if (data) {
			console.log('Review inserted:', data);

			setFormSuccess('Review saved successfully!');
			setFormError(null);
		}
	}

	return (
		<dialog
			id={`review-modal-${albumName}`}
			className='modal'
		>
			<div className='modal-box'>
				<form method='dialog'>
					{/* if there is a button in form, it will close the modal */}
					<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
						✕
					</button>
				</form>
				<h3 className='font-bold text-xl'>{albumName}</h3>

				<form
					method='dialog'
					onSubmit={handleSubmit}
					className='flex flex-col gap-2'
				>
					<ReviewTextBox setReview={setReview} />
					<ReviewRatingStars
						albumName={albumName}
						setRating={setRating}
					/>

					{formError && <p className='text-red-500'>{formError}</p>}
					{formSuccess && <p className='text-green-500'>{formSuccess}</p>}

					<button
						className='btn mt-4'
						type='submit'
					>
						Save
					</button>
				</form>
			</div>
		</dialog>
	);
}

function ReviewTextBox({ setReview }) {
	return (
		<label className='form-control'>
			<div className='label py-2 px-0'>
				<span className='label-text text-base'>Review</span>
			</div>
			<textarea
				className='textarea textarea-bordered h-24'
				placeholder='Leave a review...'
				onChange={(e) => {
					setReview(e.target.value);
				}}
			></textarea>
		</label>
	);
}

ReviewModalForm.propTypes = {
	albumID: PropTypes.string,
	albumName: PropTypes.string,
	albumCoverURL: PropTypes.string,
	albumYear: PropTypes.number,
};

ReviewTextBox.propTypes = {
	setReview: PropTypes.func,
};
