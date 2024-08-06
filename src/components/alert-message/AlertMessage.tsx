type AlertMessageProps = {
    header?: string;
    message?: string;
};

export default function AlertMessage({ header, message }: AlertMessageProps) {
    return (
        <div className='pt-15'>
            {header && (<h1 className="text text_type_main-large mb-3">{header}</h1>)}
            {message && (<div className="text text_type_main-default mb-2">{message}</div>)}
        </div>
    )
};
