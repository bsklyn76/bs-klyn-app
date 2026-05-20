"use client";

import React, { useMemo, useRef, useState } from "react";
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
  Building2,
  Home,
  Star,
  Droplets,
  ExternalLink,
  QrCode,
  User,
  Store,
  Hash,
  CalendarDays,
  Repeat2,
  UploadCloud,
  Pencil,
  Check,
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

export default function Page() {
  const [showQr, setShowQr] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    tagline:
      "Des vitres propres, nettes et brillantes au Havre et alentours.",
    phone: "0669398480",
    email: "bsklyn76@gmail.com",
    website: "https://bs-klyn-app.vercel.app/",
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

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;

    const selected = Array.from(files).slice(0, 5);
    setPhotos(selected);
  };

  const sendEmailRequest = async () => {
    if (
      !form.nom ||
      !form.telephone ||
      !form.nombreVitres ||
      !form.adresse
    ) {
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

      photos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo);
      });

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur");
      }

      setSubmitStatus("success");

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

      setPhotos([]);
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
          <div className="mb-5 flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-[#0b111d]/80 p-4 shadow-[0_0_0_1px_rgba(83,154,255,.25),0_0_24px_rgba(18,147,255,.18)] backdrop-blur-xl">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#33a4ff]">
                QR BUSINESS CARD
              </p>

              <p className="text-lg font-black">
                BS Klyn
              </p>
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

            <h1 className="text-5xl font-black">
              BS Klyn
            </h1>

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

        {/* QR CODE */}
        {showQr && (
          <section className="rounded-[30px] border border-[#5498ff]/40 bg-gradient-to-b from-[#0b111d]/95 to-[#05080e]/95 p-5 text-center">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">
              Mode prospection
            </p>

            <h2 className="text-3xl font-black">
              Scannez pour demander un devis
            </h2>

            <div className="mx-auto mt-5 w-full max-w-[270px] rounded-[28px] bg-white p-4">
              <img
                src={qrUrl}
                alt="QR Code BS Klyn"
                className="w-full rounded-2xl"
              />
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

        {/* FORMULAIRE */}
        <section className="rounded-[28px] border border-[#5498ff]/30 bg-gradient-to-b from-[#08101c]/95 to-[#05080e]/95 p-5">

          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">
            Devis rapide
          </p>

          <div className="space-y-4">

            <input
              className="w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              placeholder="Nom"
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
            />

            <input
              className="w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              placeholder="Téléphone"
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
            />

            <input
              className="w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              placeholder="Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />

            <select
              className="w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              value={form.typeClient}
              onChange={(e) =>
                update(
                  "typeClient",
                  e.target.value as FormState["typeClient"]
                )
              }
            >
              <option>Particulier</option>
              <option>Commerce / Professionnel</option>
            </select>

            <select
              className="w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              value={form.prestation}
              onChange={(e) =>
                update(
                  "prestation",
                  e.target.value as FormState["prestation"]
                )
              }
            >
              <option>Ponctuelle</option>
              <option>Régulière</option>
            </select>

            <input
              className="w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              placeholder="Combien de vitres / vitrines ?"
              value={form.nombreVitres}
              onChange={(e) => update("nombreVitres", e.target.value)}
            />

            <input
              className="w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              placeholder="Adresse"
              value={form.adresse}
              onChange={(e) => update("adresse", e.target.value)}
            />

            <textarea
              className="min-h-32 w-full rounded-2xl border border-[#5498ff]/35 bg-[#08101c] px-4 py-4 text-white"
              placeholder="Message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />

            {/* PHOTOS */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhotos(e.target.files)}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center rounded-2xl border border-dashed border-[#5498ff]/40 bg-white/[0.03] px-4 py-5 text-sm font-bold text-[#b8c4d8]"
            >
              <UploadCloud className="mr-2 h-5 w-5" />
              Ajouter des photos
            </button>

            {/* ENVOI */}
            <button
              type="button"
              onClick={sendEmailRequest}
              disabled={submitStatus === "sending"}
              className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] py-5 text-base font-black text-white"
            >
              <Send className="mr-2 h-4 w-4" />

              {submitStatus === "sending"
                ? "Envoi..."
                : "Envoyer ma demande"}
            </button>

            {submitStatus === "success" && (
              <p className="rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-center text-sm font-bold text-green-200">
                Demande envoyée avec succès ✅
              </p>
            )}

            {submitStatus === "error" && (
              <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-200">
                Merci de remplir les champs obligatoires.
              </p>
            )}
          </div>
        </section>

        {/* CONTACT */}
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

            <a
              className="flex items-center gap-2 text-[#31a2ff]"
              href={company.website}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Site web BS Klyn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}