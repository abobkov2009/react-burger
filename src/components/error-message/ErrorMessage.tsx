type TErrorMessageProps = {
    header?: string;
    errorMessage?: string;
};

const ErrorMessage: React.FC<TErrorMessageProps> = ({ header = "Произошла ошибка", errorMessage  }) => {
    return (
        <div className='p-10'>
            {header && (<h2 className="text text_type_main-medium mb-3">{header}</h2>)}
            {errorMessage && (<div className="text text_type_main-default mt-5 ml-5">{errorMessage}</div>)}
        </div>
    )
};

export default ErrorMessage;