//import Calendar from 'react-calendar';

type Props = {
    setDate: (date: Date) => void
    date: Date
}

export function DateEditor(props: Props) {

    return (<div>
        <h2> Date Editor </h2>
        
        <br />
        <div>{/*format(props.date,"MM-dd-yyyy")*/}</div>
        <div> actual editor goes here </div>
        </div>)
}