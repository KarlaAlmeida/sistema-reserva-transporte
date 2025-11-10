

const Button = ({ onClick, type = 'button', children }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;