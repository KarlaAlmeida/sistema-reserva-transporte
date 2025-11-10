import { useState } from 'react';

const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialState);
    };

    return {
        formData,
        handleChange,
        resetForm,
        setFormData,
    };
};

export default useForm;