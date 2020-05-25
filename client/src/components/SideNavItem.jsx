import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideNavItem = ({ link, text, icon, active }) => {
  return (
    <li className={active ? 'side-nav--active' : undefined}>
      <Link to={link}>
        <svg>
          <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
        </svg>
        {text}
      </Link>
    </li>
  );
};

SideNavItem.defaultProps = {
  active: false,
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
};

export default SideNavItem;
