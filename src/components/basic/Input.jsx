import React from 'react';
import cx from 'classnames';
import '../../assets/scss/components/Input.scss';

const Input = ({
    onChange,
    value,
    hidden,
    placeholder,
    type = "text",
    area = false,
    ...rest
}) => {

    const handleChange = e => {
        onChange && onChange(e.nativeEvent.target.value);
    };

    return (
        <label className='inputWrapper'>
            {area ?
                <textarea
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    type={type}
                    {...rest}
                    className={cx('input', { "is-hidden": hidden })} />
                :
                <input
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    type={type}
                    {...rest}
                    className={cx('input', { "is-hidden": hidden })}
                />}
        </label>
    );
};

export default Input;
