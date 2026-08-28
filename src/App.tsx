import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { Star, MapPin, ArrowLeft, ChevronRight, Compass } from 'lucide-react';
import { locations, featuredFood, FoodItem } from './data';
import LocationDetailView from './LocationDetailView';

// --- Components ---

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : star - rating <= 0.5
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating}</span>
    </div>
  );
};

type FoodCardProps = {
  place: FoodItem;
  theme: 'clean' | 'elegant' | 'vibrant';
  onOpen?: (p: FoodItem) => void;
};

const FoodCard: React.FC<FoodCardProps> = ({ place, theme, onOpen }) => {
  const themeStyles = {
    clean: {
      card: 'bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden',
      title: 'font-sans font-bold text-xl text-gray-900',
      note: 'bg-blue-50 border-l-4 border-blue-400 p-4 mt-4',
      noteText: 'font-handwriting text-xl text-blue-800',
      highlightIcon: 'text-blue-500',
    },
    elegant: {
      card: 'bg-stone-50 border border-stone-200 shadow-md hover:shadow-lg transition-shadow rounded-none',
      title: 'font-serif font-bold text-2xl text-stone-800',
      note: 'bg-stone-100 p-4 mt-4 relative shadow-inner',
      noteText: 'font-serif italic text-stone-600',
      highlightIcon: 'text-stone-700',
    },
    vibrant: {
      card: 'bg-white border-2 border-orange-100 shadow-[8px_8px_0px_0px_rgba(251,146,60,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(251,146,60,0.2)] transition-all rounded-xl overflow-hidden',
      title: 'font-sans font-black text-2xl text-orange-600 uppercase tracking-tight',
      note: 'bg-yellow-100 p-4 mt-4 transform -rotate-1 shadow-sm',
      noteText: 'font-handwriting text-2xl text-orange-800',
      highlightIcon: 'text-orange-500',
    }
  };

  const style = themeStyles[theme];

  return (
    <div className={`${style.card} cursor-pointer`} onClick={() => onOpen?.(place)}>
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className={style.title}>{place.name}</h3>
        </div>
        <div className="mb-4">
          <StarRating rating={place.rating} />
        </div>
        
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu Highlights</h4>
          <ul className="space-y-2">
            {place.highlights.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center text-gray-700">
                <span className={`mr-2 ${style.highlightIcon}`}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={style.note}>
          <p className={style.noteText}>"{place.note}"</p>
        </div>
      </div>
    </div>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-orange-200 selection:text-orange-900 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-orange-600 transition-colors">
                T
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
                Taste of Jiang'an
              </span>
            </Link>
            <nav className="hidden md:flex space-x-4 lg:space-x-6 overflow-x-auto">
              {Object.values(locations).map(loc => (
                <Link key={loc.id} to={`/location/${loc.id}`} className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors whitespace-nowrap">
                  {loc.shortName}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-12 text-center mt-auto">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
          T
        </div>
        <p className="text-gray-400">© 2026 Taste of Jiang'an. Built for the students.</p>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
          Discover the Flavors of <br/><span className="text-orange-500 italic">Campus Life</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
          Your ultimate guide to eating well at Sichuan University's Jiang'an campus. Explore canteens, gates, and hidden gems.
        </p>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Compass className="mr-3 text-orange-500" /> Campus Food Map
          </h2>
        </div>
        <div className="relative w-full aspect-[4/3] md:aspect-[2/1] bg-[#eef5f0] rounded-3xl overflow-hidden border border-green-100 shadow-inner">
          {/* Abstract roads/rivers */}
          <svg className="absolute inset-0 w-full h-full text-green-200/50" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M 0 50 Q 25 40 50 60 T 100 50" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M 30 0 Q 40 50 35 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 70 0 Q 60 50 65 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Pins */}
          {Object.values(locations).map(loc => (
            <Link
              key={loc.id}
              to={`/location/${loc.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ top: loc.mapCoordinates.top, left: loc.mapCoordinates.left }}
            >
              <div className="relative flex flex-col items-center">
                <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-gray-800 mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {loc.name}
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-orange-600 transition-transform z-0">
                  <MapPin size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Food Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFood.map(item => (
            <Link to={`/location/${item.locationId}`} key={item.id} className="block group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-sm text-orange-500 font-medium mt-1">{item.locationName}</p>
                  <div className="mt-auto pt-4">
                    <StarRating rating={item.rating} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Locations Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-50 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore All Locations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(locations).map(loc => (
            <Link key={loc.id} to={`/location/${loc.id}`} className="relative h-48 rounded-2xl overflow-hidden group">
              <img src={loc.coverImage} alt={loc.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl drop-shadow-md">{loc.name}</h3>
                  <p className="text-white/80 text-sm mt-1 line-clamp-1">{loc.description}</p>
                </div>
                <ChevronRight className="text-white/0 group-hover:text-white/100 transition-all transform translate-x-4 group-hover:translate-x-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function LocationDetail() {
  const { id } = useParams();
  const location = locations[id || ''];
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [selectedComments, setSelectedComments] = useState<Array<{name:string,text:string,created:number}>>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (selected) {
      const stored = localStorage.getItem(`comments:${selected.id}`);
      setSelectedComments(stored ? JSON.parse(stored) : []);
    }
  }, [selected]);



  if (!location) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Location not found</h2>
        <Link to="/" className="text-orange-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    const c = { name: commentName || 'Anonymous', text: commentText, created: Date.now() };
    const updated = [c, ...selectedComments];
    localStorage.setItem(`comments:${selected.id}`, JSON.stringify(updated));
    setSelectedComments(updated);
    setCommentName('');
    setCommentText('');
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[350px] w-full">
        <img src={location.coverImage} alt={location.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 w-fit transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={18} className="mr-2" /> Back to Map
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{location.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{location.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What to Eat Here</h2>
          <div className="w-20 h-1 bg-orange-500 mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {location.items.map(item => (
            <FoodCard key={item.id} place={item} theme={location.theme} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto z-10">
            <div className="flex gap-6 p-6 flex-col md:flex-row">
              <div className="md:w-1/2 w-full space-y-2">
                {(selected.images ?? [selected.image]).map((img, idx) => (
                  <img key={idx} src={img} alt={`${selected.name}-${idx}`} className="w-full h-56 object-contain rounded-md bg-gray-100 p-2" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div className="md:w-1/2 w-full">
                <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
                <StarRating rating={selected.rating} />
                <p className="mt-4 text-gray-700">{selected.note}</p>
                <h4 className="mt-4 font-semibold">Highlights</h4>
                <ul className="list-disc ml-5">
                  {selected.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>

                <div className="mt-6">
                  <h4 className="font-semibold text-lg">Comments</h4>
                  <div className="space-y-3 mt-3">
                    {selectedComments.length === 0 ? <p className="text-sm text-gray-500">No comments yet</p> : selectedComments.map((c, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm font-medium">{c.name} <span className="text-xs text-gray-400 ml-2">{new Date(c.created).toLocaleString()}</span></div>
                        <div className="text-gray-700 mt-1">{c.text}</div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={submitComment} className="mt-4">
                    <input value={commentName} onChange={e => setCommentName(e.target.value)} placeholder="Your name" className="w-full mb-2 p-2 border rounded" />
                    <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Write a comment" className="w-full p-2 border rounded mb-2" />
                    <div className="flex justify-end">
                      <button type="button" onClick={() => setSelected(null)} className="mr-2 px-4 py-2 border rounded">Close</button>
                      <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">Post Comment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location/:id" element={<LocationDetailView />} />
        </Routes>
      </Layout>
    </Router>
  );
}
