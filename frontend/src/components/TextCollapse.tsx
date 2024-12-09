import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const TextCollapse = ({ text }: { text: string }) => {
	const [clamped, setClamped] = useState(true);
	const [showButton, setShowButton] = useState(false);
	const containerRef = useRef<HTMLParagraphElement>(null);
	const handleClick = () => setClamped(!clamped);

	useEffect(() => {
		const hasClamping = (el: HTMLParagraphElement) => {
			const { clientHeight, scrollHeight } = el;
			return clientHeight !== scrollHeight;
		};

		const checkButtonAvailability = () => {
			const container = containerRef.current;

			if (container) {
				const hadClampClass = container.classList.contains('clamp');
				if (!hadClampClass) container.classList.add('clamp');
				setShowButton(hasClamping(container));
				if (!hadClampClass) container.classList.remove('clamp');
			}
		};

		const debouncedCheck = debounce(checkButtonAvailability, 50);

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
