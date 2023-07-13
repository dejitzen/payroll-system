import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage(() => localStorage)
export const loggedInAtom = atomWithStorage('logged-in', false, storage)
export const userAtom = atomWithStorage('user', {}, storage)