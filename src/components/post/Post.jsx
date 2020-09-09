import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
    position: relative;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    padding: 10px;
    background-color: ${props => props.theme.mainPostColor};
    border-radius: 13px;
    box-shadow: 1px 1px 5px -2px #9b93e9;

    .block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .user_block {
        flex-shrink: 0;
        margin-right: 15px;
    }

  .ico {
    align-self: center;
    position: relative;
    width: 70px;
    height: 70px;
    background-color: ${props => props.theme.postGray};
    border-radius: 50%;
    overflow: hidden;
  }

  .ico::after,
  .ico::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .ico::after {
    top: 14px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.theme.postBlue};
  }

  .ico::before {
    top: 41px;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 40px solid ${props => props.theme.postBlue};
  }
`;

const Post = ({ post }) => {
  const { author, title, body } = post;
  const { name, username } = author;
  return (
    <Item>
      <div className="block user_block">
        <span className="ico"></span>
        <span><strong>Name: </strong>{name}</span>
        <span><strong>UserName: </strong>{username}</span>
      </div>
      <div className="block text_block">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </Item>
  );
}

export default Post;
