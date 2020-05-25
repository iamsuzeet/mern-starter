import React from 'react';

const Error404 = ({
  msg = 'Uh oh! Something went wrong',
  errmsg = 'Cannot find this page',
}) => {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">{msg}</h2>
          <h2 className="error__emoji">
            <span role="img" aria-labelledby="worried">
              😢
            </span>{' '}
            <span role="img" aria-labelledby="shocked">
              🤯
            </span>
          </h2>
        </div>
        <div className="error__msg">{errmsg}</div>
      </div>
    </main>
  );
};

export default Error404;
