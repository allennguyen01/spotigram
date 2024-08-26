import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

const TextCollapse = ({ text }) => {
	const [clamped, setClamped] = useState(true);
	const [showButton, setShowButton] = useState(false);
	const containerRef = useRef(null);
	const handleClick = () => setClamped(!clamped);

	useEffect(() => {
		const hasClamping = (el) => {
			const { clientHeight, scrollHeight } = el;
			return clientHeight !== scrollHeight;
		};

		const checkButtonAvailability = () => {
			if (containerRef.current) {
				// Save current state to reapply later if necessary.
				const hadClampClass = containerRef.current.classList.contains('clamp');

				// Make sure that CSS clamping is applied if applicable.
				if (!hadClampClass) containerRef.current.classList.add('clamp');

				// Check for clamping and show or hide button accordingly.
				setShowButton(hasClamping(containerRef.current));

				// Sync clamping with local state.
				if (!hadClampClass) containerRef.current.classList.remove('clamp');
			}
		};

		const debouncedCheck = lodash.debounce(checkButtonAvailability, 50);

		checkButtonAvailability();
		window.addEventListener('resize', debouncedCheck);

		return () => {
			window.removeEventListener('resize', debouncedCheck);
		};
	}, [containerRef]);

	return (
		<div className='text-sm font-light'>
			<p
				ref={containerRef}
				className={`${clamped ? 'clamped' : ''}`}
			>
				{text}
			</p>

			{showButton && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						handleClick();
					}}
					className='font-normal text-neutral-300 hover:text-blue-500'
				>
					{clamped ? '...more' : '✕'}
				</button>
			)}
		</div>
	);
};

TextCollapse.propTypes = {
	text: PropTypes.string,
};

export default TextCollapse;
