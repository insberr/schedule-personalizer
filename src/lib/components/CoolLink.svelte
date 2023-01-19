<script>
    import { page } from '$app/stores';
    export let href = '';
    $: url = $page.url;
</script>

<a {href} class:text-secondary={url.pathname == href}><slot /></a>
