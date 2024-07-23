import PropTypes, { InferProps } from 'prop-types';
AlertMessage.propTypes = {
    header: PropTypes.string,
    message: PropTypes.string,
};

export default function AlertMessage({ header, message }: InferProps<typeof AlertMessage.propTypes>) {
    return (
        <section className='pt-15'>
            {header && (<h1 className="text text_type_main-large mb-3">{header}</h1>)}
            {message && (<div className="text text_type_main-default mb-2">{message}</div>)}
        </section>
    )
};