import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginate from '../../functional/blogPage/paginate';
import populatePosts from './populatePosts';

const SubForumDisplay = ({
  forum, subforum, handleIcon, handlePostSelect, postsPerPage,
}) => {
  const [forumTitle, setForumTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [showForum, setShowForum] = useState(true);

  const handleShowForum = () => {
    setShowForum(!showForum);
  };

  useEffect(() => {
    setPosts(subforum.posts);
    setForumTitle(subforum.subforum);
  }, [subforum]);

  return (
    <div className="forum-section ml-1">
      <div className="header-title">
        <Link to={`/${forum}/${forumTitle}`} className="text-black">
          <h4 className="text-camel">{forumTitle}</h4>
        </Link>
        <button type="button" onClick={() => handleShowForum(showForum)}>
          {handleIcon(showForum)}
        </button>
      </div>
      {showForum && (
        <div>
          <Link to={`/${forum}/${forumTitle}/posts/new`} className="new-post-btn">New Topic</Link>
          <div className="post-section">
            <Paginate
              posts={posts}
              handlePostSelect={handlePostSelect}
              populatePosts={populatePosts}
              postsPages={postsPerPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

SubForumDisplay.defaultProps = {
  postsPerPage: 5,
};

SubForumDisplay.propTypes = {
  forum: propTypes.string.isRequired,
  subforum: propTypes.instanceOf(Object).isRequired,
  handleIcon: propTypes.func.isRequired,
  handlePostSelect: propTypes.func.isRequired,
  postsPerPage: propTypes.number,
};

export default SubForumDisplay;