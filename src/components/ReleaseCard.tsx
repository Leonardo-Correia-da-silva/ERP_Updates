import dayjs from "dayjs";
import { Release } from "../dto/release.dto"
import { useParams } from "react-router-dom";

type Props = {
    release: Release
}

export function ReleaseCard({release}: Props){

    const { id } = useParams()

    const hasEmptyCompanyCode = release.releaseNotes?.find((note) => {
        if(!note.companyCode) return note;
    })

    const hasCompanyCode = release.releaseNotes?.find((note) => {
        if(note.companyCode === id) return note;
    })

    if(!hasCompanyCode && !hasEmptyCompanyCode) return null

    return (
        <div className="w-full flex  justify-center mb-5">
          <div className='bg-blue-100 w-full p-20 mx-6 rounded-md'>
            <label className='data'>
              {dayjs(release.releaseDate).subtract(2.98, 'hour').format('DD/MM/YYYY HH:mm')}
            </label>
            <h2 className='topico mb-8'>Versão - {release.code}</h2>

            {release.releaseNotes?.find(note => {
              if (note.noteType === 0 && (note.companyCode === id || !note.companyCode)) return note;
            }) && (
                <h2 className='font-bold mb-1'>Novos Recursos</h2>
              )}

            <ul>
              {release.releaseNotes?.map((note) => (
                note.noteType === 0 && (
                  (note.companyCode === id || !note.companyCode) && (
                    <li key={note.id} >
                      <div className='flex gap-3'>
                        <h3 className='font-semibold'>{note.topic}</h3>{note.link && (
                          <a href={note.link} target='_blank' className='link'>Saiba mais</a>
                        )}
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: note.description }}></div>
                    </li>
                  )
                )
              ))}
            </ul>

            <ul>
              {release.releaseNotes?.find(note => {
                if (note.noteType === 1 && (note.companyCode === id || !note.companyCode)) return note;
              }) && (
                  <h2 className='font-bold  mb-1'>Correções</h2>
                )}

              {release.releaseNotes?.map((note) => (
                note.noteType === 1 && (note.companyCode === id || !note.companyCode) && (
                  <li key={note.id}>
                    <div className='flex gap-3'>
                      <h3 className='font-semibold'>{note.topic}</h3> {note.link && (
                        <a href={note.link} target='_blank' className='link'>Saiba mais</a>
                      )}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: note.description }}></div>
                  </li>
                )
              ))}
            </ul><br></br>

            <ul>
              {release.releaseNotes?.find(note => {
                if (note.noteType === 2 && (note.companyCode === id || !note.companyCode)) return note;
              }) && (
                  <h2 className='font-bold  mb-1'>Melhorias</h2>
                )}

              {release.releaseNotes?.map((note) => (
                note.noteType === 2 && (note.companyCode === id || !note.companyCode) && (
                  <li key={note.id}>
                    <div className='flex gap-3'>
                      <h3 className='font-semibold'>{note.topic}</h3>{note.link && (
                        <a href={note.link} target='_blank' className='link'>Saiba mais</a>
                      )}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: note.description }}></div>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
    )
}