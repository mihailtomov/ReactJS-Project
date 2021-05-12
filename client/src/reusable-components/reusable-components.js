import { useField } from 'formik';

export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div style={{ color: 'red' }}>{meta.error}</div>
            ) : null}
        </>
    );
};

export const MyTextareaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <div style={{ color: 'red' }}>{meta.error}</div>
            ) : null}
        </>
    );
};

export const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div style={{ color: 'red' }}>{meta.error}</div>
            ) : null}
        </div>
    );
};