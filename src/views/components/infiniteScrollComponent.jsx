import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function InfiniteScrollComponent({
	children,
	dataLength,
	next,
	hasMore,
	loader,
	scrollableTarget,
}) {
	return (
		<InfiniteScroll
			dataLength={dataLength}
			next={next}
			hasMore={hasMore}
			loader={
				loader ? loader : <span className="vn-loading-infinite-loader">Loading...</span>
			}
			scrollableTarget={scrollableTarget ? scrollableTarget : null}
		>
			{children}
		</InfiniteScroll>
	);
}

export default InfiniteScrollComponent;
