type TAlertMessageProps = {
    header?: string;
    message?: string;
};

export default function AlertMessage({ header, message }: TAlertMessageProps): React.JSX.Element {
    return (
        <div className='pt-15'>
            {header && (<div className="text text_type_main-large mb-3">{header}</div>)}
            {message && (<div className="text text_type_main-default mb-2">{message}</div>)}
        </div>
    )
};

