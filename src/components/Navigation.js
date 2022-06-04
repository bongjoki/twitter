import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse as homeIcon } from '@fortawesome/free-solid-svg-icons';
import { faUser as userIcon } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { faBell as notiIcon } from '@fortawesome/free-solid-svg-icons';
import { colorWhite, colorGrey2 } from './Css/Colors';
import { useLocation } from 'react-router-dom';

const StyledNavigation = styled.ul`
  position: fixed;
  background-color: transparent;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  display: flex;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 20px;
  color: ${props => props.color};
`;

const ListItem = styled.li`
  width: 25%;
  border-top: 0.5px solid ${colorGrey2};
  a {
    cursor: pointer;
    padding: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Navigation = ({ user }) => {
  const { pathname } = useLocation();
  const getColorByPath = path => {
    return pathname === path ? `${colorWhite}` : `${colorGrey2}`;
  };
  return (
    <StyledNavigation>
      <ListItem>
        <Link to="/">
          <Icon icon={homeIcon} color={getColorByPath('/')} />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/search">
          <Icon icon={searchIcon} color={getColorByPath('/search')} />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/notification">
          <Icon icon={notiIcon} color={getColorByPath('/notification')} />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/profile">
          <Icon icon={userIcon} color={getColorByPath('/profile')} />
        </Link>
      </ListItem>
    </StyledNavigation>
  );
};

export default Navigation;
