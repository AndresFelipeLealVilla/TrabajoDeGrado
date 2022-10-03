import { useEffect, useState} from "react";
import './Temporizador.css'

function Temporizador(props) {
    const [diff, setDiff] = useState(null);
    const [initial, setInitial] = useState(null);
    const [time, setTime] = useState(0);

    const tick = () => {
        setDiff(new Date(+new Date() - initial))

    }

    const start = () => {
        setInitial(+new Date())
    }

    useEffect (() => {
        if (props.data === true) {
            start()
        }
    
    },[])
    useEffect(() => {
        if (initial) {
            requestAnimationFrame(tick)
        }
    },[initial])

    useEffect(() => {
        if (diff) {
            requestAnimationFrame(tick)
        }
    },[diff])

    const timeFormat = (date) => {
        if(!date) return "00:00:00";
        
        let mm = date.getUTCMinutes();
        let ss = date.getUTCSeconds();
        let ms = date.getUTCMilliseconds();


        mm = mm < 10 ? "0"+mm : mm;
        ss = ss < 10 ? "0"+ss : ss;
        ms = ms < 10 ? "0"+ms : ms;

        
    


        return `${mm}:${ss}:${ms}`;
    }

  return (
    <div className="tempo">
        <h1 className="Timer">{timeFormat(diff)}</h1>
        {props.date === true ? props.prueba(time) : null}
       
    </div>
  )
}

export default Temporizador