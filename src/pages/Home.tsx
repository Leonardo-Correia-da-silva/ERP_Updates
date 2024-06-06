import { useEffect, useState } from 'react';
import "../App.css";
import logo from "../assets/cort.erp.png";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { Release } from '../dto/release.dto';
import { api } from '../service/api';
import { LogoLoginMobile } from '../logologinMobile';
import { useParams } from 'react-router-dom';
import { ReleaseCard } from '../components/ReleaseCard';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br');


export function HomePage() {
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
    <div className="flex flex-col mb-52">
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
            <ReleaseCard release={item}/>
            ))}
    </div>
  );
}


