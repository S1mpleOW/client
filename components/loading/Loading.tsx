import * as React from 'react';

interface ILoadingProps {}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
	return (
		<div className="w-10 h-10 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
	);
};

export default Loading;
