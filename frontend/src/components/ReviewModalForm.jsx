import { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewRatingStars from './ReviewRatingStars';
import supabase from '../config/supabaseClient';

export default function ReviewModalForm({ albumName }) {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const { data, error } = await supabase
			.from('reviews')
			.insert([{ album_name: albumName, rating, review }])
			.select();

		if (error) {
			console.error('Error inserting review:', error);
		}

		if (data) {
			console.log('Review inserted:', data);
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
				>
					<ReviewTextBox setReview={setReview} />
					<ReviewRatingStars
						albumName={albumName}
						setRating={setRating}
					/>

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
	albumName: PropTypes.string,
};

ReviewTextBox.propTypes = {
	setReview: PropTypes.func,
};
