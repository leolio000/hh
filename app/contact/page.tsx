"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
    projectType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      title: "Email",
      value: "contact@createurs-ugc-france.com",
      icon: "📧"
    },
    {
      title: "Téléphone",
      value: "+33 1 XX XX XX XX",
      icon: "📞"
    },
    {
      title: "Adresse",
      value: "Paris, France",
      icon: "📍"
    },
    {
      title: "Horaires",
      value: "Lun-Ven 9h-18h",
      icon: "🕒"
    }
  ];

  const faqs = [
    {
      question: "Comment fonctionne votre plateforme ?",
      answer: "Notre plateforme connecte directement les marques aux créateurs UGC vérifiés. Vous pouvez rechercher, filtrer et contacter les créateurs qui correspondent à vos besoins."
    },
    {
      question: "Quels sont vos tarifs ?",
      answer: "Nos tarifs varient selon le type de projet et le créateur choisi. Contactez-nous pour un devis personnalisé basé sur vos besoins spécifiques."
    },
    {
      question: "Combien de temps pour recevoir le contenu ?",
      answer: "La plupart de nos créateurs livrent le contenu en 24-48h. Les délais exacts dépendent de la complexité du projet et de la disponibilité du créateur."
    },
    {
      question: "Comment garantissez-vous la qualité ?",
      answer: "Tous nos créateurs sont soigneusement sélectionnés et testés. Nous vérifions leur engagement, leur authenticité et la qualité de leur contenu avant de les ajouter à notre plateforme."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 md:mb-8">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Prêt à booster vos campagnes avec l&rsquo;UGC ? Notre équipe d&rsquo;experts est là pour vous accompagner
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-6 md:mb-8">
                Parlons de votre projet
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Remplissez le formulaire ci-dessous et notre équipe vous recontactera sous 24h
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-slate-900 mb-2">
                      Budget estimé
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    >
                      <option value="">Sélectionnez un budget</option>
                      <option value="500-1000">500€ - 1000€</option>
                      <option value="1000-3000">1000€ - 3000€</option>
                      <option value="3000-5000">3000€ - 5000€</option>
                      <option value="5000+">5000€+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-slate-900 mb-2">
                    Type de projet
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type de projet</option>
                    <option value="social-media">Réseaux sociaux</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="branding">Branding</option>
                    <option value="product-launch">Lancement de produit</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                    Détails de votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                    placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-semibold text-lg md:text-xl hover:bg-slate-800 transition-colors mobile-btn"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">
                Informations de contact
              </h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-4">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{info.title}</h4>
                      <p className="text-slate-600">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
                <h4 className="text-xl font-semibold text-slate-900 mb-4">
                  Pourquoi nous choisir ?
                </h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Première agence française UGC
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Créateurs vérifiés et testés
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Engagement 5x supérieur
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Support dédié et personnalisé
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Questions fréquentes
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Tout ce que vous devez savoir sur nos services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 