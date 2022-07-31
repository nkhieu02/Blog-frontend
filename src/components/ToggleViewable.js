import { useState } from 'react'

const Toggle = (props) => {
    const [visible, setVisible] = useState(false)

    const hidden = { display: visible ? 'none' : '' }
    const view = { display: visible ? '' : 'none' }

    const setToggle = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hidden}>
                <button onClick={setToggle}>{props.buttonLabel}</button>
            </div>
            <div style={view}>
                {props.children}
                <button onClick={setToggle}>hide</button>
            </div>
        </div>
    )
}

export default Toggle