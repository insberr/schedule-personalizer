const scheduleURL = new URL('../../../config/bethel/bethel.scs', import.meta.url).href;

export function SchedulePage() {
    return <div> {scheduleURL} </div>;
}
