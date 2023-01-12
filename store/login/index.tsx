import { create } from 'zustand'

interface loginState {
    is_password: boolean;
    changeEye: () => void
}

const useStore = create<loginState>((set) => ({
    is_password: true, // password

    changeEye: () => set(state => ({
        is_password: !state.is_password
    }))
}))


export default useStore;