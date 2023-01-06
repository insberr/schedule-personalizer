<script type="ts">
  import Login from "$lib/components/Login.svelte";
  import { fade } from "svelte/transition";
  import { getStudentInfo, isError, type StudentVueAPIDataUserDate } from "$lib/studentvue"
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
  import { update } from "svelte-french-toast/core/store";
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";
  const LoginStates = {
	  Waiting: 0,
	  LoggingIn: 1,
    Fadeout: 2,
	  LoggedIn: 3
  }
  let resp: StudentVueAPIDataUserDate["content"];
  let current = LoginStates.Waiting;
  let error = "";
  async function doTheLogin(a: CustomEvent<{username:string, password:string}>) {
    let { username, password } = a.detail;
    current = LoginStates.LoggingIn;
    error = ""
    try {
      resp = (await getStudentInfo(username, password)).content;
      current = LoginStates.Fadeout;
    } catch (e: any) {
      current = LoginStates.Waiting;
      error = e.message || "Unknown error";
    }
    
  }

  let progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
  $: {
    console.log($progress)
    if ($progress >= 1) {
      toast.success("Setup complete!");
      localStorage.setItem("setup-complete", "true")
      goto("/")
    }
  }
</script>
<h1 class="text-center my-4">Setup</h1>
<div class="m-auto text-center w-fit">
      {#if !(current == LoginStates.LoggedIn || current == LoginStates.Fadeout)}
        <span out:fade on:outroend={() => current=LoginStates.LoggedIn}>
          <Login on:login={doTheLogin} {error} loggingIn={current == LoginStates.LoggingIn}></Login>
        </span>
      {:else if current == LoginStates.LoggedIn}
        <div in:fade> 
          <p>Welcome to Schedule-Personalizer V10 {resp.FormattedName}! </p>
          <p>We're getting things ready...</p>
          <progress class="progress progress-primary" value={$progress}></progress>
          <ul class="steps steps-vertical lg:steps-horizontal">
            <li class="step" class:step-primary={$progress >= 0.1}>Validate Creds</li>
            <li class="step" class:step-primary={$progress >= 0.26}>Obtain Schedule Information</li>
            <li class="step" class:step-primary={$progress >= 0.51}>Load virus keylogger.jar</li>
            <li class="step" class:step-primary={$progress >= 0.76}>Loading student info</li>
          </ul>
          <button class="btn btn-primary" on:click={() => progress.update(n => n + 0.25)}>Simulate next step</button>
        </div>
      {/if}

</div>