"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Sparkles,
  Send,
  ShieldCheck,
  Clock,
  Star,
  Droplets,
  ExternalLink,
  QrCode,
} from "lucide-react";

type FormState = {
  nom: string;
  telephone: string;
  email: string;
  typeClient: "Particulier" | "Commerce / Professionnel";
  prestation: "Ponctuelle" | "Régulière";
  nombreVitres: string;
  adresse: string;
  ville: string;
  message: string;
};

type ValidationErrors = Partial<Record<keyof FormState, string>>;

export default function Page() {
  const [showQr, setShowQr] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [form, setForm] = useState<FormState>({
    nom: "",
    telephone: "",
    email: "",
    typeClient: "Particulier",
    prestation: "Ponctuelle",
    nombreVitres: "",
    adresse: "",
    ville: "Le Havre",
    message: "",
  });

  const company = {
    name: "BS Klyn",
    activity: "Nettoyage de vitre",
    tagline: "Des vitres propres, nettes et brillantes au Havre et alentours.",
    phone: "0669398480",
    email: "bsklyn76@gmail.com",
    website: "https://bs-klyn-app.vercel.app/",
    mainSite: "https://bsklyn.netlify.app/",
    city: "Le Havre",
    whatsapp: "33669398480",
  };

  const formspreeEndpoint = "https://formspree.io/f/xeedeynq";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=18&data=${encodeURIComponent(
    company.website
  )}`;

  const devisText = useMemo(() => {
    return encodeURIComponent(
      `Bonjour BS Klyn, je souhaite un devis.\n\nNom : ${form.nom}\nTéléphone : ${form.telephone}\nEmail : ${form.email}\nClient : ${form.typeClient}\nPrestation : ${form.prestation}\nNombre de vitres / vitrines : ${form.nombreVitres}\nAdresse : ${form.adresse}\nVille : ${form.ville}\nMessage : ${form.message}`
    );
  }, [form]);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!form.nom.trim()) {
      newErrors.nom = "Veuillez indiquer votre nom.";
    }

    if (!form.telephone.trim()) {
      newErrors.telephone = "Veuillez indiquer votre numéro de téléphone.";
    } else if (form.telephone.replace(/\s/g, "").length < 10) {
      newErrors.telephone = "Le numéro semble trop court. Exemple : 06 69 39 84 80.";
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "L’adresse email semble incorrecte.";
    }

    if (!form.nombreVitres.trim()) {
      newErrors.nombreVitres = "Veuillez indiquer environ combien de vitres ou vitrines sont à nettoyer.";
    }

    if (!form.adresse.trim()) {
      newErrors.adresse = "Veuillez indiquer l’adresse de l’intervention.";
    }

    if (!form.ville.trim()) {
      newErrors.ville = "Veuillez indiquer la ville.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const sendEmailRequest = async () => {
    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    try {
      setSubmitStatus("sending");

      const formData = new FormData();
      formData.append("nom", form.nom);
      formData.append("telephone", form.telephone);
      formData.append("email", form.email);
      formData.append("typeClient", form.typeClient);
      formData.append("prestation", form.prestation);
      formData.append("nombreVitres", form.nombreVitres);
      formData.append("adresse", form.adresse);
      formData.append("ville", form.ville);
      formData.append("message", form.message);
      formData.append("source", "Mini app QR BS Klyn");

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur");

      setSubmitStatus("success");
      setErrors({});

      setForm({
        nom: "",
        telephone: "",
        email: "",
        typeClient: "Particulier",
        prestation: "Ponctuelle",
        nombreVitres: "",
        adresse: "",
        ville: "Le Havre",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070b] text-[#f5f8ff]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(20,119,255,.35),transparent_28%),radial-gradient(circle_at_top_right,rgba(20,119,255,.20),transparent_22%),linear-gradient(180deg,#04060a_0%,#05070b_100%)]" />

      <section className="relative px-4 pb-7 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md"
        >
          <div className="mb-5 flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-[#0b111d]/80 p-4 backdrop-blur-xl">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#33a4ff]">
                QR BUSINESS CARD
              </p>
              <p className="text-lg font-black">{company.name}</p>
            </div>

            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(18,147,255,.12)]">
              <Droplets className="h-6 w-6 text-[#1293ff]" />
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-gradient-to-b from-[#0b111d]/95 to-[#070c16]/95 p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#31a2ff]/60 px-3 py-2 text-sm font-extrabold text-[#31a2ff]">
              <Sparkles className="h-4 w-4" />
              {company.activity}
            </div>

            <h1 className="text-5xl font-black">{company.name}</h1>

            <p className="mt-4 text-xl font-bold text-[#e9f1ff]">
              {company.tagline}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href={`tel:${company.phone}`}>
                <button className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] text-base font-black text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </button>
              </a>

              <a
                href={`https://wa.me/${company.whatsapp}?text=${devisText}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="flex h-14 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-base font-black text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <main className="mx-auto max-w-md space-y-5 px-4 pb-28">
        {showQr && (
          <section className="rounded-[30px] border border-[#5498ff]/40 bg-gradient-to-b from-[#0b111d]/95 to-[#05080e]/95 p-5 text-center">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">
              Mode prospection
            </p>

            <h2 className="text-3xl font-black">
              Scannez pour demander un devis
            </h2>

            <div className="mx-auto mt-5 w-full max-w-[270px] rounded-[28px] bg-white p-4">
              <img src={qrUrl} alt="QR Code BS Klyn" className="w-full rounded-2xl" />
            </div>

            <button
              onClick={() => setShowQr(false)}
              className="mt-5 flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] text-sm font-black text-white"
            >
              Masquer QR
            </button>
          </section>
        )}

        {!showQr && (
          <button
            onClick={() => setShowQr(true)}
            className="flex w-full items-center justify-center rounded-2xl border border-[#5498ff]/35 bg-white/5 px-4 py-4 text-sm font-black"
          >
            <QrCode className="mr-2 h-4 w-4" />
            Afficher le QR Code
          </button>
        )}

        <div className="grid grid-cols-3 gap-3">
          {[
            { Icon: ShieldCheck, label: "Soin" },
            { Icon: Clock, label: "Rapide" },
            { Icon: Star, label: "Brillant" },
          ].map(({ Icon, label }) => (
            <div
              key={label}
              className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0a111d]/95 to-[#070c16]/95 p-4 text-center"
            >
              <Icon className="mx-auto mb-2 h-6 w-6 text-[#1293ff]" />
              <p className="text-xs font-black">{label}</p>
            </div>
          ))}
        </div>

        <section className="rounded-[28px] border border-[#5498ff]/30 bg-gradient-to-b from-[#08101c]/95 to-[#05080e]/95 p-5">
          <p className="mb-1 text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">
            Devis rapide
          </p>
          <p className="mb-4 text-sm text-[#b8c4d8]">
            Les champs avec * sont obligatoires.
          </p>

          <div className="space-y-4">
            <FormField error={errors.nom}>
              <input className={`input ${errors.nom ? "input-error" : ""}`} placeholder="Nom *" value={form.nom} onChange={(e) => update("nom", e.target.value)} />
            </FormField>

            <FormField error={errors.telephone}>
              <input className={`input ${errors.telephone ? "input-error" : ""}`} placeholder="Téléphone *" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} />
            </FormField>

            <FormField error={errors.email}>
              <input className={`input ${errors.email ? "input-error" : ""}`} placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </FormField>

            <select className="input" value={form.typeClient} onChange={(e) => update("typeClient", e.target.value as FormState["typeClient"])}>
              <option>Particulier</option>
              <option>Commerce / Professionnel</option>
            </select>

            <select className="input" value={form.prestation} onChange={(e) => update("prestation", e.target.value as FormState["prestation"])}>
              <option>Ponctuelle</option>
              <option>Régulière</option>
            </select>

            <FormField error={errors.nombreVitres}>
              <input className={`input ${errors.nombreVitres ? "input-error" : ""}`} placeholder="Combien de vitres / vitrines ? *" value={form.nombreVitres} onChange={(e) => update("nombreVitres", e.target.value)} />
            </FormField>

            <FormField error={errors.adresse}>
              <input className={`input ${errors.adresse ? "input-error" : ""}`} placeholder="Adresse *" value={form.adresse} onChange={(e) => update("adresse", e.target.value)} />
            </FormField>

            <FormField error={errors.ville}>
              <input className={`input ${errors.ville ? "input-error" : ""}`} placeholder="Ville *" value={form.ville} onChange={(e) => update("ville", e.target.value)} />
            </FormField>

            <textarea className="input min-h-32" placeholder="Message" value={form.message} onChange={(e) => update("message", e.target.value)} />

            <button
              type="button"
              onClick={sendEmailRequest}
              disabled={submitStatus === "sending"}
              className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] py-5 text-base font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="mr-2 h-4 w-4" />
              {submitStatus === "sending" ? "Envoi..." : "Envoyer ma demande"}
            </button>

            {submitStatus === "success" && (
              <p className="rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-center text-sm font-bold text-green-200">
                Demande envoyée avec succès ✅
              </p>
            )}

            {submitStatus === "error" && Object.keys(errors).length > 0 && (
              <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-200">
                Merci de corriger les champs indiqués en rouge avant d’envoyer.
              </p>
            )}

            {submitStatus === "error" && Object.keys(errors).length === 0 && (
              <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-200">
                Une erreur est survenue pendant l’envoi. Vous pouvez appeler BS Klyn directement.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-[#5498ff]/25 bg-gradient-to-b from-[#0a111d]/95 to-[#070c16]/95 p-5 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">
            Site internet
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            Voir le site complet BS Klyn
          </h2>

          <a
            href={company.mainSite}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] text-base font-black text-white"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Ouvrir le site BS Klyn
          </a>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0a111d]/95 to-[#070c16]/95 p-5 text-sm font-semibold text-[#b8c4d8]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#1293ff]" />
              {company.city}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#1293ff]" />
              {company.phone}
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#1293ff]" />
              {company.email}
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(84, 152, 255, 0.35);
          background: #08101c;
          padding: 1rem;
          color: white;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input::placeholder {
          color: #8fa5c9;
        }

        .input:focus {
          border-color: #2ca0ff;
          box-shadow: 0 0 0 4px rgba(18, 147, 255, 0.18);
        }

        .input-error {
          border-color: rgba(248, 113, 113, 0.9) !important;
          box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.16) !important;
        }
      `}</style>
    </div>
  );
}

function FormField({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      {children}
      {error && <p className="mt-2 text-sm font-bold text-red-300">{error}</p>}
    </div>
  );
}
