import { useEffect, useState } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useUpdateUserInfoMutation } from '../../../services/auth';
import { useFetchUserData } from '../../../utils/hooks';
import Modal from '../../../components/modal/modal';
import ErrorMessage from '../../../components/error-message/ErrorMessage';
import styles from './user-info.module.css';

export default function UserInfoPage() {
    const { data: userInfo } = useFetchUserData();
    const [updateUserTrigger] = useUpdateUserInfoMutation();

    const [form, setFormValue] = useState({ name: '', email: '', password: '' });
    const [valuesChanged, setValuesChanged] = useState(false);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
        if (userInfo) {
            let oldValue = '';
            switch (e.target.name) {
                case 'name': oldValue = userInfo.name; break;
                case 'email': oldValue = userInfo.email; break;
            }
            setValuesChanged(oldValue !== e.target.value);
        }
    }
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (userInfo) {
            setFormValue({ name: userInfo.name, email: userInfo.email, password: '' })
        }
    }, [userInfo])


    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if ((form.name?.length !== 0) && (form.email?.length !== 0) && (form.password?.length !== 0)) {
                const updateResult = await updateUserTrigger(form).unwrap();
                if (!updateResult.success) {
                    setErrorMessage(updateResult.message ?? 'Неизвестная ошибка');
                }
            }
        }
        catch (err) {
            let message = 'Неизвестная ошибка';
            if (err && typeof err === 'object' && 'data' in err) {
                message = (err as { status: Number, data: { success: boolean; message: string; } }).data.message;
            }
            setErrorMessage(message);
        }
    }


    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo) {
            setFormValue({ name: userInfo.name, email: userInfo.email, password: '' })
            setValuesChanged(false);
        }
    }

    return (
        <form className={styles.form} onSubmit={onFormSubmit}>
            <Input type='text' name='name' placeholder='Имя' icon={'EditIcon'} value={form.name ?? ''} onChange={onChange} required extraClass='mb-6' />
            <Input type='email' name='email' placeholder='Логин' icon={'EditIcon'} value={form.email ?? ''} onChange={onChange} required extraClass='mb-6' />
            <Input type='password' name='password' placeholder='Пароль' icon={'EditIcon'} value={form.password ?? ''} onChange={onChange} required extraClass='mb-6' />
            {
                valuesChanged && (
                    <div className={styles.buttons}>
                        <Button htmlType='button' type='secondary' size='medium' onClick={handleCancel}>Отмена</Button>
                        <Button htmlType='submit' type='primary' size='medium' >Сохранить</Button>
                    </div>
                )
            }
            {errorMessage && (
                <Modal onModalClose={() => setErrorMessage(null)}>
                    <ErrorMessage errorMessage={errorMessage} />
                </Modal>
            )}
        </form>
    )
};