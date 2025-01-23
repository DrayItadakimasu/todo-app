import { ref, onMounted } from 'vue';
import type {Theme} from "../types";


export function useTheme() {
    const THEME_CACHE_KEY = 'APP_THEME'
    const theme = ref<Theme>('light')

    const setTheme = (value: Theme) => {
        theme.value = value;
        saveTheme(value);
        document.querySelector('html')!.className = value;
    }
    const saveTheme = (value: Theme) => {
        localStorage.setItem(THEME_CACHE_KEY, value);
    }
    const applySelectedTheme = () => {
        const cachedTheme = localStorage.getItem(THEME_CACHE_KEY);
        if(cachedTheme) {
            setTheme(cachedTheme as Theme);
        }
    }

    onMounted(applySelectedTheme);

    return {
        theme,
        setTheme
    }
}