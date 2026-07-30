import React from 'react';

import classNames from 'classnames';
import { matchPath, useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Nav } from '@edx/paragon';

import { Routes } from '../../../data/constants';
import { useShowLearnersTab } from '../../data/hooks';
import { discussionsPath } from '../../utils';
import messages from './messages';

function NavigationBar({ intl }) {
  const { courseId } = useParams();
  const location = useLocation();
  const showLearnersTab = useShowLearnersTab();

  const onPosts = Boolean(matchPath(location.pathname, {
    path: [Routes.POSTS.ALL_POSTS, Routes.POSTS.MY_POSTS, Routes.POSTS.PATH],
  }));

  const navLinks = [
    {
      route: Routes.POSTS.ALL_POSTS,
      labelMessage: messages.posts,
      isActive: () => onPosts,
    },
    {
      route: Routes.TOPICS.ALL,
      labelMessage: messages.allTopics,
      isActive: (match, loc) => Boolean(matchPath(loc.pathname, { path: Routes.TOPICS.PATH })),
    },
  ];
  if (showLearnersTab) {
    navLinks.push({
      route: Routes.LEARNERS.PATH,
      labelMessage: messages.learners,
    });
  }

  return (
    <Nav className="leti-discussions-nav py-0 flex-nowrap overflow-auto">
      {navLinks.map(link => (
        <Nav.Item key={link.route} className="flex-shrink-0">
          <Nav.Link
            as={NavLink}
            to={discussionsPath(link.route, { courseId })}
            className={classNames('leti-discussions-nav__link')}
            isActive={link.isActive}
          >
            {intl.formatMessage(link.labelMessage)}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

NavigationBar.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NavigationBar);
