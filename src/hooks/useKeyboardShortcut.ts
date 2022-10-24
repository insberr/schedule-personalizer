import { useEffect } from 'react';
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
function useKeyboardShortcut(shortcut: string, func: () => void) {
    const s = useKeyboardJs(shortcut);
    useEffect(() => {
        if (s[0]) {
            func();
        }
    }, [s, func]);
}
export default useKeyboardShortcut;
