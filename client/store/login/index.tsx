import { create } from 'zustand'

interface ILoginState {
    is_password: boolean;
    changeEye: () => void
}

const useStore = create<ILoginState>((set) => ({
    is_password: true, // password

    changeEye: () => set(state => ({
        is_password: !state.is_password
    }))
}))


export default useStore;