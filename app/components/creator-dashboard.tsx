"use client";

import { useState } from "react";

interface Project {
  id: number;
  title: string;
  brand: string;
  status: "en_cours" | "terminé" | "en_attente";
  amount: string;
  deadline: string;
  type: string;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats: Stat[] = [
    { label: "Revenus du mois", value: "€2,450", change: "+12%", trend: "up" },
    { label: "Projets actifs", value: "8", change: "+2", trend: "up" },
    { label: "Taux de réponse", value: "98%", change: "+3%", trend: "up" },
    { label: "Note moyenne", value: "4.9/5", change: "+0.2", trend: "up" }
  ];

  const recentProjects: Project[] = [
    {
      id: 1,
      title: "Campagne Beauté Yves Rocher",
      brand: "Yves Rocher",
      status: "en_cours",
      amount: "€450",
      deadline: "15 Mars",
      type: "Photo + Vidéo"
    },
    {
      id: 2,
      title: "Collection Mode Printemps",
      brand: "La Redoute",
      status: "terminé",
      amount: "€320",
      deadline: "10 Mars",
      type: "Photo"
    },
    {
      id: 3,
      title: "Promotion Produits Tech",
      brand: "Deezer",
      status: "en_attente",
      amount: "€600",
      deadline: "20 Mars",
      type: "Vidéo"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en_cours":
        return "bg-blue-100 text-blue-800";
      case "terminé":
        return "bg-green-100 text-green-800";
      case "en_attente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "en_cours":
        return "En cours";
      case "terminé":
        return "Terminé";
      case "en_attente":
        return "En attente";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 apple-shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
            Dashboard Créateur
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Bienvenue, Melinda H. • Dernière connexion: il y a 2h
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
            Nouveau Projet
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-gray-600">{stat.label}</span>
              <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                <svg className={`w-3 h-3 mr-1 ${stat.trend === "up" ? "rotate-0" : "rotate-180"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {stat.change}
              </div>
            </div>
            <div className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 md:mb-8">
        {[
          { id: "overview", label: "Vue d'ensemble" },
          { id: "projects", label: "Projets" },
          { id: "analytics", label: "Analytics" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Recent Projects */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Projets Récents</h4>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm md:text-base">{project.title}</h5>
                    <p className="text-gray-600 text-xs md:text-sm">{project.brand} • {project.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 text-sm md:text-base">{project.amount}</div>
                      <div className="text-gray-500 text-xs">Échéance: {project.deadline}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Mettre à jour portfolio", icon: "📸" },
                { label: "Voir les demandes", icon: "📬" },
                { label: "Analytics", icon: "📊" },
                { label: "Paramètres", icon: "⚙️" }
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="text-xs md:text-sm font-medium text-gray-900">{action.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-900">Tous les Projets</h4>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Tous les statuts</option>
              <option>En cours</option>
              <option>Terminé</option>
              <option>En attente</option>
            </select>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 text-sm md:text-base">{project.title}</h5>
                  <p className="text-gray-600 text-xs md:text-sm">{project.brand} • {project.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 text-sm md:text-base">{project.amount}</div>
                    <div className="text-gray-500 text-xs">Échéance: {project.deadline}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-semibold text-gray-900 mb-3">Performance du mois</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Vues du profil</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Demandes reçues</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Projets acceptés</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-semibold text-gray-900 mb-3">Top Spécialités</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Beauté</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mode</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lifestyle</span>
                  <span className="font-medium">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 