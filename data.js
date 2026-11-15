/*
  1st Japan Trip — trip data
  แก้แผนได้ที่ไฟล์นี้ไฟล์เดียว
  - t: เวลา (HH:MM)
  - prev: ข้อความแทนวันที่ ถ้ากิจกรรมอยู่คืนก่อนหน้า (ไม่นับเป็น "ถัดไป")
  - who: "P" = ทีมพรีเซนต์, "T" = ทีมเที่ยว (ไม่ใส่ = ไปด้วยกัน)
  - tag: ป้ายเล็ก เช่น JR Pass, ราคา
  - map: คำค้นใน Google Maps (ไม่ใส่ = ไม่มีปุ่มแผนที่)
  - stamp: ชื่อบนตราประทับ (ไม่ใส่ = เก็บตราที่นี่ไม่ได้)
  - rate: เรทเริ่มต้น 1 เยน = กี่บาท (แก้ในเว็บได้)
  ข้อมูลส่วนตัว (ชื่อที่พัก เลขเที่ยวบิน ชื่อคน) ตั้งใจไม่ใส่ไว้ เพราะเว็บบน GitHub Pages เป็นสาธารณะ
*/
window.TRIP = {
  title: "1st Japan Trip",
  start: "2026-11-24",
  end: "2026-11-28",
  departNight: "2026-11-23",
  timeZone: "Asia/Tokyo",
  homeTimeZone: "Asia/Bangkok",
  rate: 0.205,

  hero: {
    route: ["Kanazawa", "Osaka", "Kobe", "Kyoto"],
    why: "นำเสนองานที่ ICEED 2026"
  },

  tiles: [
    { kind: "light", label: "OUT  อ. 24", big: "BKK\nKIX", line1: "บินข้ามคืน", line2: "01:10 ถึง 08:45" },
    { kind: "light", label: "BACK  ส. 28", big: "KIX\nDMK", line1: "Terminal 1", line2: "ออก 10:30" },
    { kind: "dark", label: "JR PASS", big: "7 วัน", line1: "Kansai Hokuriku Area", line2: "" },
    { kind: "red", label: "PRESENT", big: "26.11", line1: "08:00 ที่ KIT", line2: "" }
  ],

  days: [
    {
      date: "2026-11-24",
      dow: "อ.",
      dowFull: "อังคาร",
      title: "Bangkok → Kanazawa",
      summary: "บินข้ามคืน ต่อรถไฟ 3 ขบวน แวะโอซาก้าครึ่งวัน แล้วนอนคานาซาวะ",
      stay: "คานาซาวะ",
      items: [
        { t: "20:00", prev: "คืน 23", title: "ไปสุวรรณภูมิ", sub: "เช็คอินแล้วรอขึ้นเครื่อง" },
        { t: "01:10", title: "BKK → KIX", sub: "บินข้ามคืน ถึง Kansai Terminal 2 เวลา 08:45", tag: "Flight" },
        { t: "08:45", title: "ถึง KIX Terminal 2", sub: "ผ่าน ตม. รับกระเป๋า แล้วโชว์ QR Visit Japan Web" },
        { t: "09:40", title: "Aero Plaza ชั้น 2", sub: "นั่งบัสฟรีไปฝั่งสถานี รับ JR Pass จองที่นั่ง 3 ขบวนไปคานาซาวะ และซื้อ ICOCA", tag: "Free bus", map: "Kansai Airport Aero Plaza" },
        { t: "10:50", title: "Haruka → Osaka", sub: "ประมาณ 50 นาที ลงชานชาลา Umekita ใต้ดิน", tag: "JR Pass" },
        { t: "11:40", title: "ฝากกระเป๋าที่ Crosta", sub: "ชั้น 1 ใกล้ Central Gate เปิด 9:00–20:00", tag: "¥1,000 ต่อใบ", map: "Crosta JR Osaka Station" },
        { t: "12:15", stamp: "Tenmangu", title: "Osaka Tenmangu Shrine", sub: "นั่ง JR จาก Kitashinchi 1–2 นาที ไหว้เทพแห่งการเรียน", tag: "JR Pass", map: "Osaka Tenmangu Shrine" },
        { t: "13:00", title: "ข้าวเที่ยงและช้อปโอซาก้า", sub: "เช็ครอบรถไฟก่อน แล้วค่อยกลับไปรับกระเป๋า" },
        { t: "14:40", title: "รับกระเป๋าที่ Crosta", sub: "กลับมาที่ Central Gate" },
        { t: "15:00", title: "Thunderbird → Tsuruga", sub: "ชานชาลา 11 ใช้เวลา 1.5 ชม. นั่งฝั่งขวาจะเห็นทะเลสาบบิวะ", tag: "JR Pass" },
        { t: "16:30", title: "Tsurugi → Kanazawa", sub: "ขึ้นบันไดเลื่อนไปประตูเปลี่ยนสาย", tag: "JR Pass" },
        { t: "17:30", title: "ถึงคานาซาวะ เช็คอินที่พัก", sub: "เดินออกทางตะวันตกประมาณ 10 นาที เช็คอินได้ถึง 22:00" },
        { t: "18:30", stamp: "Tsuzumi-mon", title: "Tsuzumi-mon", sub: "ออกทางตะวันออก เดิน 650 ม. ประมาณ 10 นาที เปิดไฟตอนค่ำ", tag: "Free", map: "Tsuzumi-mon Gate Kanazawa" },
        { t: "18:40", title: "ข้าวเย็น", sub: "Kuroyuri หรือ Morimori Sushi ร้าน Morimori รับออเดอร์สุดท้าย 21:45", map: "Morimori Sushi Kanazawa Forus" }
      ]
    },
    {
      date: "2026-11-25",
      dow: "พ.",
      dowFull: "พุธ",
      title: "Kanazawa",
      summary: "ช่วงเช้าแยกกันสองทีม เที่ยงเจอกันที่ Tsuzumi-mon แล้วเที่ยวคานาซาวะทั้งบ่าย",
      stay: "คานาซาวะ",
      note: {
        title: "แผนสำรอง ถ้าฝนตกหรือหิมะแรง",
        text: "ทีมเที่ยวนั่ง Hakutaka จาก Kanazawa ไป Toyama (ใช้พาสได้ ไม่ต้องจอง) เดินเล่น Kansui Park ช่วง 08:35–10:15 แล้วนั่งรถไฟกลับถึงคานาซาวะราว 10:30"
      },
      items: [
        { t: "06:30", title: "ออกจากที่พัก", sub: "เดินไปทางตะวันออก 650 ม. ประมาณ 10 นาที" },
        { t: "07:50", who: "P", title: "บัสไป KIT", sub: "ป้าย 10 สาย 33 หรือ 39 ประมาณ 35–40 นาที ใช้ IC Card ไม่ได้", tag: "¥360 เงินสด", map: "Kanazawa Institute of Technology" },
        { t: "08:15", who: "T", title: "เดินไปย่าน Nagamachi", sub: "ประมาณ 1.7 กม. 20 นาที ไม่ต้องเสียค่ารถ" },
        { t: "08:30", who: "P", title: "ลงทะเบียนและฟัง keynote", sub: "ICEED 2026 ช่วง 08:30–11:30" },
        { t: "08:35", who: "T", stamp: "Nagamachi", title: "บ้านซามูไร Nagamachi และ Nomura-ke", sub: "ตรอกกำแพงดินริมคลอง Onosho เปิด 8:30 ใช้เวลาประมาณ 1 ชม.", tag: "¥550 เงินสด", map: "Nomura Samurai House Kanazawa" },
        { t: "09:45", who: "T", stamp: "Oyama", title: "ศาลเจ้า Oyama", sub: "เดินจาก Nagamachi 10–15 นาที เปิดตลอด", tag: "Free", map: "Oyama Shrine Kanazawa" },
        { t: "10:20", who: "T", title: "เดินกลับสถานี", sub: "ประมาณ 20 นาที แวะคาเฟ่หรือซื้อขนมในสถานีรอเวลา" },
        { t: "12:00", title: "เจอกันที่ Tsuzumi-mon", sub: "หน้าสถานี JR Kanazawa ฝั่งตะวันออก", map: "Tsuzumi-mon Gate Kanazawa" },
        { t: "12:30", stamp: "Omicho", title: "ข้าวเที่ยงที่ Omicho หรือ Anto", sub: "บางร้านใน Omicho ปิดวันพุธ", map: "Omicho Market Kanazawa" },
        { t: "13:30", stamp: "Kanazawa Castle", title: "Kanazawa Castle Park", sub: "เดิน 950 ม. ประมาณ 14 นาที", tag: "Walk", map: "Kanazawa Castle Park" },
        { t: "13:50", stamp: "Kenroku-en", title: "Kenroku-en", sub: "เดิน 500 ม. 7 นาที เปิด 8:00–17:00 เข้าได้ถึง 16:30", tag: "¥320", map: "Kenroku-en" },
        { t: "15:30", title: "ไป Higashi Chaya", sub: "เดิน 20 นาทีหรือนั่งบัส" },
        { t: "16:00", stamp: "Higashi Chaya", title: "Higashi Chaya", sub: "ไอศกรีมทองคำเปลวและโรงน้ำชาริมแม่น้ำ Asano ตะเกียงเริ่มเปิดราว 16:40", map: "Higashi Chaya District" },
        { t: "17:30", stamp: "Kazuemachi", title: "Kazuemachi", sub: "ห่างที่พัก 2.1 กม. เดิน 30 นาที หรือนั่ง Left Loop Bus จากป้าย Hashiba-cho ไป East Gate Bus Terminal", tag: "¥210 บัส", map: "Kazuemachi Chaya District" },
        { t: "18:00", title: "ข้าวเย็นแล้วกลับที่พัก", sub: "ซ้อมพรีเซนต์และแพ็คกระเป๋าคืนนี้" }
      ]
    },
    {
      date: "2026-11-26",
      dow: "พฤ.",
      dowFull: "พฤหัส",
      title: "Present → Osaka",
      summary: "เช้านำเสนองานที่ KIT บ่ายนั่งรถไฟกลับโอซาก้า เย็นเดินเล่นโดทงโบริ",
      stay: "โอซาก้า",
      items: [
        { t: "07:00", title: "เช็คเอาท์ ฝากกระเป๋าที่สถานี", sub: "ที่พักไม่รับฝากกระเป๋า ใช้ล็อกเกอร์ที่สถานี JR Kanazawa", tag: "Locker" },
        { t: "07:30", who: "P", title: "บัสสาย 39 ไป KIT", sub: "ป้าย 10 ถึงประมาณ 08:05 แล้วเช็คสไลด์กับเครื่องฉาย", tag: "¥360 เงินสด" },
        { t: "08:00", who: "P", stamp: "ICEED 2026", title: "นำเสนองาน", sub: "Session D2 ช่วง 08:00–12:00", tag: "Present" },
        { t: "12:00", title: "เจอกันแล้วรับกระเป๋า", sub: "นัดที่ Tsuzumi-mon แล้วไปล็อกเกอร์" },
        { t: "12:15", title: "ซื้อ ekiben", sub: "ข้าวกล่องไว้กินบนรถไฟ" },
        { t: "12:30", title: "Tsurugi → Tsuruga", sub: "ประมาณ 1 ชม. เปลี่ยนสายโดยเดินลงจากชั้น 3 ไปชั้น 1", tag: "JR Pass" },
        { t: "13:30", title: "Thunderbird → Osaka", sub: "1 ชม. 20 นาที ทะเลสาบบิวะอยู่ทางซ้าย", tag: "JR Pass" },
        { t: "15:00", title: "Midosuji Line ไปที่พัก", sub: "3 ป้าย 6 นาที แล้วเดินต่อประมาณ 12 นาที", tag: "~¥290" },
        { t: "15:40", stamp: "Nakazakicho", title: "Nakazakicho", sub: "ตรอกบ้านไม้และร้านมือสอง รถไฟใต้ดิน 5 สถานี 8 นาที ร้านส่วนใหญ่ปิด 18:00–19:00 และ TAD ปิดวันพฤหัส", tag: "เงินสด", map: "Nakazakicho Osaka" },
        { t: "17:30", stamp: "Ohatsu Tenjin", title: "Ohatsu Tenjin", sub: "ศาลเจ้าคู่รัก ปิด 18:00", map: "Tsuyunoten Shrine Ohatsu Tenjin" },
        { t: "18:00", stamp: "Dotonbori", title: "Dotonbori", sub: "เดิน 900 ม. ประมาณ 13 นาที Donki เปิดดึก เดินกลับที่พักได้", map: "Dotonbori" }
      ]
    },
    {
      date: "2026-11-27",
      dow: "ศ.",
      dowFull: "ศุกร์",
      title: "Kobe → Arashiyama",
      summary: "ใช้ JR Pass เต็มวัน โกเบตอนเช้า อาราชิยามะตอนบ่าย กลับมาช้อปชินไซบาชิ",
      stay: "โอซาก้า",
      items: [
        { t: "07:00", title: "อาหารเช้าแถวชินไซบาชิ", sub: "Sukiya Yoshinoya Matsuya Komeda Coffee หรือคอนบินิ เตรียมของให้ครบแล้วออกทีเดียว" },
        { t: "08:00", title: "Midosuji Line → Umeda", sub: "สายสีแดง ขึ้นทิศ Esaka หรือ Senri-Chuo" },
        { t: "08:15", title: "เดินไป JR Osaka", sub: "ตามป้าย JR ทางใต้ดิน 5–10 นาที" },
        { t: "08:30", title: "JR Special Rapid → Sannomiya", sub: "ทิศ Himeji หรือ Kobe ประมาณ 22 นาที ดูป้าย Special Rapid", tag: "JR Pass" },
        { t: "08:52", title: "เดินไป Kitano Ijinkan", sub: "ทางออกทิศเหนือฝั่งภูเขา ประมาณ 15 นาที" },
        { t: "09:05", stamp: "Kitano", title: "Kitano", sub: "เดินเล่นถ่ายรูปย่านบ้านฝรั่งเก่า", map: "Kitano Ijinkan" },
        { t: "09:40", title: "Shin-Kobe Ropeway", sub: "เดินไปสถานี Sanroku 10–15 นาที ซื้อตั๋วกระเช้าไปกลับพร้อมค่าเข้าสวน", tag: "Ropeway", map: "Kobe Nunobiki Herb Gardens Ropeway" },
        { t: "10:05", stamp: "Nunobiki", title: "Nunobiki Herb Gardens", sub: "สวนเปิด 10:00–20:30 เดินเล่นลงมาจุดกลางแล้วขึ้นกระเช้าลง", map: "Kobe Nunobiki Herb Gardens" },
        { t: "12:00", title: "Seishin-Yamate Line → Sannomiya", sub: "เดิน 5 นาทีไป Shin-Kobe นั่งหนึ่งป้าย", tag: "¥210" },
        { t: "12:22", title: "JR Sannomiya", sub: "ผ่านประตูที่มีเจ้าหน้าที่แล้วยื่นพาส ดูป้ายทิศ Osaka หรือ Kyoto" },
        { t: "12:30", title: "JR Special Rapid → Kyoto", sub: "ผ่าน Osaka ไม่ต้องลง ปลายทางเช่น Maibara Kusatsu Tsuruga", tag: "JR Pass" },
        { t: "13:22", title: "เปลี่ยนไปชานชาลา 31–33", sub: "Sagano Line อยู่มุมตะวันตกเฉียงเหนือของสถานี เดินไกลกว่าชานชาลาอื่น" },
        { t: "13:35", title: "Sagano Line → Saga-Arashiyama", sub: "ขบวนทิศ Sonobe หรือ Kameoka มาทุก 10–15 นาที", tag: "JR Pass" },
        { t: "13:50", stamp: "Arashiyama", title: "Tenryu-ji และป่าไผ่", sub: "เข้าสวน Sogenchi ออกประตูเหนือ เข้าป่าไผ่ Chikurin no Komichi ประมาณ 400 ม.", tag: "~¥500 สวน", map: "Tenryu-ji Kyoto" },
        { t: "15:00", title: "เดินกลับทาง Torokko Saga", sub: "แวะซื้อขนมหรือเครื่องดื่มข้างทาง" },
        { t: "15:30", title: "Sagano Line → Kyoto", sub: "Rapid ประมาณ 12 นาที ฝั่งขาเข้าตามป้าย Kyoto", tag: "JR Pass" },
        { t: "16:05", title: "JR Kyoto Line → Osaka", sub: "Special Rapid ประมาณ 28 นาที", tag: "JR Pass" },
        { t: "16:35", title: "เดินไป Umeda", sub: "ตามป้าย Subway Umeda ทางใต้ดิน 5–8 นาที" },
        { t: "17:00", title: "Midosuji Line → Shinsaibashi", sub: "ทิศ Namba หรือ Nakamozu ประมาณ 8 นาที", tag: "~¥260" },
        { t: "17:10", stamp: "Shinsaibashi", title: "Shinsaibashi-suji เวลาว่าง", sub: "ออก Exit 5 หรือ 6 ช้อปปิ้งตามใจ", map: "Shinsaibashi-suji Shopping Street" },
        { t: "20:15", stamp: "Onyasai", title: "Shabu Shabu Onyasai", sub: "สาขาโดทงโบริ จองไว้แล้ว", tag: "Booked", map: "Onyasai Dotonbori" }
      ]
    },
    {
      date: "2026-11-28",
      dow: "ส.",
      dowFull: "เสาร์",
      title: "Osaka → Bangkok",
      summary: "ออกเช้า เผื่อเวลาคืนภาษีระบบใหม่ก่อนเช็คอิน เครื่องออก 10:30",
      stay: "บ้าน",
      items: [
        { t: "05:00", title: "ตื่น เช็คกระเป๋ารอบสุดท้าย", sub: "ของคืนภาษีรวมไว้ใบเดียว หยิบง่าย" },
        { t: "06:00", title: "เช็คเอาท์", sub: "เดิน 900 ม. ไปสถานี Shinsaibashi ประมาณ 13 นาที" },
        { t: "06:35", title: "Midosuji Line → Tennoji", sub: "รถไฟใต้ดินสายสีแดง", tag: "¥240 ICOCA" },
        { t: "07:00", title: "Haruka → KIX", sub: "หรือ Kansai Airport Rapid", tag: "JR Pass" },
        { t: "07:45", title: "ถึง KIX ไปตู้คืนภาษี", sub: "สแกนพาสปอร์ต ขึ้นสีเขียวคือจบ สีแดงต้องให้เจ้าหน้าที่ดูของ แล้วคืน ICOCA" },
        { t: "08:30", title: "เช็คอินและโหลดกระเป๋า", sub: "Terminal 1 เคาน์เตอร์มักปิดราว 09:30" },
        { t: "09:15", title: "ตม. ขาออก", sub: "ผ่านดิวตี้ฟรีแล้วไปประตูขึ้นเครื่อง" },
        { t: "10:30", title: "KIX → DMK", sub: "กลับบ้าน", tag: "Flight" }
      ]
    }
  ],

  phrases: [
    { th: "ขอเช็คบิลด้วย", ja: "お会計をお願いします。", ro: "Okaikei o onegai shimasu" },
    { th: "ห้องน้ำอยู่ที่ไหน", ja: "トイレはどこですか？", ro: "Toire wa doko desu ka?" },
    { th: "ไปที่นี่ต้องขึ้นชานชาลาไหน", ja: "ここへ行くには何番線ですか？", ro: "Koko e iku ni wa nanbansen desu ka?" },
    { th: "มีเมนูภาษาอังกฤษไหม", ja: "英語のメニューはありますか？", ro: "Eigo no menyuu wa arimasu ka?" },
    { th: "ใช้บัตรเครดิตได้ไหม", ja: "クレジットカードは使えますか？", ro: "Kurejitto kaado wa tsukaemasu ka?" },
    { th: "ทำ Tax Free ได้ไหม", ja: "免税できますか？", ro: "Menzei dekimasu ka?" },
    { th: "ขอฝากกระเป๋าได้ไหม", ja: "荷物を預かってもらえますか？", ro: "Nimotsu o azukatte moraemasu ka?" },
    { th: "จองไว้แล้ว", ja: "予約しています。", ro: "Yoyaku shite imasu" },
    { th: "ขอน้ำเปล่า", ja: "お水をください。", ro: "Omizu o kudasai" },
    { th: "หลงทาง ช่วยหน่อยได้ไหม", ja: "道に迷いました。助けていただけますか？", ro: "Michi ni mayoimashita. Tasukete itadakemasu ka?" }
  ],

  checklist: [
    "QR Visit Japan Web",
    "JR Pass e-ticket",
    "เงินสดเยน รวมเหรียญสำหรับบัส",
    "พาสปอร์ต",
    "สไลด์นำเสนอ สำรองไว้ใน USB",
    "ปลั๊กแปลง Type A",
    "Power bank"
  ],

  emergency: [
    { label: "ตำรวจ", num: "110" },
    { label: "ไฟไหม้ และรถพยาบาล", num: "119" }
  ]
};
