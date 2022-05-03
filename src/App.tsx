import Schedule from "./components/Schedule";
import { testData } from "./testData"; // prob should only import this when in development, to strip it out of production
function App() {
    return <Schedule sch={ testData } /> // it just works
}
export default App;