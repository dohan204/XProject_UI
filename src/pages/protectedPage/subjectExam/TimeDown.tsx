import { setSeconds } from 'date-fns'
import React, { useState, useEffect } from 'react'
export interface Time {
    time: number | undefined
}
export default function TimeDown({ time }: Time) {
    const [ms, setMs] = useState<number>(0)
    // const [done, setDone] = useState<boolean>(false)
    // console.log('giá trị hiện tại của time là: ', ms);
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}: ${s.toString().padStart(2, '0')}`
    }
    useEffect(() => {
        if (time) setMs(time * 60);  // time là phút => đổi qua giây
    }, [time]);

    useEffect(() => {
        if(ms <= 0) return; 
        const time = setInterval(() => {
            setMs(prev => {
                if (prev < 1) {
                    clearInterval(time)
                    return 0;
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(time)
    }, [ms])
    return (
       <div>
        {formatTime(ms)}
       </div>
    )
}
