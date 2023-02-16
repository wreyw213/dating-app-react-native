import React from 'react';


const useTimer = (delay:number) => {
    const [time,setTime] = React.useState(0);
    const [show,setShow] = React.useState(false)

    console.log("useTimer=>>>",time,show)
    React.useEffect(() => {
      if (!show) return;

      setTimeout(() => {
        setTime((prev) => prev < 5 ? prev + 1 : 1);
      }, delay);
    }, [time, show]);

    return [time, () => setShow(true), () => setShow(false)];
}

export default useTimer