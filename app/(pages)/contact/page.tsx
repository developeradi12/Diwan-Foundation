import Navbar from "@/components/sections/Navbar";
import ContactForm from "./ContacForm";
import ContactCards from "./ContactCards";
import ContactHero from "./ContactHero";
import GoogleMap from "./GoogleMap";
import { Footer } from "@/components/sections/Footer";

export default function ContactusPage() {
    return (
        <>
           
            <ContactHero />

            <ContactCards />

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <GoogleMap />
                    <ContactForm />
                </div>
            </section>

           
        </>

    );
}
