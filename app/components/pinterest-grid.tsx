"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Creator {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  avatar: string;
  photo: string;
  responseTime: string;
  followers?: string;
  engagement?: string;
  gender: string;
  shootingType: string[];
  imageUrl?: string;
}

interface PinterestGridProps {
  creators: Creator[];
  onLoadMore: () => void;
  hasMore: boolean;
}

export default function PinterestGrid({ creators, onLoadMore, hasMore }: PinterestGridProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState<number>(4);
  const gridRef = useRef<HTMLDivElement>(null);

  // Déterminer le nombre de colonnes selon la largeur d'écran
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setColumns(2);
      } else if (width < 640) {
        setColumns(2);
      } else if (width < 768) {
        setColumns(3);
      } else if (width < 1024) {
        setColumns(3);
      } else if (width < 1280) {
        setColumns(4);
      } else if (width < 1440) {
        setColumns(4);
      } else if (width < 1920) {
        setColumns(5);
      } else {
        setColumns(6);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        if (!isLoading && hasMore) {
          setIsLoading(true);
          onLoadMore();
          setTimeout(() => setIsLoading(false), 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, onLoadMore]);

  // Images Pinterest authentiques
  const getPinterestImage = (index: number) => {
    const images = [
      "https://i.pinimg.com/236x/d3/93/f7/d393f792acda93d12b1a405f3ca044fe.jpg",
      "https://i.pinimg.com/236x/91/c6/71/91c6711c92bc16571b44dd48e4542330.jpg", 
      "https://i.pinimg.com/236x/0d/d1/4d/0dd14d05fd18104032538230c3a5a0f3.jpg",
      "https://i.pinimg.com/236x/b6/79/ba/b679bad5f4bb3cea31557a8d9d73242f.jpg",
      "https://i.pinimg.com/236x/dd/c1/dd/ddc1dd1789315a43bf14478bc1fbdefc.jpg",
      "https://i.pinimg.com/236x/f7/ba/64/f7ba64eaf7ca2ef6828a501c5926e94e.jpg",
      "https://i.pinimg.com/236x/1a/2b/3c/1a2b3c4d5e6f7890abcdef1234567890.jpg",
      "https://i.pinimg.com/236x/9f/8e/7d/9f8e7d6c5b4a39281726354849506172.jpg",
      "https://i.pinimg.com/236x/a1/b2/c3/a1b2c3d4e5f6789012345678901234ab.jpg",
      "https://i.pinimg.com/236x/12/34/56/123456789012345678901234567890cd.jpg",
      "https://i.pinimg.com/236x/ab/cd/ef/abcdef1234567890123456789012345e.jpg",
      "https://i.pinimg.com/236x/98/76/54/987654321098765432109876543210fe.jpg"
    ];
    return images[index % images.length];
  };

  // Hauteurs Pinterest plus grandes
  const getPinterestHeight = (index: number) => {
    const heights = [350, 420, 480, 320, 520, 380, 450, 340, 500, 300, 460, 390, 440, 330, 490];
    return heights[index % heights.length];
  };

  // Organiser les créateurs en colonnes pour un vrai masonry
  const organizeInColumns = () => {
    const cols: Creator[][] = Array(columns).fill(null).map(() => []);
    const colHeights = Array(columns).fill(0);
    
    creators.forEach((creator, index) => {
      // Trouver la colonne la plus courte
      const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestColIndex].push(creator);
      // Ajouter la hauteur estimée de cette carte
      colHeights[shortestColIndex] += getPinterestHeight(index) + 20; // +20 pour le gap
    });
    
    return cols;
  };

  const columnData = organizeInColumns();

  return (
    <div className="w-full max-w-full overflow-hidden" ref={gridRef}>
      {/* Container principal avec padding responsive */}
      <div className="pinterest-container">
        {/* Vrai masonry avec colonnes */}
        <div className="pinterest-masonry">
          {columnData.map((columnCreators, colIndex) => (
            <div key={colIndex} className="pinterest-column">
              {columnCreators.map((creator) => {
                const globalIndex = creators.indexOf(creator);
                return (
                  <div
                    key={creator.id}
                    className="pinterest-item"
                    style={{ marginBottom: '20px' }}
                  >
                    <Link 
                      href={`/creators/${creator.id}`}
                      className="pinterest-link"
                    >
                      <div className="pinterest-card">
                        <div className="pinterest-image-container">
                          <Image 
                            alt={`Modèle ${creator.name}`}
                            src={getPinterestImage(globalIndex)}
                            width={300}
                            height={getPinterestHeight(globalIndex)}
                            className="pinterest-image"
                            style={{ height: `${getPinterestHeight(globalIndex)}px` }}
                            loading="lazy"
                          />
                          {/* Overlay subtil au hover */}
                          <div className="pinterest-overlay"></div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Load More Section */}
      <div className="text-center py-12">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        ) : hasMore ? (
          <button 
            onClick={() => {
              setIsLoading(true);
              onLoadMore();
              setTimeout(() => setIsLoading(false), 1000);
            }}
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-200 hover:scale-105"
          >
            Voir plus
          </button>
        ) : (
          <div className="text-gray-500">
            <p className="text-base">Fin des résultats</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .pinterest-container {
          padding: 0 8px;
          max-width: 100%;
          margin: 0 auto;
        }

                 .pinterest-masonry {
           display: flex;
           gap: 20px;
           width: 100%;
           max-width: 100%;
         }
         
         .pinterest-column {
           flex: 1;
           display: flex;
           flex-direction: column;
         }

        .pinterest-item {
          width: 100%;
          max-width: 100%;
          break-inside: avoid;
          overflow: hidden;
        }

        .pinterest-link {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }

        .pinterest-card {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
          position: relative;
        }

        .pinterest-card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .pinterest-image-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .pinterest-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .pinterest-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.2s ease;
        }

        .pinterest-card:hover .pinterest-overlay {
          background: rgba(0, 0, 0, 0.1);
        }

        .pinterest-card:hover .pinterest-image {
          transform: scale(1.05);
        }

        /* Responsive breakpoints optimisés */
        
                 /* Mobile Portrait (320px - 480px) */
         @media (max-width: 480px) {
           .pinterest-container {
             padding: 0 8px;
           }
           .pinterest-masonry {
             gap: 12px;
           }
         }

         /* Mobile Landscape (481px - 640px) */
         @media (min-width: 481px) and (max-width: 640px) {
           .pinterest-container {
             padding: 0 10px;
           }
           .pinterest-masonry {
             gap: 14px;
           }
         }

         /* Tablet Portrait (641px - 768px) */
         @media (min-width: 641px) and (max-width: 768px) {
           .pinterest-container {
             padding: 0 12px;
           }
           .pinterest-masonry {
             gap: 16px;
           }
         }

         /* Tablet Landscape (769px - 1024px) */
         @media (min-width: 769px) and (max-width: 1024px) {
           .pinterest-container {
             padding: 0 16px;
             max-width: 1000px;
           }
           .pinterest-masonry {
             gap: 18px;
           }
         }

         /* Desktop Small (1025px - 1280px) */
         @media (min-width: 1025px) and (max-width: 1280px) {
           .pinterest-container {
             padding: 0 20px;
             max-width: 1200px;
           }
           .pinterest-masonry {
             gap: 20px;
           }
         }

         /* Desktop Medium (1281px - 1440px) */
         @media (min-width: 1281px) and (max-width: 1440px) {
           .pinterest-container {
             padding: 0 24px;
             max-width: 1400px;
           }
           .pinterest-masonry {
             gap: 24px;
           }
         }

         /* Desktop Large (1441px - 1920px) */
         @media (min-width: 1441px) and (max-width: 1920px) {
           .pinterest-container {
             padding: 0 32px;
             max-width: 1600px;
           }
           .pinterest-masonry {
             gap: 26px;
           }
         }

         /* Desktop XL (1921px+) */
         @media (min-width: 1921px) {
           .pinterest-container {
             padding: 0 40px;
             max-width: 1800px;
           }
           .pinterest-masonry {
             gap: 28px;
           }
         }

        /* Prévention overflow sur tous les appareils */
        * {
          box-sizing: border-box;
        }
        
        .pinterest-container,
        .pinterest-grid,
        .pinterest-item,
        .pinterest-card {
          max-width: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 