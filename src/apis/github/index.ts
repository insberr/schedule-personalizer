//import { Endpoints } from "@octokit/types";
//type latestCommitEndpoint = Endpoints["GET /repos/{owner}/{repo}/commits"]

import { Octokit } from "octokit";
import useSWR from "swr";
import { identifyCommit } from "../../lib/lib";
const o = new Octokit();
async function loadOctokit() {
    return o;
}

export async function latestCommit(): Promise<string> {
    const octo = await loadOctokit();
    const commits = await octo.request("GET /repos/{owner}/{repo}/commits", {
        owner: "insberr",
        repo: "schedule-personalizer",
        sha: "master",
    });
    return commits.data[0].sha;
}

export async function cloudflarePagesBuilt() {
    const octo = await loadOctokit();
    const out = await octo.request(
        "GET /repos/{owner}/{repo}/commits/{ref}/check-runs",
        {
            owner: "insberr",
            repo: "schedule-personalizer",
            ref: "master",
        }
    );
    const dt = out.data.check_runs.find(
        (check) => check.app?.slug == "cloudflare-pages"
    );
    if (dt == undefined) {
        return "not found";
    } else {
        return dt.status == "completed"
            ? dt.conclusion || dt.status
            : dt.status;
    }
}

export async function shouldUpdate() {
    const commit = identifyCommit();
    if (commit == undefined) {
        return false;
    }
    const latest = await latestCommit();
    if (commit != latest) {
        return (await cloudflarePagesBuilt()) == "success";
    }
    return false;
}

export function useUpdateStatus() {
    const dt = useSWR("update", shouldUpdate, { refreshInterval: 60*1000 }); // 60 seconds bc github api is rate limited to 60 per hour
    if (dt.error) {
        return false;
    }
    if (dt.data == undefined) {
        return false;
    }
    return dt.data.valueOf();
}
