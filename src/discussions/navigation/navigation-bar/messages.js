import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  posts: {
    id: 'discussions.navigation.navigationBar.posts',
    defaultMessage: 'Posts',
    description: 'Primary navbar mode: all discussion posts',
  },
  allPosts: {
    id: 'discussions.navigation.navigationBar.allPosts',
    defaultMessage: 'All posts',
    description: 'Option in navbar to show all posts (legacy id kept for translations)',
  },
  allTopics: {
    id: 'discussions.navigation.navigationBar.allTopics',
    defaultMessage: 'Topics',
    description: 'Option in navbar to show all topics',
  },
  myPosts: {
    id: 'discussions.navigation.navigationBar.myPosts',
    defaultMessage: 'My posts',
    description: 'Option in navbar to show a user\'s posts',
  },
  myPostsChip: {
    id: 'discussions.navigation.navigationBar.myPostsChip',
    defaultMessage: 'Mine',
    description: 'Toggle chip to filter the posts list to the current user',
  },
  learners: {
    id: 'discussions.navigation.navigationBar.learners',
    defaultMessage: 'Learners',
    description: 'Option in navbar to show learners (course team only)',
  },
});

export default messages;
