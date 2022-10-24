import eruda from "./eruda";
import App from "./App";
import { identifyCommit } from "./lib/lib";
import { Err } from "./components/ErrBoundery";
import * as Sentry from "@sentry/react";
import { store, persistor, resetStorage } from "./storage/store";
import "./router/events";
import { PersistGate } from "redux-persist/integration/react";
import LoadSpinner from "./components/LoadSpinner";
import { Provider } from "react-redux";
import { BrowserTracing } from "@sentry/tracing";
import SentryRRWeb from "@sentry/rrweb";
import { Button } from "react-bootstrap";
import { Root } from "react-dom/client";
import { update } from "./updatey";

const tracesSampleRate = process.env.NODE_ENV == "production" ? 0.2 : 1.0;

function startLoad() {
    if (navigator.serviceWorker) {
        if (
            process.env.NODE_ENV == "production" ||
            new URLSearchParams(window.location.search).get("sw") == "yup"
        ) {
            navigator.serviceWorker.register(
                new URL("./sw.ts", import.meta.url),
                { type: "module" }
            );
        }
    }

    Sentry.init({
        dsn: "https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608",

        integrations: [
            new BrowserTracing({
                tracingOrigins: [
                    "localhost",
                    "schedule.insberr.com",
                    "insberr.github.io",
                    "schedule.insberr.live",
                ],
            }),
            new SentryRRWeb({}),
        ],
        normalizeDepth: 10,
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate,
        environment: process.env.NODE_ENV,
        release: identifyCommit() || "dev",
    });

    const app = document.getElementById("app");
    if (!app) {
        console.error("What the fuck? theres no app element? wtf?");
        throw new Error("God is dead and we have killed him");
    }

    console.log("Schedule personalizer v2 (" + identifyCommit() + ")");
    import("react-dom/client").then(({ createRoot }) => {
        const root = createRoot(app);
        const Withsentry =
            process.env.NODE_ENV == "production"
                ? Sentry.withErrorBoundary(App, {
                      showDialog: true,
                      fallback: (
                          <h3 className="text-center full-center">
                              {" "}
                              Something went wrong, Please try again later.{" "}
                              <br /> If you are a developer, check the console
                              for more details <br />
                              <Button
                                  onClick={() => {
                                      Sentry.showReportDialog({
                                          title: "Submit User Feedback.",
                                          subtitle:
                                              "This feedback will be sent to the developers or managers of this instance of Schedule Personalizer.",
                                          subtitle2: "",
                                          labelComments: "What happened?",
                                          labelSubmit: "Submit",
                                          eventID: Sentry.captureEvent({
                                              message:
                                                  "btn-user-input-page-err",
                                          }),
                                      });
                                  }}
                              >
                                  Send Feedback
                              </Button>
                              <br />
                              <Button
                                  onClick={() => {
                                      resetStorage();
                                      location.reload();
                                  }}
                              >
                                  Reset
                              </Button>
                          </h3>
                      ),
                  })
                : App;
        import("react").then((React) => {
            const loadingthing = document.getElementById("loading");
            if (loadingthing) loadingthing.remove();
            window.rroot = root;
            root.render(
                <Err>
                    <React.StrictMode>
                        <Provider store={store}>
                            <PersistGate
                                loading={<LoadSpinner />}
                                persistor={persistor}
                            >
                                <Withsentry />
                            </PersistGate>
                        </Provider>
                    </React.StrictMode>
                </Err>
            );
        });
    });
}

if (process.env.NODE_ENV == "production") {
    startLoad();
} else {
    eruda(startLoad);
}

declare global {
    interface Window {
        rroot: Root | undefined;
        fupdate: () => void;
    }
}

window.fupdate = update;
