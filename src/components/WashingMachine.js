import React, { useState, useEffect } from 'react';
import './WashingMachine.css';

function WashingMachine({ id, isUsed, countdown, onInsertCoin }) {
  const [timeLeft, setTimeLeft] = useState(countdown);
  const [hasNotified, setHasNotified] = useState(false); // ✅ flag กันการแจ้งซ้ำ

  useEffect(() => {
    let timer;
    if (isUsed && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // ✅ แจ้งเตือนเมื่อเหลือ 60 วินาที (1 นาที) และยังไม่เคยแจ้ง
    if (isUsed && timeLeft === 60 && !hasNotified) {
      sendLineNotification(`🛎️ เครื่องซักผ้า ${id} จะเสร็จในอีก 1 นาที`);
      setHasNotified(true); // ✅ บันทึกว่าแจ้งไปแล้ว
    }

    // ✅ รีเซ็ตเมื่อเครื่องหยุดทำงาน
    if (!isUsed && hasNotified) {
      setTimeLeft(countdown); // รีเซ็ตเวลา
      setHasNotified(false);  // พร้อมแจ้งใหม่รอบหน้า
    }

    return () => clearInterval(timer);
  }, [isUsed, timeLeft]);

  const sendLineNotification = (message) => {
    const accessToken = '1xQ7zCd4WI54rfRyBrpEPUc2/L0dmuQcj+wuAi4x4QmXq8hfDzhDNlYppD0Ti8XbroU5PizGm4WfplrgS0+D49nTI1Cb47JWUSaOlnev3LhjWt/m/n5u9/Vx+5mC2tm5ki6D8UZ54jGYkpMnc6+gVgdB04t89/1O/w1cDnyilFU='; // แทนที่ด้วยของจริง
    const to = 'U891b97f7b952d58e37d8bf1a4160494e';

    fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        to: to,
        messages: [{ type: 'text', text: message }],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ ส่งข้อความ:', data);
      })
      .catch((err) => {
        console.error('❌ ส่งข้อความล้มเหลว:', err);
      });
  };

  return (
    <div className={`machine-card ${isUsed ? 'active' : ''}`}>
      <h3>เครื่องซักผ้า #{id}</h3>
      <p>สถานะ: {isUsed ? 'กำลังทำงาน' : 'ว่าง'}</p>
      <p>เวลาที่เหลือ: {isUsed ? `${timeLeft} วินาที` : '-'}</p>
      {!isUsed && <button onClick={onInsertCoin}>หยอดเหรียญ</button>}
    </div>
  );
}

export default WashingMachine;
