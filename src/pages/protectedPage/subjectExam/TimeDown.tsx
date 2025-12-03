import React, { useState, useEffect } from 'react'

interface TimeProps {
    time: number | undefined   // phút
}

export default function TimeDown({ time }: TimeProps) {

    const [ms, setMs] = useState<number>(0);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!time) return;
        // chuyển đổi thành giây
        const totalSeconds = time * 60;

        // lấy giá trị
        const savedStart = sessionStorage.getItem("examStart");

        if (!savedStart) {
            // Lần đầu vào bài thi
            const now = Date.now();
            // lấy thời điểm hiện tại khi thi
            sessionStorage.setItem("examStart", now.toString());
            
            setMs(totalSeconds);
        } else {
            // Tính thời gian còn lại
            const now = Date.now();
            const elapsed = Math.floor((now - parseInt(savedStart)) / 1000);

            const remaining = totalSeconds - elapsed;

            if (remaining <= 0) {
                setMs(0);
                sessionStorage.removeItem("examStart");
            } else {
                setMs(remaining);
            }
        }

    }, [time]);

    // Countdown chạy mỗi giây
    useEffect(() => {
        if (ms <= 0) return;

        const timer = setInterval(() => {
            setMs(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    sessionStorage.removeItem("examStart"); // hết giờ
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [ms]);

    return (
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {formatTime(ms)}
        </div>
    );
}
