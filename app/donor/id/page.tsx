"use client"
import api from "@/lib/axios"
import { useEffect, useState } from "react"

const Memberidcard = () => {
    const [certificate, setCertificate] = useState<string>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const res = await api.get("/donor/id");
                const data = res.data
                if (data.success && data.certificateUrl) {
                    setCertificate(data.certificateUrl)
                }
            } catch (err) {
                console.log(err)
                // setError("Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        fetchCertificate()
    }, [])

    // Loading State
    if (loading) {
        return <h1 className="p-5">Loading certificate...</h1>
    }

    //  ID Card not generated
    if (!certificate) {
        return (
            <h1 className="p-5 text-yellow-600 font-semibold">
                ID Card not generated yet
            </h1>
        )
    }

    return (
        <div className="p-5 space-y-4">
            <h1 className="text-2xl font-bold">My ID Card</h1>

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

export default Memberidcard;