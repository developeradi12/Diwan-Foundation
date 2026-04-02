"use client"
import api from "@/lib/axios"
import { useEffect, useState } from "react"

const MemberCertificate = () => {
    const [certificate, setCertificate] = useState<string>("")
    const [loading, setLoading] = useState(true)
   

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const res = await api.get("/certificat");
                const data = res.data
                // console.log("data", res);
                if (data.success && data.certificateUrl) {
                    setCertificate(data.certificateUrl)
                }
            } catch (err: any) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchCertificate()
    }, [])

    // 🔄 Loading State
    if (loading) {
        return <h1 className="p-5">Loading certificate...</h1>
    }

    if (!certificate) {
        return (
            <h1 className="p-5 text-yellow-600 font-semibold">
             Certificat not generated yet
            </h1>
        )
    }
    return (
        <div className="p-5 space-y-4">
            <h1 className="text-2xl font-bold">My Certificate</h1>

            {/* 📄 Preview
            {certificate && (
                <iframe
                    src={certificate}
                    className="w-full h-[500px] border rounded"
                />
            )} */}

            {/* ⬇ Download Button */}
            {certificate && (
                <a href={certificate} download>
                    <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-5 py-2 rounded">
                        Download Certificate
                    </button>
                </a>
            )}
        </div>
    )
}

export default MemberCertificate;