<script type="ts">
    // @todo please fucking clean this up
    import Login from '$lib/components/Login.svelte';
    import { fade } from 'svelte/transition';
    import {
        getAllSchedules,
        getStudentInfo,
        isError,
        type StudentVueAPIDataUserDate,
    } from '$lib/studentvue';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { update } from 'svelte-french-toast/core/store';
    import { goto } from '$app/navigation';
    import toast from 'svelte-french-toast';
    import {
        isStudentvue,
        studentInfo,
        studentVueCreds,
        studentVueSchedule,
    } from '$lib/store/studentvue';
    import { masterSettings, schoolName } from '$lib/store/masterSettings';
    import { tick } from 'svelte';
    const LoginStates = {
        Waiting: 0,
        LoggingIn: 1,
        LoggedIn: 2,
    };
    let username: string = '';
    let password: string = '';
    let resp: StudentVueAPIDataUserDate;
    let current = LoginStates.Waiting;
    let error = '';
    $: ms = $masterSettings;
    async function doTheLogin(
        a: CustomEvent<{ username: string; password: string }>
    ) {
        username = a.detail.username;
        password = a.detail.password;
        let { username: u, password: p } = a.detail;
        current = LoginStates.LoggingIn;
        error = '';
        try {
            resp = await getStudentInfo(u, p);
            if (
                !ms.schools.find((n) => n.stvName == resp.content.CurrentSchool)
            ) {
                throw new Error('School not supported!');
            }
            schoolName.set(resp.content.CurrentSchool);
            current = LoginStates.LoggedIn;
            studentInfo.set(resp);
            progress.set(0.25);
        } catch (e: any) {
            current = LoginStates.Waiting;
            error = e.message || 'Unknown error';
            console.error(e);
            console.error(e.stack);
        }
    }
    let progress = tweened(0, {
        duration: 400,
        easing: cubicOut,
    });
    //let prog = $progress
    $: {
        console.log($progress);
        if ($progress == 0.25) {
            getAllSchedules(username, password).then((s) => {
                studentVueSchedule.set(s);
                progress.set(0.5);
            });
        } else if ($progress == 0.5) {
            studentVueCreds.set({ username, password });
            progress.set(0.75);
        } else if ($progress == 0.75) {
            isStudentvue.set(true);
            progress.set(1);
        } else if ($progress == 1) {
            toast.success('Setup complete!');
            localStorage.setItem('setup-complete', 'true');
            goto('/');
        }
    }
</script>

<h1 class="text-center my-4">Setup</h1>
<div class="m-auto text-center w-fit">
    {#if current != LoginStates.LoggedIn}
        <span>
            <Login
                on:login={doTheLogin}
                {error}
                loggingIn={current == LoginStates.LoggingIn}
            />
            <a href="/setup/manual">Manual Setup</a>
        </span>
    {:else if current == LoginStates.LoggedIn}
        <div>
            <p>
                Welcome to Schedule-Personalizer V10 {resp.content
                    .FormattedName}!
            </p>
            <p>We're getting things ready...</p>
            <!-- https://okrad.github.io/svelte-progressbar/ maybe?-->
            <progress class="progress progress-primary" value={$progress} />
            <ul class="steps steps-vertical lg:steps-horizontal">
                <li class="step" class:step-primary={$progress >= 0.0}>
                    Obtain student info
                </li>
                <li class="step" class:step-primary={$progress >= 0.25}>
                    Obtain Schedule Information
                </li>
                <li class="step" class:step-primary={$progress >= 0.5}>
                    Save Credentials for refresh
                </li>
                <li class="step" class:step-primary={$progress >= 0.75}>
                    Finishing up
                </li>
            </ul>
            <!--<button class="btn btn-primary" on:click={() => progress.update(n => n + 0.25)}>Simulate next step</button>-->
        </div>
    {/if}
</div>
