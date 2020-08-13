import React from 'react';

function FlashMessages({ flashMessages }) {
	return (
		<div className="floating-alerts">
			{flashMessages.map((message, idx) => {
				return (
					<div key={idx} className={`alert alert-${message.class || 'success'} text-center floating-alert shadow-sm`}>
						{message.text || message}
					</div>
				);
			})}
		</div>
	);
}

export default FlashMessages;
