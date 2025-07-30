"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Vues du profil", value: "2,847", change: "+12%", color: "text-blue-600" },
    { label: "Demandes reçues", value: "23", change: "+5", color: "text-green-600" },
    { label: "Projets actifs", value: "4", change: "+1", color: "text-purple-600" },
    { label: "Revenus ce mois", value: "€1,240", change: "+18%", color: "text-green-600" },
  ];

  const recentProjects = [
    { id: 1, brand: "Yves Rocher", type: "Beauté", amount: "€450", deadline: "2024-08-15", status: "En cours" },
    { id: 2, brand: "La Redoute", type: "Mode", amount: "€320", deadline: "2024-07-30", status: "Terminé" },
    { id: 3, brand: "Deezer", type: "Tech", amount: "€600", deadline: "2024-09-01", status: "En attente" },
  ];

  const portfolioItems = [
    { id: 1, title: "Collection Beauté", type: "video", thumbnail: "🎥", views: "1.2K" },
    { id: 2, title: "Mode Lifestyle", type: "image", thumbnail: "📸", views: "856" },
    { id: 3, title: "Tech Review", type: "video", thumbnail: "🎥", views: "2.1K" },
    { id: 4, title: "Fitness Challenge", type: "video", thumbnail: "🎥", views: "1.5K" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Dashboard</h1>
              <p className="text-slate-600">Gérez votre profil et vos projets</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                </svg>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-semibold ${stat.color}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Vue d'ensemble" },
                { id: "portfolio", label: "Portfolio" },
                { id: "projects", label: "Projets" },
                { id: "earnings", label: "Revenus" },
                { id: "settings", label: "Paramètres" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Projets Récents</h3>
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{project.brand} - {project.type}</p>
                          <p className="text-sm text-slate-600">Montant: {project.amount} | Échéance: {project.deadline}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === "En cours" ? "bg-blue-100 text-blue-700" :
                          project.status === "Terminé" ? "bg-green-100 text-green-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Actions Rapides</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <span className="text-2xl mb-2">📸</span>
                      <span className="text-sm text-slate-700 text-center">Ajouter du contenu</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <span className="text-2xl mb-2">✉️</span>
                      <span className="text-sm text-slate-700 text-center">Voir les demandes</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <span className="text-2xl mb-2">📈</span>
                      <span className="text-sm text-slate-700 text-center">Analytics</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <span className="text-2xl mb-2">⚙️</span>
                      <span className="text-sm text-slate-700 text-center">Paramètres</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Mon Portfolio</h3>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                    + Ajouter du contenu
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-lg p-4">
                      <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-4xl">{item.thumbnail}</span>
                      </div>
                      <h4 className="font-medium text-slate-900 mb-2">{item.title}</h4>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>{item.type === "video" ? "Vidéo" : "Image"}</span>
                        <span>{item.views} vues</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Tous mes Projets</h3>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{project.brand} - {project.type}</p>
                        <p className="text-sm text-slate-600">Montant: {project.amount} | Échéance: {project.deadline}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "En cours" ? "bg-blue-100 text-blue-700" :
                        project.status === "Terminé" ? "bg-green-100 text-green-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "earnings" && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Mes Revenus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-lg p-6 text-center">
                    <p className="text-sm text-slate-600 mb-2">Ce mois-ci</p>
                    <p className="text-3xl font-bold text-slate-900">€1,240</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-6 text-center">
                    <p className="text-sm text-slate-600 mb-2">Ce trimestre</p>
                    <p className="text-3xl font-bold text-slate-900">€3,850</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-6 text-center">
                    <p className="text-sm text-slate-600 mb-2">Cette année</p>
                    <p className="text-3xl font-bold text-slate-900">€12,400</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Paramètres du Profil</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                    <textarea rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"></textarea>
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
