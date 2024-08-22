import { useCallback, useState } from "react";

export function useForm<T extends Record<string, any>>(initialValues: T) {
    const [defaultValues, setDefaultValues] = useState<T>(initialValues);
    const [formValues, setInternalFormValues] = useState<T>(initialValues);
    const [valuesWasChanged, setValuesWasChanged] = useState(false);

    const checkIfValueChanged = (name: string, value: any) => {
        for (const key in defaultValues) {
            if (name === key) {
                if (defaultValues[key] !== value) {
                    setValuesWasChanged(true);
                    return;
                }
            }
            else {
                if (defaultValues[key] !== formValues[key]) {
                    setValuesWasChanged(true);
                    return;
                }
            }
        }
        setValuesWasChanged(false);
    }

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInternalFormValues({ ...formValues, [name]: value });
        checkIfValueChanged(name, value);
    };

    const setFormValues = useCallback((newValues: T) => {
        setDefaultValues(newValues);
        setInternalFormValues(newValues);
        setValuesWasChanged(false);
    }, []);

    return { formValues, valuesWasChanged, handleFormChange, setFormValues };
}