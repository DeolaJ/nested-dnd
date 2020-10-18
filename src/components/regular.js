/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';

const Regular = ({
  ctrl,
}) => {
  return (
    <div
      className="regular"
    >
      {ctrl.title}
    </div>
  );
};

Regular.propTypes = {
  ctrl: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    controls: PropTypes.array,
    title: PropTypes.string,
  }),
};

export default Regular;
