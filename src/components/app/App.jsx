import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import PostsList from '../posts-list/PostsList.jsx';

import { StatusCodes, POSTS_ENDPOINT, USERS_ENDPOINT } from '../../const.js';

const theme = {
  mainPostColor: 'rgba(207, 203, 245, 0.25)',
  postBlue: '#5563b5',
  postGray: '#bab6b6',
  fontSans: 'system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
};

const GlobalStyle = createGlobalStyle`
  * {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-kerning: auto;
    box-sizing: border-box;
    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  :root {
    font-size: 10px;
  }

  body {
    font-family: ${props => props.theme.fontSans};
    font-size: 1.4rem;
    line-height: 1.5;
    color: ${props => props.theme.colorDark};
    margin: 0;
    padding: 0;
  }

  h1,
  h3,
  p {
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .container {
    max-width: 90rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    @media (min-width: 768px) {
      padding-left: 4rem;
      padding-right: 4rem;
    }
  }
`;

const NewError = styled.p`
  color: red;
  font-size: 2rem;
`;
const checkStatus = (response) => {
  if (response.status >= StatusCodes.SUCCESS && response.status < StatusCodes.REDIRECTION) {
    return response;
  } else {
    throw new Error(response.status);
  }
};

const fetchData = (endpoint) => {
  return fetch(endpoint)
    .then(checkStatus)
    .then((res) => res.json())
};

const getFormattedPosts = async () => {
  const posts = await fetchData(POSTS_ENDPOINT);
  const userIds = posts.map((post) => post.userId);
  const uniqueUserIds = [...new Set(userIds)];
  const users = await Promise.all(uniqueUserIds.map((userId) => fetchData(`${USERS_ENDPOINT}/${userId}`)));
  const formattedPosts = posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);
    const { name, username } = user;
    return {
      ...post,
      author: {
        name,
        username
      }
    };
  });
  return formattedPosts;
}

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getFormattedPosts()
      .then((posts) => setPosts(posts))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="container">
        <h1>List of posts</h1>

        {
          error
          ?
          <NewError>Не удалось загрузить данные</NewError>
          :
          <PostsList
            posts={posts}
            loading={loading}
          />
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
