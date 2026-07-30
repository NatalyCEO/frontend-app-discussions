import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation } from 'react-router';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Button, Icon, IconButton,
} from '@edx/paragon';
import { Close } from '@edx/paragon/icons';

import Search from '../../../components/Search';
import { RequestStatus, Routes } from '../../../data/constants';
import { DiscussionContext } from '../../common/context';
import { selectBlackoutDate, selectconfigLoadingStatus } from '../../data/selectors';
import navMessages from '../../navigation/navigation-bar/messages';
import { discussionsPath, inBlackoutDateRange, postMessageToParent } from '../../utils';
import { showPostEditor } from '../data';
import messages from './messages';

import './actionBar.scss';

function PostActionsBar({
  intl,
  inContext,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { courseId } = useContext(DiscussionContext);
  const loadingStatus = useSelector(selectconfigLoadingStatus);
  const blackoutDateRange = useSelector(selectBlackoutDate);

  const onMyPosts = Boolean(matchPath(location.pathname, { path: Routes.POSTS.MY_POSTS }));
  const onPosts = Boolean(matchPath(location.pathname, {
    path: [Routes.POSTS.ALL_POSTS, Routes.POSTS.MY_POSTS, Routes.POSTS.PATH],
  }));
  const canAddPost = !inBlackoutDateRange(blackoutDateRange)
    && loadingStatus === RequestStatus.SUCCESSFUL;

  const handleCloseInContext = () => {
    postMessageToParent('learning.events.sidebar.close');
  };

  const toggleMyPosts = () => {
    if (!courseId) {
      return;
    }
    const target = onMyPosts ? Routes.POSTS.ALL_POSTS : Routes.POSTS.MY_POSTS;
    history.push(discussionsPath(target, { courseId })(location));
  };

  const openEditor = () => dispatch(showPostEditor());

  return (
    <div className={classNames('leti-post-actions d-flex align-items-center justify-content-end flex-grow-1', { 'py-1': !inContext })}>
      {!inContext && onPosts && (
        <button
          type="button"
          className={classNames('leti-my-chip', { 'leti-my-chip--active': onMyPosts })}
          onClick={toggleMyPosts}
          aria-pressed={onMyPosts}
        >
          {intl.formatMessage(navMessages.myPostsChip)}
        </button>
      )}
      {!inContext && (
        <div className="leti-search-wrap">
          <Search />
        </div>
      )}
      {inContext && (
        <h4 className="d-flex flex-grow-1 font-weight-bold my-0 py-0 align-self-center">
          {intl.formatMessage(messages.title)}
        </h4>
      )}
      {canAddPost && (
        <>
          {!inContext && <div className="border-right border-light-400 mx-2 d-none d-md-block" />}
          <Button
            variant={inContext ? 'plain' : 'primary'}
            className={classNames('leti-add-post-btn my-0', {
              'p-0': inContext,
            })}
            onClick={openEditor}
            size={inContext ? 'md' : 'sm'}
          >
            {intl.formatMessage(messages.addAPost)}
          </Button>
        </>
      )}
      {inContext && (
        <>
          <div className="border-right border-light-300 mr-2 ml-3.5 my-2" />
          <IconButton
            src={Close}
            iconAs={Icon}
            onClick={handleCloseInContext}
            alt={intl.formatMessage(messages.close)}
          />
        </>
      )}
    </div>
  );
}

PostActionsBar.propTypes = {
  intl: intlShape.isRequired,
  inContext: PropTypes.bool.isRequired,
};

export default injectIntl(PostActionsBar);
