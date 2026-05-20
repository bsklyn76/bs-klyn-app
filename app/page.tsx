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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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
    tagline: "Des vitres propres, nettes et brillantes au Havre et alentours.",
    phone: "0669398480",
    email: "bsklyn76@gmail.com",
    website: "https://bsklyn.netlify.app/",
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
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files).slice(0, 5);
    setPhotos(selected);
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const sendEmailRequest = async () => {
    if (!form.nom || !form.telephone || !form.nombreVitres || !form.adresse) {
      setSubmitStatus("error");
      return;
    }

    try {
      setSubmitStatus("sending");

      const formData = new FormData();
      formData.append("entreprise", company.name);
      formData.append("nom", form.nom);
      formData.append("telephone", form.telephone);
      formData.append("email", form.email);
      formData.append("client", form.typeClient);
      formData.append("prestation", form.prestation);
      formData.append("nombre_de_vitres_ou_vitrines", form.nombreVitres);
      formData.append("adresse", form.adresse);
      formData.append("ville", form.ville);
      formData.append("message", form.message);
      formData.append("source", "Mini-app QR BS Klyn");

      photos.forEach((photo, index) => {
        formData.append(`photo_${index + 1}`, photo);
      });

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur formulaire");

      setSubmitStatus("success");
      setPhotos([]);
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
          <div className="mb-5 flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-[#0b111d]/80 p-4 shadow-[0_0_0_1px_rgba(83,154,255,.25),0_0_24px_rgba(18,147,255,.18)] backdrop-blur-xl">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#33a4ff]">QR Business Card</p>
              <p className="text-lg font-black leading-tight">{company.name}</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(18,147,255,.12)] shadow-[0_0_0_1px_rgba(83,154,255,.35),0_0_24px_rgba(18,147,255,.2)]">
              <Droplets className="h-6 w-6 text-[#1293ff]" />
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-gradient-to-b from-[#0b111d]/95 to-[#070c16]/95 p-6 shadow-[0_0_0_1px_rgba(83,154,255,.35),0_0_30px_rgba(18,147,255,.23)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#31a2ff]/60 px-3 py-2 text-sm font-extrabold text-[#31a2ff]">
              <Sparkles className="h-4 w-4" /> {company.activity}
            </div>
            <h1 className="text-5xl font-black leading-[0.94] tracking-[-0.04em]">{company.name}</h1>
            <p className="mt-4 text-xl font-bold leading-snug text-[#e9f1ff]">{company.tagline}</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href={`tel:${company.phone}`}>
                <button className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] text-base font-black text-white shadow-[0_0_0_1px_rgba(83,154,255,.35),0_0_24px_rgba(18,147,255,.25)] transition hover:scale-[1.02]">
                  <Phone className="mr-2 h-4 w-4" /> Appeler
                </button>
              </a>
              <a href={`https://wa.me/${company.whatsapp}?text=${devisText}`} target="_blank" rel="noreferrer">
                <button className="flex h-14 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-base font-black text-white transition hover:bg-white/10">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <main className="mx-auto max-w-md space-y-5 px-4 pb-28">
        {showQr && (
          <section className="rounded-[30px] border border-[#5498ff]/40 bg-gradient-to-b from-[#0b111d]/95 to-[#05080e]/95 p-5 text-center shadow-[0_0_0_1px_rgba(83,154,255,.40),0_0_34px_rgba(18,147,255,.24)]">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">Mode prospection</p>
            <h2 className="text-3xl font-black tracking-[-0.03em]">Scannez pour demander un devis</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-snug text-[#b8c4d8]">Présente ce QR Code depuis ton iPhone. Le client arrive directement sur la page BS Klyn.</p>
            <div className="mx-auto mt-5 w-full max-w-[270px] rounded-[28px] border border-[#5498ff]/40 bg-white p-4 shadow-[0_0_32px_rgba(18,147,255,.28)]">
              <img src={qrUrl} alt="QR Code BS Klyn" className="h-full w-full rounded-2xl" />
            </div>
            <button onClick={() => setShowQr(false)} className="mt-5 flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] text-sm font-black text-white">
              Masquer QR
            </button>
          </section>
        )}

        {!showQr && (
          <button onClick={() => setShowQr(true)} className="flex w-full items-center justify-center rounded-2xl border border-[#5498ff]/35 bg-white/5 px-4 py-4 text-sm font-black text-[#eaf3ff] shadow-[0_0_0_1px_rgba(83,154,255,.20),0_0_18px_rgba(18,147,255,.12)]">
            <QrCode className="mr-2 h-4 w-4" /> Afficher le QR Code
          </button>
        )}

        <div className="grid grid-cols-3 gap-3">
          {[
            [ShieldCheck, "Soin"],
            [Clock, "Rapide"],
            [Star, "Brillant"],
          ].map(([Icon, label]) => {
            const IconComponent = Icon as typeof ShieldCheck;
            return (
              <div key={String(label)} className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0a111d]/95 to-[#070c16]/95 p-4 text-center shadow-[0_0_0_1px_rgba(83,154,255,.25),0_0_20px_rgba(18,147,255,.14)]">
                <IconComponent className="mx-auto mb-2 h-6 w-6 text-[#1293ff]" />
                <p className="text-xs font-black text-[#eaf3ff]">{String(label)}</p>
              </div>
            );
          })}
        </div>

        <section className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0a111d]/95 to-[#070c16]/95 p-5 shadow-[0_0_0_1px_rgba(83,154,255,.35),0_0_24px_rgba(18,147,255,.18)]">
          <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">Prestations</p>
          <h2 className="text-3xl font-black tracking-[-0.03em]">Vitres propres, image pro.</h2>
          <div className="mt-4 space-y-3">
            {[
              [Home, "Maisons & appartements", "Vitres, baies vitrées, miroirs et accès courants."],
              [Building2, "Commerces & bureaux", "Vitrines, locaux professionnels, entretien régulier."],
              [Sparkles, "Remise en état", "Après travaux, traces tenaces, nettoyage ponctuel."],
            ].map(([Icon, title, text]) => {
              const IconComponent = Icon as typeof Home;
              return (
                <div key={String(title)} className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[rgba(18,147,255,.12)] shadow-[0_0_0_1px_rgba(83,154,255,.30),0_0_18px_rgba(18,147,255,.14)]">
                    <IconComponent className="h-5 w-5 text-[#1293ff]" />
                  </div>
                  <div>
                    <p className="font-black text-[#f5f8ff]">{String(title)}</p>
                    <p className="text-sm leading-snug text-[#b8c4d8]">{String(text)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] border border-[#5498ff]/30 bg-gradient-to-b from-[#08101c]/95 to-[#05080e]/95 p-5 shadow-[0_0_0_1px_rgba(83,154,255,.35),0_0_28px_rgba(18,147,255,.2)]">
          <div className="mb-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#31a2ff]">Devis rapide ✨</p>
            <p className="mt-2 text-sm text-[#b8c4d8]">Réponse sous 24h · Gratuit & sans engagement</p>
          </div>

          <div className="space-y-4">
            <Field label="Nom complet *" icon={<User className="h-5 w-5" />}>
              <input className="form-input" placeholder="Votre nom complet" value={form.nom} onChange={(e) => update("nom", e.target.value)} />
            </Field>

            <Field label="Téléphone *" icon={<Phone className="h-5 w-5" />}>
              <input className="form-input" placeholder="Votre numéro" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} />
            </Field>

            <Field label="Email" icon={<Mail className="h-5 w-5" />}>
              <input className="form-input" placeholder="Votre email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </Field>

            <div>
              <p className="mb-2 font-bold text-white">Vous êtes ? *</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ChoiceCard active={form.typeClient === "Particulier"} icon={<Home className="h-5 w-5" />} title="Particulier" onClick={() => update("typeClient", "Particulier")} />
                <ChoiceCard active={form.typeClient === "Commerce / Professionnel"} icon={<Store className="h-5 w-5" />} title="Commerce / Pro" onClick={() => update("typeClient", "Commerce / Professionnel")} />
              </div>
            </div>

            <Field label="Combien de vitres / vitrines à nettoyer ? *" icon={<Hash className="h-5 w-5" />}>
              <input className="form-input" placeholder="Ex : 10, 25, 50..." value={form.nombreVitres} onChange={(e) => update("nombreVitres", e.target.value)} />
            </Field>

            <div>
              <p className="mb-2 font-bold text-white">Type de prestation *</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ChoiceCard active={form.prestation === "Ponctuelle"} icon={<CalendarDays className="h-5 w-5" />} title="Ponctuelle" subtitle="Intervention unique" onClick={() => update("prestation", "Ponctuelle")} />
                <ChoiceCard active={form.prestation === "Régulière"} icon={<Repeat2 className="h-5 w-5" />} title="Régulière" subtitle="Interventions récurrentes" onClick={() => update("prestation", "Régulière")} />
              </div>
            </div>

            <Field label="Adresse du lieu *" icon={<MapPin className="h-5 w-5" />}>
              <input className="form-input" placeholder="Adresse complète de l’intervention" value={form.adresse} onChange={(e) => update("adresse", e.target.value)} />
            </Field>

            <Field label="Ville" icon={<MapPin className="h-5 w-5" />}>
              <input className="form-input" placeholder="Ville" value={form.ville} onChange={(e) => update("ville", e.target.value)} />
            </Field>

            <div>
              <div className="mb-2 flex items-end justify-between gap-3">
                <div>
                  <p className="font-bold text-white">Photos (optionnel)</p>
                  <p className="text-sm text-[#b8c4d8]">Ajoutez des photos pour un devis plus précis</p>
                </div>
                <span className="rounded-xl border border-[#5498ff]/35 bg-white/5 px-3 py-1 text-sm font-black text-white">{photos.length}/5</span>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handlePhotos(e.target.files)} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full items-center justify-center gap-4 rounded-2xl border border-dashed border-[#8fa5c9]/60 bg-white/[0.02] px-4 py-6 text-left transition hover:border-[#1293ff] hover:bg-white/[0.04]">
                <UploadCloud className="h-9 w-9 text-[#b8c4d8]" />
                <span>
                  <span className="block text-lg font-bold text-[#eaf3ff]">Cliquez pour ajouter des photos</span>
                  <span className="block text-sm text-[#b8c4d8]">JPG, PNG · jusqu’à 5 photos</span>
                </span>
              </button>

              {photos.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {photos.map((photo) => (
                    <p key={photo.name} className="truncate rounded-xl border border-[#5498ff]/25 bg-white/5 px-3 py-2 text-xs text-[#b8c4d8]">{photo.name}</p>
                  ))}
                </div>
              )}
            </div>

            <Field label="Message complémentaire (optionnel)" icon={<Pencil className="h-5 w-5" />}>
              <textarea className="form-input min-h-28 resize-y" placeholder="Précisez vos besoins, contraintes, accès..." value={form.message} onChange={(e) => update("message", e.target.value)} />
            </Field>

            <div className="grid grid-cols-1 gap-3">
              <button type="button" onClick={sendEmailRequest} disabled={submitStatus === "sending"} className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] py-5 text-base font-black text-white shadow-[0_0_0_1px_rgba(83,154,255,.35),0_0_24px_rgba(18,147,255,.25)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60">
                <Send className="mr-2 h-5 w-5" /> {submitStatus === "sending" ? "Envoi en cours..." : "Envoyer ma demande de devis"}
              </button>
              <a href={`https://wa.me/${company.whatsapp}?text=${devisText}`} target="_blank" rel="noreferrer">
                <button className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#2ee86f] to-[#13a84d] py-4 text-sm font-black text-white shadow-[0_10px_28px_rgba(0,0,0,.35)] transition hover:scale-[1.02]">
                  <MessageCircle className="mr-2 h-4 w-4" /> Envoyer aussi par WhatsApp
                </button>
              </a>
            </div>

            {submitStatus === "success" && (
              <p className="flex items-center justify-center gap-2 rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-center text-sm font-bold text-green-200">
                <Check className="h-4 w-4" /> Votre demande a été envoyée. Réponse garantie sous 24h !
              </p>
            )}

            {submitStatus === "error" && (
              <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-200">
                Merci de remplir au minimum : nom, téléphone, nombre de vitres et adresse.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0a111d]/95 to-[#070c16]/95 p-5 text-sm font-semibold text-[#b8c4d8] shadow-[0_0_0_1px_rgba(83,154,255,.25),0_0_20px_rgba(18,147,255,.14)]">
          <div className="space-y-3">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#1293ff]" /> {company.city}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#1293ff]" /> {company.phone}</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#1293ff]" /> {company.email}</div>
            <a className="flex items-center gap-2 text-[#31a2ff]" href={company.website} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> Site web BS Klyn
            </a>
          </div>
        </section>
      </main>

      <div className="fixed bottom-3 left-3 right-3 z-50 mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={`tel:${company.phone}`} className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#1b8eff] to-[#005ae7] text-base font-black text-white shadow-[0_10px_28px_rgba(0,0,0,.35),0_0_24px_rgba(18,147,255,.25)]">
          <Phone className="mr-2 h-4 w-4" /> Appeler
        </a>
        <a href={`https://wa.me/${company.whatsapp}?text=${devisText}`} target="_blank" rel="noreferrer" className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#2ee86f] to-[#13a84d] text-base font-black text-white shadow-[0_10px_28px_rgba(0,0,0,.35)]">
          <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
        </a>
      </div>

      <style jsx global>{`
        .form-input {
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(84, 152, 255, 0.35);
          background: #08101c;
          padding: 14px 16px 14px 52px;
          color: white;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .form-input::placeholder {
          color: #8fa5c9;
        }
        .form-input:focus {
          border-color: #2ca0ff;
          box-shadow: 0 0 0 4px rgba(18, 147, 255, 0.18);
        }
      `}</style>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-white">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#b8c4d8]">{icon}</span>
        {children}
      </span>
    </label>
  );
}

function ChoiceCard({ active, icon, title, subtitle, onClick }: { active: boolean; icon: React.ReactNode; title: string; subtitle?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[76px] items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-[#1293ff] bg-[#0b2a54]/70 shadow-[0_0_0_1px_rgba(18,147,255,.35),0_0_22px_rgba(18,147,255,.18)]"
          : "border-[#5498ff]/30 bg-white/[0.03] hover:border-[#1293ff]/70"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className={active ? "text-[#1293ff]" : "text-[#b8c4d8]"}>{icon}</span>
        <span>
          <span className="block font-black text-white">{title}</span>
          {subtitle && <span className="block text-sm text-[#8fa5c9]">{subtitle}</span>}
        </span>
      </span>
      <span className={`grid h-6 w-6 place-items-center rounded-full border ${active ? "border-[#1293ff] bg-[#1293ff]" : "border-[#8fa5c9]/60"}`}>
        {active && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}
