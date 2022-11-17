import { createRoot } from 'react-dom/client';
import { MatUIThemer } from './components/MatUIThemer';
import { Button, Link, Typography } from '@mui/material';
import { store } from './storage';
import { ModeSwitcher } from './components/ModeSwitcher';
async function main() {
    const eleroot = document.getElementById('app') as HTMLDivElement;
    const root = createRoot(eleroot);
    function Inner() {
        // wrapper bc we arnt in a component at the top level.
        return store.themeMessage.value;
    }
    root.render(
        <MatUIThemer>
            <Typography variant="h1">Schedule????? Personalizer?????</Typography>
            <Typography variant="body1" component="div">
                imagine schedule personalizering. could&apos;nt be me <br />
                use <pre>window.store.theme.update(() =&gt; &quot;light&quot;)</pre> or{' '}
                <pre>window.store.theme.update(() =&gt; &quot;dark&quot;)</pre> <br />
                <br /> you could even use{' '}
                <pre>
                    {`window.store.theme.asyncUpdate(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "dark"
})
                        `}
                </pre>
                <br /> or
                <pre>
                    {`window.store.theme.asyncUpdate(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "light"
})
                        `}
                </pre>
                <br />
                these functions can be called from anywhere, and they {'"just work"'} (i think) (i hope)
                <br />
                the update() and asyncUpdate() functions use immer so you can mutate the state passed in as the first argument too! <br />
                computed theme message:{' '}
                <pre>
                    <Inner />
                </pre>{' '}
                <br />
                <ModeSwitcher />
                <br />
                <Link href="https://github.com/preactjs/signals/blob/HEAD/README.md#computedfn">
                    {' '}
                    extra cool functions with signals (import from @preact/signals-react){' '}
                </Link>{' '}
                <br />
                <Link href="https://mui.com/material-ui">mat ui docs</Link>
                <br />
            </Typography>
        </MatUIThemer>
    );
}

main();
