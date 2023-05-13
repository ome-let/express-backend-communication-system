## 🤖 Backend Communication system Project Guide

โค้ดระบบหลังบ้านของ Life Cycle Application เขียนโดยใช้ express.js อ่าน doc ได้ [ที่นี่](https://expressjs.com/) 
โครงงานนี้เป็นส่วนหนึ่งของวิชา SELECTED TOPICS IN COMMUNICATION SYSTEM

## 😶‍🌫️ Installation Guide

**Environment ที่สำคัญ** 
- node v.16.x.x or latest version
- npm v.8.x.x or latest version

**Environment ที่สำคัญกว่า** 
- แกอะ .-.

**Devolopment**
- สร้างไฟล์ `.env` ขึ้นมาแล้วใส่ค่าต่าง ๆ ตามไฟล์ `example.env` ลงไปหรือขอ secret จาก dev คนอื่น
```bash
  1: 📄 npm install
  2: 📄 npm run dev
```
- Server จะรันอยู่ที่ port 4000 (default)
- สามารถเเปลี่ยน port ที่จะ run ได้ที่ไฟล์ `.env`

**คำเตือน 💣**
- หากมีการเพิ่มตัวแปรใน `.env` ให้เพิ่มตัวแปรนั้นใน `example.env` ด้วยแต่ไม่ต้องใส่ค่าของตัวแปร
- ห้าม push secret ต่าง ๆ ขึ้นมา
- ถ้าฝ่าฝืนจะโดนยิง ถ้ายังไม่ตายจะโดนยิงซ้ำ


## 💣 Backend Communication system Development Role
- ให้ตั้งชื่อ branch ด้วย `{ชื่อเล่น}` ของตัวเองได้เลย
- ในการเปิด pull request ให้ใช้ชื่อ `[{ชื่อเล่น}}] {สุดยอดฟังก์ชั่นที่พัฒนา}` ทุกครั้ง และใช้ `pull_request_template` แล้วกรอกรายละเอียดในส่วนที่จำเป็นดังนี้
    - รายละเอียดโค้ดที่แก้อธิบายคร่าว ๆ (What i do)
- หากรายละเอียดของ pull request ดังกล่าวไม่ครบถ้วน ห้าม merge เด็ดขาด! หากฝ่าฝืนจะโดน rollback code ออก
- ต้องมีคน approved ครบตั้งแต่ 1 คนชึ้นไปและคนที่ approved ต้องติ้กในส่วนของ Approver Checklist ให้ครบทุกส่วน
- Happy hacking :)
