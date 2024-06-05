import { useEffect, useState } from 'react';
import { LogoLoginMobile } from '../src/logologinMobile';
import "../src/App.css";
import { api } from './service/api';
import { Release } from './dto/release.dto';
import logo from "../src/assets/cort.erp.png";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br');


export function App() {
  const [releases, setReleases] = useState<Release[]>([]);
  
  const handlefetchData = async () => {
    const params: Record<string, unknown> = {
      page: 1,
      limit: 3,
      projectId: "b1f2208a-301e-46b4-8126-acf6fd675acf",
    };

    const response = await api.get("/releases/published", { params });
    setReleases(response.data.releases);
  };


  useEffect(() => { handlefetchData() }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-16 from-blue-400 to-blue-950 bg-gradient-to-t h-32 md:h-40 relative flex justify-center">
        <div className="absolute">
          <LogoLoginMobile />
        </div>
        <div className='div-logo'>
          <img src={logo} className='logo' />
        </div>
        <div className='div-titulo'>
          <h1 className='titulo'>O que há de Novo!</h1>
        </div>
      </div>
      {releases.map((item) => (
        <div key={item.id} className="news-box-container">
          <div className='news-box'>
            <label className='data'>
              {dayjs(item.releaseDate).subtract(2.98, 'hour').format('DD/MM/YYYY HH:mm')}
            </label>
            <h2 className='topico'>Versão - {item.code}</h2>
            
            {item.releaseNotes?.find(note => note.noteType === 0) && (
              <h2 className='font-bold'>Novos Recursos</h2>
            )}
            <br />
            {item.releaseNotes?.map((note) => (
              note.noteType === 0 && (
                <div key={note.id} className='mb-8'>
                  <h3 className='font-semibold'> &bull; {note.topic}</h3>
                  <div dangerouslySetInnerHTML={{ __html: note.description }}></div>
                  {note.link && (
                    <a href={note.link} target='_blank' className='link'>Saiba mais</a>
                  )}
                </div>
              )
            ))}
            
            {item.releaseNotes?.find(note => note.noteType === 1) && (
              <h2 className='font-bold'>Correções</h2>
            )}
            <br />
            {item.releaseNotes?.map((note) => (
              note.noteType === 1 && (
                <div key={note.id} className='mb-8'>
                  <h3 className='font-semibold'>&bull; {note.topic}</h3>
                  <div dangerouslySetInnerHTML={{ __html: note.description }}></div>
                  {note.link && (
                    <a href={note.link} target='_blank' className='link'>Saiba mais</a>
                  )}
                </div>
              )
            ))}
            
            {item.releaseNotes?.find(note => note.noteType === 2) && (
              <h2 className='font-bold'>Melhorias</h2>
            )}
            <br />
            {item.releaseNotes?.map((note) => (
              note.noteType === 2 && (
                <div key={note.id} className='mb-8'>
                  <h3 className='font-semibold'> &bull;{note.topic}</h3>
                  <div dangerouslySetInnerHTML={{ __html: note.description }}></div>
                  {note.link && (
                    <a href={note.link} target='_blank' className='link'>Saiba mais</a>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

