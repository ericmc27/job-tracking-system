import { useState } from "react"
import { useSession } from "../../lib/auth-client"

function ResumeUpload() {
  const { data: session } = useSession()
  const [resumeUrl, setResumeUrl] = useState(false)

  const handleResumeUpload = async ({ target: { files: [file] } }) => {
    if (!file) return

    const res = await fetch(`/api/presigned-url?fileName=${file.name}&fileType=${file.type}`)
    const { presignedUrl } = await res.json()

    await fetch(presignedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
  }

  return (
    <div>
      <input id="resume-upload" type="file" onChange={handleResumeUpload} hidden />
      <label htmlFor="resume-upload" className="border">Upload file</label>
    </div>
  )
}

export default ResumeUpload