import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, ChevronLeft, ChevronRight, Moon, Sun, Sparkles, CalendarCheck2 } from 'lucide-react';
import './style.css';

const year = 2026;
const months = [
  { name:'January', amavasya:'18th 1:20 a.m. to 19th 2:31 a.m.', purnima:'2nd 6:44 p.m. to 3rd 4:42 p.m.', amMed:[18], amOffer:[18], purnimaMed:[2], purnimaOffer:[3], ekadashi:[14,29], pradosham:[1,16,30], shivaratri:[17], pooja:[3], snanam:[2,3,10,17,18,25,31], events:[[1,"New Year's Day"],[3,'Arudra Darshan'],[6,'Agasthya Jayanthi'],[7,'Thyagaraja Aradhana'],[12,'National Youth Day'],[14,'Bhogi'],[15,'Thai Pongal · Uttarayana'],[16,'Mattu Pongal'],[17,"Farmers' Day"],[18,'Thai Amavasya'],[26,'Republic Day']] },
  { name:'February', amavasya:'16th 6:27 p.m. to 17th 6:30 p.m.', purnima:'1st 4:41 a.m. to 2nd 4:43 a.m.', amMed:[16], amOffer:[16,17], purnimaMed:[1], purnimaOffer:[1], ekadashi:[13,27], pradosham:[14], shivaratri:[15], pooja:[1], snanam:[1,8,13,17,24], events:[[1,'Thaipusam · Linga Bhairavi Devi Aradhana'],[12,'Yaksha Celebrations'],[13,'Yaksha Celebrations'],[14,'Yaksha Celebrations'],[15,'Mahashivaratri · Yogeshwar Linga Consecration Day'],[17,'Annular Solar Eclipse (not visible in India)']] },
  { name:'March', amavasya:'18th 8:29 a.m. to 19th 7:29 a.m.', purnima:'2nd 6:23 p.m. to 3rd 5:52 p.m.', amMed:[18], amOffer:[18], purnimaMed:[2], purnimaOffer:[3], ekadashi:[14,28], pradosham:[1,16,30], shivaratri:[17], pooja:[2], snanam:[2,3,10,17,18,25,31], events:[[2,'Masi Magam'],[3,'Holi · Total Lunar Eclipse'],[8,"International Women's Day"],[14,'Karadaiyan Nonbu'],[19,'Telugu New Year · Ugadi'],[20,'Saptarishi Avahanam · Spring Equinox'],[21,'Ramadan (Eid al-Fitr) · International Day of Forests'],[22,'World Water Day'],[26,'Sri Rama Navami'],[27,'Sri Rama Navami'],[31,'Mahavir Jayanthi']] },
  { name:'April', amavasya:'16th 7:32 p.m. to 17th 5:47 p.m.', purnima:'1st 7:38 a.m. to 2nd 7:57 a.m. · 30th 9:51 p.m. to 1st May 11:07 p.m.', amMed:[16], amOffer:[17], purnimaMed:[1,30], purnimaOffer:[1], ekadashi:[13,27], pradosham:[15,29], shivaratri:[15], pooja:[1], snanam:[1,8,16,17,24,30], events:[[1,'Panguni Uthiram'],[3,'Good Friday'],[7,'World Health Day'],[8,'Patanjali Jayanthi'],[14,'Tamil New Year'],[22,'Earth Day']] },
  { name:'May', amavasya:'16th 3:59 a.m. to 17th 2:09 a.m.', purnima:'30th 12:55 p.m. to 31st 2:45 p.m.', amMed:[16], amOffer:[16], purnimaMed:[30], purnimaOffer:[1,30,31], ekadashi:[13,26], pradosham:[14,28], shivaratri:[15], pooja:[1,30], snanam:[1,8,15,16,23,29,31], events:[[1,'Buddha Purnima · Chitra Purnima · Labor Day'],[4,'Agni Nakshatram begins'],[28,'Bakrid (Eid al-Adha)'],[30,'Vaikasi Visakam'],[31,"Mother's Day"]] },
  { name:'June', amavasya:'14th 11:50 a.m. to 15th 9:27 a.m.', purnima:'29th 4:22 a.m. to 30th 6:11 a.m.', amMed:[14], amOffer:[14], purnimaMed:[29], purnimaOffer:[29], ekadashi:[11,25], pradosham:[12,27], shivaratri:[13], pooja:[29], snanam:[7,13,14,21,28,29], events:[[5,'World Environment Day'],[21,'International Day of Yoga · World Music Day · Summer Solstice'],[22,'Ani Uthiram'],[24,'Dhyanalinga Consecration Day'],[26,'Muharram']] },
  { name:'July', amavasya:'13th 6:53 p.m. to 14th 4:33 p.m.', purnima:'28th 7:33 p.m. to 29th 8:58 p.m.', amMed:[13], amOffer:[14], purnimaMed:[28], purnimaOffer:[29], ekadashi:[10,24], pradosham:[12,26], shivaratri:[12], pooja:[29], snanam:[6,13,14,21,28,29], events:[[1,'Van Mahotsav begins'],[7,'Van Mahotsav concludes'],[28,'World Nature Conservation Day'],[29,'Guru Purnima · Dakshinayana']] },
  { name:'August', amavasya:'12th 2:11 a.m. to 13th 12:16 a.m.', purnima:'27th 9:56 a.m. to 28th 10:29 a.m.', amMed:[12], amOffer:[12], purnimaMed:[27], purnimaOffer:[27], ekadashi:[8,23], pradosham:[10,25], shivaratri:[11], pooja:[27], snanam:[5,11,12,19,26,27], events:[[3,'Adi Perukku'],[12,'Adi Amavasya · Total Solar Eclipse (not visible in India)'],[14,'Adi Pooram'],[15,'Independence Day (India)'],[17,'Naga Panchami'],[21,'Varalakshmi Vratam'],[26,'Milad-un-Nabi'],[27,'Avani Avittam']] },
  { name:'September', amavasya:'10th 10:57 a.m. to 11th 9:40 a.m.', purnima:'25th 11:13 p.m. to 26th 10:50 p.m.', amMed:[10], amOffer:[10], purnimaMed:[25], purnimaOffer:[26], ekadashi:[7,22], pradosham:[8,24], shivaratri:[9], pooja:[26], snanam:[3,9,10,17,25,26], events:[[3,'River Revitalization Day'],[4,'Krishna Janmashtami'],[14,'Ganesh Chaturthi'],[21,'International Day of Peace'],[23,"Sadhguru's Enlightenment Day · Autumn Equinox"],[27,'World Rivers Day'],[28,'Partial Lunar Eclipse (not visible in India)']] },
  { name:'October', amavasya:'9th 9:53 p.m. to 10th 9:34 p.m.', purnima:'25th 11:31 a.m. to 26th 10:14 a.m.', amMed:[9], amOffer:[10], purnimaMed:[25], purnimaOffer:[25], ekadashi:[6,22], pradosham:[8,23], shivaratri:[8], pooja:[25], snanam:[3,9,10,17,24,25], events:[[2,'Gandhi Jayanti'],[9,'Mahalaya Amavasya'],[10,'Mahalaya Amavasya'],[11,'Navratri at Linga Bhairavi begins'],[16,'World Food Day'],[19,'Ayudha Pooja · Saraswati Pooja · Maha Navami'],[20,'Vijayadashami · Dussehra · Vidyarambham']] },
  { name:'November', amavasya:'8th 12:00 p.m. to 9th 12:46 p.m.', purnima:'23rd 11:20 p.m. to 24th 9:24 p.m.', amMed:[8], amOffer:[8,9], purnimaMed:[23], purnimaOffer:[24], ekadashi:[4,20], pradosham:[6,22], shivaratri:[7], pooja:[24], snanam:[1,7,9,16,22,24], events:[[8,'Diwali'],[14,"Children's Day (India)"],[17,'Karthigai · Ayyappa season starts'],[24,'Dhyanalinga Offering Day · Karthigai Deepam · Guru Nanak Jayanthi']] },
  { name:'December', amavasya:'8th 5:04 a.m. to 9th 6:48 a.m.', purnima:'23rd 10:27 a.m. to 24th 8:10 a.m.', amMed:[8], amOffer:[8], purnimaMed:[23], purnimaOffer:[23], ekadashi:[4,20], pradosham:[6,21], shivaratri:[7], pooja:[23], snanam:[1,7,8,15,22,23,30], events:[[1,'Kalabhairava Ashtami'],[5,'World Soil Day'],[16,'Margazhi begins'],[20,'Vaikuntha Ekadashi'],[22,'Saptarishi Arati · Winter Solstice'],[24,'Arudra Darshan'],[25,'Christmas Day']] }
];

const categoryInfo = {
  amavasya: { label:'Amavasya', icon:Moon, color:'lavender' },
  purnima: { label:'Purnima', icon:Moon, color:'gold' },
  ekadashi: { label:'Ekadashi', icon:Sparkles, color:'sage' },
  pradosham: { label:'Pradosham', icon:Sun, color:'orange' },
  shivaratri: { label:'Shivaratri', icon:Sparkles, color:'rose' },
  pooja: { label:'Purnima Pooja', icon:Sparkles, color:'gold' },
  event: { label:'Celebration', icon:CalendarCheck2, color:'orange' },
  snanam: { label:'Linga Snanam', icon:Moon, color:'sage' },
};

function getEvents(month, day) {
  const entries = [];
  const add = (key, title, detail='') => entries.push({ key, title, detail, ...categoryInfo[key] });
  if (month.amMed.includes(day)) add('amavasya','Amavasya Meditation / Kalabhairava Shanti',month.name === 'January' && day === 18 ? 'Thai Amavasya' : month.name === 'August' && day === 12 ? 'Adi Amavasya' : month.name === 'October' && day === 9 ? 'Mahalaya Amavasya' : '');
  if (month.amOffer.includes(day)) add('amavasya','Amavasya Offering');
  if (month.purnimaMed.includes(day)) add('purnima','Purnima Meditation');
  if (month.purnimaOffer.includes(day)) add('pooja','Purnima Offering');
  if (month.ekadashi.includes(day)) add('ekadashi','Ekadashi');
  if (month.pradosham.includes(day)) add('pradosham','Pradosham');
  if (month.shivaratri.includes(day)) add('shivaratri','Shivaratri / Pancha Bhuta Kriya', month.name === 'February' ? 'Mahashivaratri' : '');
  if (month.pooja.includes(day)) add('pooja','Purnima Pooja / Linga Bhairavi Yantra Pooja');
  if (month.snanam.includes(day)) add('snanam','Linga Snanam');
  month.events.filter(([d]) => d === day).forEach(([, title]) => add('event',title));
  return entries;
}

function App() {
  const now = new Date();
  const initialMonth = now.getFullYear() === year ? now.getMonth() : 0;
  const [monthNumber, setMonthNumber] = useState(initialMonth);
  const [selected, setSelected] = useState(now.getFullYear() === year ? now.getDate() : 1);
  const [showEvents, setShowEvents] = useState(true);
  const month = months[monthNumber];
  const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
  const firstDay = new Date(year, monthNumber, 1).getDay();
  const today = now.getFullYear() === year && now.getMonth() === monthNumber ? now.getDate() : null;
  const selectedEvents = useMemo(() => getEvents(month, selected), [month, selected]);
  const visibleEvents = selectedEvents;
  const moveMonth = (delta) => { const next = (monthNumber + delta + 12) % 12; setMonthNumber(next); setSelected(1); };
  const selectToday = () => { if (now.getFullYear() === year) { setMonthNumber(now.getMonth()); setSelected(now.getDate()); } };
  return <main className="app-shell">
    <header className="calendar-header"><a className="brand" href="#calendar"><span className="brand-mark"><Moon size={18}/></span><span>Isha <b>Lunar Calendar</b></span></a><button className="today-button" onClick={selectToday}><CalendarDays size={15}/> Today</button></header>
    <section className="calendar-layout" id="calendar"><div className="calendar-panel"><div className="panel-top"><div><h1>{month.name} <span>{year}</span></h1></div><div className="month-controls"><button aria-label="Previous month" onClick={()=>moveMonth(-1)}><ChevronLeft size={18}/></button><button aria-label="Next month" onClick={()=>moveMonth(1)}><ChevronRight size={18}/></button></div></div><div className="calendar-grid"><div className="weekday-row">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d)=><span key={d}>{d}</span>)}</div><div className="days-grid">{Array.from({length:firstDay},(_,i)=><div className="day-empty" key={'empty'+i}/>)}{Array.from({length:daysInMonth},(_,i)=>{const day=i+1;const events=getEvents(month,day);const active=day===selected;return <button key={day} className={`day-cell ${active?'selected':''} ${day===today?'today':''} ${showEvents&&events.length?'has-events':''}`} onClick={()=>setSelected(day)} aria-label={`${month.name} ${day}${events.length?`, ${events.length} observances`:''}`}><span className="day-number">{day}</span>{events.length>0&&<span className="event-dots">{[...new Set(events.map((e)=>e.color))].slice(0,3).map((c,i)=><i className={`dot ${c}`} key={i}/>)}</span>}{showEvents&&events.length>0&&<span className="day-label">{events[0].title.replace('Meditation / Kalabhairava Shanti','Meditation').replace(' / Linga Bhairavi Yantra Pooja','')}</span>}</button>})}</div></div><div className="legend"><span><i className="dot lavender"/> Amavasya</span><span><i className="dot gold"/> Purnima</span><span><i className="dot sage"/> Other observances</span><button onClick={()=>setShowEvents((v)=>!v)}>{showEvents?'Hide':'Show'} labels</button></div><a className="source-link" href="https://isha.sadhguru.org/in/en/isha-lunar-calendar" target="_blank" rel="noreferrer">Isha Foundation · 2026 calendar</a></div>
      <aside className="day-panel"><div className="day-panel-head"><div><div className="section-kicker">SELECTED DATE</div><h2>{month.name} {selected}<sup>{selected===1?'st':selected===2?'nd':selected===3?'rd':'th'}</sup></h2></div><div className="day-chip">{new Date(year,monthNumber,selected).toLocaleDateString('en-IN',{weekday:'short'}).toUpperCase()}</div></div><div className="lunar-card"><div className="lunar-detail"><small>AMAVASYA</small><p>{month.amavasya}</p></div><div className="lunar-detail"><small>PURNIMA</small><p>{month.purnima}</p></div><small className="time-note">Timings in Indian Standard Time</small></div><div className="event-heading"><h3>Observances</h3><span>{visibleEvents.length}</span></div><div className="event-list">{visibleEvents.length?visibleEvents.map((event,i)=><div className="event-row" key={`${event.title}-${i}`}><span className={`event-icon ${event.color}`}><event.icon size={15}/></span><div><b>{event.title}</b>{event.detail&&<small>{event.detail}</small>}</div></div>):<div className="empty-events"><b>No listed observances</b></div>}</div></aside></section>
  </main>;
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(()=>{}));
createRoot(document.getElementById('root')).render(<App/>);
