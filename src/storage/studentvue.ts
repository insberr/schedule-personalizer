import { persist } from './persistSignal';

const initialCredentialsState = {
    username: '',
    password: '',
};

export const studentVueCredentials = persist('studentvue', initialCredentialsState);

export const isStudentVue = persist('isSTV', false);
