"use client"

import { motion } from "framer-motion"

export default function GoogleMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full h-[90%] px-6 "
    >

      <div className="max-w-6xl mx-auto h-full rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d28895.97624904602!2d82.55845099158218!3d25.135791225365463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s601%206th%20floor%20penth%20house%20al-wajee%20residency%20lallu%20raiji%20no%20vando%20mirzapur%20abad%20001!5e0!3m2!1sen!2sin!4v1773042107311!5m2!1sen!2sin"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </div>

    </motion.div>
  )
}