import { create } from 'zustand'

export const useThemeStore = create((set) => ({

    theme:localStorage.getItem('theme-gulearn')||"retro",

    setTheme:(theme)=>{
        
        localStorage.setItem('theme-gulearn',theme)
        set({theme})

    }
}))