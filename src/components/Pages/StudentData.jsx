import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const StudentData = () => {
  const { curp } = useParams()

  useEffect(() => {
    document.title = `${curp} - GDM Admin`
  }, [curp])

  return (
    <div>
      <h1>Data Student Page</h1>
      <p>This page will display student data.</p>
      <p>CURP FROM PARAMS: {curp}</p>
    </div>
  )
}

export default StudentData
