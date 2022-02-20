import React from 'react';
import cx from 'classnames';
import '../../assets/scss/components/Button.scss'

const Button = ({
    children,
    full,
    submit,
    ...rest
}) => {
    return (
        <div>
            <button className={cx('button', { "is-full": full })} onSubmit={submit} {...rest}>
                {children}
            </button>
        </div>
    );
};

export default Button;
