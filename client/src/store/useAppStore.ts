import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import { authSlice, AuthSliceType } from './slices/authSlice'
import { actionsStateSlice, ActionsStateSliceType } from './slices/actionsStateSlice'



export const useAppStore = create<AuthSliceType & ActionsStateSliceType>()(devtools((...a)=> ({
    ...authSlice(...a),
    ...actionsStateSlice(...a),
})))