import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart3, Camera, ChevronRight, Menu, Star, Store, X } from 'lucide-react';
import { locations, featuredFood } from './data';
import LocationDetailView from './LocationDetailView';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center space-x-1">
    <span className="ml-2 text-sm font-medium text-gray-600">{rating}</span>
  </div>
);

const FoodCard = ({ place, theme, onOpen }: any) => {
  const themeStyles: any = {
    clean: { card: 'bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden', title: 'font-sans font-bold text-xl text-gray-900', highlightIcon: 'text-blue-500', note: 'bg-blue-50 border-l-4 border-blue-400 p-4 mt-4', noteText: 'font-handwriting text-xl text-blue-800' },
    elegant: { card: 'bg-stone-50 border border-stone-200 shadow-md hover:shadow-lg transition-shadow rounded-none', title: 'font-serif font-bold text-2xl text-stone-800', highlightIcon: 'text-stone-700', note: 'bg-stone-100 p-4 mt-4 relative shadow-inner', noteText: 'font-serif italic text-stone-600' },
    vibrant: { card: 'bg-white border-2 border-orange-100 shadow-[8px_8px_0px_0px_rgba(251,146,60,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(251,146,60,0.2)] transition-all rounded-xl overflow-hidden', title: 'font-sans font-black text-2xl text-orange-600 uppercase tracking-tight', highlightIcon: 'text-orange-500', note: 'bg-yellow-100 p-4 mt-4 transform -rotate-1 shadow-sm', noteText: 'font-handwriting text-2xl text-orange-800' }
  };
  const style = themeStyles[theme] || themeStyles.clean;
  return (
    <div className={`${style.card} cursor-pointer`} onClick={() => onOpen?.(place)}>
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img src={place.image} alt={place.name} className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-105" referrerPolicy="no-referrer" />
      </div>
      <div className="p-6">
        <h3 className={style.title}>{place.name}</h3>
        <div className="mb-4"><StarRating rating={place.rating} /></div>
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-semibold text-gray-500 tracking-wider mb-3">推荐亮点</h4>
          <ul className="space-y-2">
            {place.highlights.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center text-gray-700"><span className={`mr-2 ${style.highlightIcon}`}>•</span>{item}</li>
            ))}
          </ul>
        </div>
        <div className={style.note}><p className={style.noteText}>"{place.note}"</p></div>
      </div>
    </div>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navLinks = [
    {to: '/analytics', label: '数据概览'},
    ...Object.values(locations).map(loc => ({to: `/location/${loc.id}`, label: loc.shortName})),
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-orange-200 selection:text-orange-900 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-orange-600 transition-colors">T</div>
              <span className="font-serif font-bold text-2xl tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">江安美食指南</span>
            </Link>
            <nav className="hidden md:flex space-x-4 lg:space-x-6 overflow-x-auto">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors whitespace-nowrap">{link.label}</Link>
              ))}
            </nav>
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-700"
              onClick={() => setMenuOpen(open => !open)}
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {menuOpen && (
            <nav className="md:hidden grid grid-cols-2 gap-2 pb-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-900 text-white py-12 text-center mt-auto">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">T</div>
        <p className="text-gray-400">© 2026 zackteam · 江安美食指南</p>
      </footer>
    </div>
  );
}

function parsePrice(highlights: string[]) {
  const priceText = highlights.find(item => /avg\.|rmb|人均|元/i.test(item));
  if (!priceText) return null;
  const numbers = priceText.match(/\d+/g)?.map(Number) ?? [];
  if (numbers.length === 0) return null;
  if (numbers.length === 1) return numbers[0];
  return (numbers[0] + numbers[1]) / 2;
}

function Analytics() {
  const locationStats = Object.values(locations).map(loc => {
    const itemCount = loc.items.length;
    const photoCount = loc.items.reduce((sum, item) => sum + (item.images?.length ?? 1), 0);
    const avgRating = itemCount ? loc.items.reduce((sum, item) => sum + item.rating, 0) / itemCount : 0;
    const prices = loc.items.map(item => parsePrice(item.highlights)).filter((price): price is number => price !== null);
    const avgPrice = prices.length ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 0;
    return { id: loc.id, name: loc.shortName, itemCount, photoCount, avgRating, avgPrice };
  });

  const totals = locationStats.reduce(
    (acc, loc) => ({
      itemCount: acc.itemCount + loc.itemCount,
      photoCount: acc.photoCount + loc.photoCount,
      avgRating: acc.avgRating,
      avgPrice: acc.avgPrice,
    }),
    { itemCount: 0, photoCount: 0, avgRating: 0, avgPrice: 0 },
  );
  const allItems = Object.values(locations).flatMap(loc => loc.items);
  const allPrices = allItems.map(item => parsePrice(item.highlights)).filter((price): price is number => price !== null);
  totals.avgRating = allItems.reduce((sum, item) => sum + item.rating, 0) / allItems.length;
  totals.avgPrice = allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length;

  const categoryCounts = allItems.reduce<Record<string, number>>((acc, item) => {
    const category = item.highlights.find(highlight => !/avg\.|rmb|人均|元/i.test(highlight)) ?? '综合';
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {});
  const categories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const maxItems = Math.max(...locationStats.map(loc => loc.itemCount));
  const maxPhotos = Math.max(...locationStats.map(loc => loc.photoCount));
  const maxCategory = Math.max(...categories.map(([, count]) => count));
  const palette = ['#f97316', '#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  let pieStart = 0;
  const pieGradient = locationStats.map((loc, index) => {
    const start = pieStart;
    const end = pieStart + (loc.itemCount / totals.itemCount) * 100;
    pieStart = end;
    return `${palette[index % palette.length]} ${start}% ${end}%`;
  }).join(', ');

  return (
    <div className="animate-in fade-in duration-500">
      <section className="px-4 sm:px-6 lg:px-8 py-14 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 text-orange-600 font-semibold mb-3">
            <BarChart3 size={22} />
            <span>数据概览</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">江安美食数据看板</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: '餐厅/菜品', value: totals.itemCount, icon: Store },
            { label: '照片', value: totals.photoCount, icon: Camera },
            { label: '平均价格', value: `${totals.avgPrice.toFixed(0)} 元`, icon: BarChart3 },
            { label: '平均评分', value: totals.avgRating.toFixed(1), icon: Star },
          ].map(card => (
            <div key={card.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <card.icon className="text-orange-500 mb-4" size={24} />
              <div className="text-3xl font-bold text-gray-900">{card.value}</div>
              <div className="text-sm text-gray-500 mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">餐厅/菜品占比</h2>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div
                className="relative h-56 w-56 rounded-full"
                style={{ background: `conic-gradient(${pieGradient})` }}
              >
                <div className="absolute inset-10 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="text-3xl font-bold text-gray-900">{totals.itemCount}</span>
                  <span className="text-xs text-gray-500">条目</span>
                </div>
              </div>
              <div className="w-full space-y-3">
                {locationStats.map((loc, index) => (
                  <div key={loc.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: palette[index % palette.length] }} />
                      <span className="font-medium text-gray-700 truncate">{loc.name}</span>
                    </div>
                    <span className="text-gray-500">{((loc.itemCount / totals.itemCount) * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">照片覆盖情况</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {locationStats.map((loc, index) => {
                const height = 84 + (loc.photoCount / maxPhotos) * 120;
                return (
                  <div
                    key={loc.id}
                    className="rounded-xl p-4 text-white flex flex-col justify-end shadow-sm"
                    style={{ backgroundColor: palette[index % palette.length], minHeight: `${height}px` }}
                  >
                    <div className="text-lg font-bold leading-tight">{loc.name}</div>
                    <div className="text-sm text-white/85">{loc.photoCount} 张照片</div>
                    <div className="text-xs text-white/75">{loc.itemCount} 个条目</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">各区域收录量</h2>
            <div className="space-y-5">
              {locationStats.map(loc => (
                <div key={loc.id}>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>{loc.name}</span>
                    <span>{loc.itemCount} 个条目</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(loc.itemCount / maxItems) * 100}%` }} />
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{loc.photoCount} 张照片 · 人均 {loc.avgPrice.toFixed(0)} 元 · 评分 {loc.avgRating.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">各区域照片数</h2>
            <div className="space-y-5">
              {locationStats.map(loc => (
                <div key={loc.id}>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>{loc.name}</span>
                    <span>{loc.photoCount} 张照片</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(loc.photoCount / maxPhotos) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">价格与评分</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3 pr-4">区域</th>
                    <th className="py-3 pr-4">平均价格</th>
                    <th className="py-3 pr-4">平均评分</th>
                    <th className="py-3">每条目照片数</th>
                  </tr>
                </thead>
                <tbody>
                  {locationStats.map(loc => (
                    <tr key={loc.id} className="border-b last:border-b-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">{loc.name}</td>
                      <td className="py-3 pr-4">{loc.avgPrice.toFixed(0)} 元</td>
                      <td className="py-3 pr-4">{loc.avgRating.toFixed(1)}</td>
                      <td className="py-3">{(loc.photoCount / loc.itemCount).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">高频美食标签</h2>
            <div className="space-y-4">
              {categories.map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>{category}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(count / maxCategory) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function Home() {
  return (
    <div className="animate-in fade-in duration-500">
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">发现江安校园的<br/><span className="text-orange-500 italic">好味道</span></h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">一份面向四川大学江安校区的美食指南：食堂、小西南门、SCUPI 周边和成都好店，都在这里。</p>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">今日推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFood.map(item => (
            <Link to={`/location/${item.locationId}`} key={item.id} className="block group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video overflow-hidden bg-gray-100"><img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" /></div>
                <div className="p-5 flex-grow flex flex-col"><h3 className="font-bold text-lg text-gray-900">{item.name}</h3><p className="text-sm text-orange-500 font-medium mt-1">{item.locationName}</p><div className="mt-auto pt-4"><StarRating rating={item.rating} /></div></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-50 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">按区域浏览</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(locations).map(loc => (
            <Link key={loc.id} to={`/location/${loc.id}`} className="relative h-48 rounded-2xl overflow-hidden group">
              <img src={loc.coverImage} alt={loc.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between"><div><h3 className="text-white font-bold text-xl drop-shadow-md">{loc.name}</h3><p className="text-white/80 text-sm mt-1 line-clamp-1">{loc.description}</p></div><ChevronRight className="text-white/0 group-hover:text-white/100 transition-all transform translate-x-4 group-hover:translate-x-0" /></div>
            </Link>
          ))}
        </div>
      </section>
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
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/location/:id" element={<LocationDetailView />} />
        </Routes>
      </Layout>
    </Router>
  );
}
