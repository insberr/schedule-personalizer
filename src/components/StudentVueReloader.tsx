import { getTime, milliseconds } from "date-fns";
import { PureComponent } from 'react'
type ReloaderState = {
    last: number
}

type ReloaderProps = {
    reload: () => void
}


const updateEvery = milliseconds({hours:1})
class StudentVueReloader extends PureComponent<ReloaderProps, ReloaderState> {
    time?: NodeJS.Timer;
    constructor(props: ReloaderProps) {
        super(props)
        let last = localStorage.getItem("last-reload")
        if (!last) {
            last = "0"
        }
        this.state = {
            last: parseInt(last)
        }
    }
    componentDidMount() {
        this.time = setInterval(() => {
            if ((getTime(new Date()) - this.state.last) < updateEvery) {
                return
            }
            console.log("reload")
            this.props.reload()
            this.setState({
                last: getTime(new Date())
            },() => {
                localStorage.setItem("last-reload", this.state.last.toString())
            })
        }, 1000)
    }
    componentWillUnmount() {
        if (this.time) clearInterval(this.time)
    }
    render() {
        return <></>
    }
}
export default StudentVueReloader
