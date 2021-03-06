import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const Paginate = ({
  posts, populatePosts, postsPages, handlePostSelect,
}) => {
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [selectedPosts, setPosts] = useState([]);
  const [postsPerPage] = useState(postsPages);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < maxPages) {
      setPage(page + 1);
    }
  };

  // Calculates the max amount of pages using the length of the posts and postsPages props
  useEffect(() => {
    const pageMax = Math.ceil(posts.length / postsPerPage);
    setMaxPages(pageMax || 1);
  }, [posts, postsPerPage]);

  // Filters and stores the posts prop array into pinned and unpinned posts.
  // Unpinned posts are then paginated and stored into the selectedPosts state
  useEffect(() => {
    const postsPinned = posts.filter(post => post.is_pinned);
    const unPinnedPosts = posts.filter(post => !post.is_pinned);
    const startingIndex = (page * postsPerPage) - postsPerPage;
    const endingIndex = (page * postsPerPage) - 1;
    const paginatedPosts = unPinnedPosts.filter((post, index) => {
      if (index >= startingIndex && index <= endingIndex) {
        return post;
      }
      return null;
    });
    setPinnedPosts(postsPinned);
    setPosts(paginatedPosts);
  }, [page, posts, postsPerPage]);

  return (
    <div>
      {populatePosts(pinnedPosts, handlePostSelect, true)}
      {populatePosts(selectedPosts, handlePostSelect)}
      <div className="paginate">
        <button type="button" onClick={handlePrev}>Prev</button>
        <span>
          {page}
          /
          {maxPages}
        </span>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

Paginate.defaultProps = {
  postsPages: 5,
};

Paginate.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
  populatePosts: propTypes.func.isRequired,
  handlePostSelect: propTypes.func.isRequired,
  postsPages: propTypes.number,
};

export default Paginate;
