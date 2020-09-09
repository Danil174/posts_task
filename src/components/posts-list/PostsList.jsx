import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Post from "../post/Post.jsx";
import Loading from "../loading/Loading.jsx";

const DEBOUNCE_TIME = 500;

const Input = styled.input`
    border: none;
    box-shadow: none;
    background-color: #f3f5f9;
    color: #363838;
    font-size: 14px;
    padding: 8px 19px;
    height: 38px;

    :focus {
        outline: 2px solid #5583b5;
    }
`;

const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, DEBOUNCE_TIME);

      return () => {
        clearTimeout(handler);
      };
    }, [value]);

  return debouncedValue;
}

const PostsList = ({ posts, loading }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchStr, setSearch] = useState("");

  const debouncedFilterStr = useDebounce(searchStr);

  useEffect(() => {
    if (debouncedFilterStr) {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(debouncedFilterStr.toLowerCase())
        )
      );
    } else {
      setFilteredPosts(posts);
    }

  }, [debouncedFilterStr, posts]);

  if (loading) {
    return (<Loading>Данные загружаются...</Loading>)
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="filter posts"
        onChange={(evt) => setSearch(evt.target.value)}
        value={searchStr}
      />
      <br />
      {
        filteredPosts.length === 0
          ?
          <strong>Соответствий не найдено</strong>
          :
          <ul>
            {filteredPosts.map((it) => {
              return (
                <Post
                  key={it.id}
                  post={it}
                />
              )
            })}
          </ul>
      }
    </div>
  );
}

export default PostsList;
