"use client"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactCards() {
  return (
    <div className="grid md:grid-cols-7 gap-3 max-w-6xl mx-auto py-20">

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="p-4 rounded-xl shadow-lg bg-white text-center col-span-2"
      >
        <Phone className="mx-auto mb-4 text-(--color-accent)" />

        <h3 className="font-bold text-lg mb-3 text-(--color-text)">
          Contact Us
        </h3>

        <ul className="space-y-2 text-sm text-(--color-text-muted)">
          <li>A B Fakir (Managing Director) - 8758819249</li>
          <li>Aiyub Sha Diwan (Trustee) - 9979041727</li>
          <li>Usmangani Fakeer (Trustee) - 8866126030</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="p-8 rounded-xl shadow-lg bg-white text-center col-span-3"
      >
        <Mail className=" text-(--color-accent) mx-auto mb-4" />
        <h3 className="font-bold">E-mail Us</h3>
        <p className="text-(--color-text-muted)">info@allgujaratmuslimfakirdiwansamaj.org</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="p-8 rounded-xl shadow-lg bg-white text-center col-span-2"
      >
        <MapPin className=" text-(--color-accent) mx-auto mb-4" />
        <h3 className="font-bold">Location</h3>
        <p className="text-(--color-text-muted)">601, 6th floor penth house, al-wajee residency, lallu raiji no vando, Mirzapur , abad, 001</p>
      </motion.div>

    </div>
  )
}