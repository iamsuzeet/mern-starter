import React from 'react';
import PropTypes from 'prop-types';

const SideNavItem = ({ link, text, icon, active }) => {
  return (
    <li className={active ? 'side-nav--active' : undefined}>
      <a href={link}>
        <svg>
          <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
        </svg>
        {text}
      </a>
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
