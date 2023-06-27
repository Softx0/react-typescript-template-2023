import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../domain';

export const UserEmptyState: User = {
    name: '',
    gender: '',
    status: '',
};

//La representacion del estado del usuario y como vamos a modifiarlo dentro de el
export const userSlice = createSlice({
    name: 'user',
    initialState: UserEmptyState,
    // Los reducers trabajan con inmutabilidad, por lo que cuando necesitemos moficiar el state
    // se reemplaza no se modifica
    reducers: {
        createUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        modifyUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetUser: () => UserEmptyState,
    },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
