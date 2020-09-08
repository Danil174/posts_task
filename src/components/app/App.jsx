import React, {useState, useEffect} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import PostsList from '../posts-list/PostsList.jsx';

const theme = {
  mainPostColor: 'rgba(207, 203, 245, 0.25)',
  postBlue: '#5563b5',
  postGray: '#bab6b6',
  fontSans:
    'system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
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

  ::-moz-selection {
    background-color: ${props => props.theme.colorDark};
    color: white;
  }

  ::selection {
    background-color: ${props => props.theme.colorDark};
    color: white;
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
    max-width: 128rem;
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

const getPostUser = (post) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then(checkStatus)
      .then((res) => res.json())
      .then((data) => {
          return {...post, name: data.name, username: data.username}
      });
}

const checkStatus = (response) => {
  if (response.status >= StatusCodes.SUCCESS && response.status < StatusCodes.REDIRECTION) {
    return response;
  } else {
    throw new Error(response.status);
  }
};

export const StatusCodes = {
  SUCCESS: 200,
  REDIRECTION: 300
};

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/posts')
          .then(checkStatus)
          .then((res) => res.json())
          .then((posts) => {
              return posts.map((post) => getPostUser(post));
          })
          .then((data) => Promise.all(data))
          .then((data) => {
              setPosts(data)
              setLoading(false)
          })
          .catch((err) => {
            setError(err);
            setLoading(false)
          });
      console.log(`fetch`);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="container">
        <h1>List of posts</h1>

        {error ? 
          <NewError>Не удалось загрузить данные</NewError>
          :
          <PostsList posts={posts} loading={loading} />
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
