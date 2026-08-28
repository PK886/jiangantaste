import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { locations, FoodItem } from './data';

type Comment = {
  name: string;
  text: string;
  created: number;
  image?: string;
};

function curatedImages(item: FoodItem) {
  const images = item.images ?? [item.image];
  const priority = images.filter((img) => {
    const lower = img.toLowerCase();
    return !/\/menu-\d+\./.test(lower) && !/\/\d+\.(jpg|png|jpeg|webp)$/.test(lower);
  });
  const selected = priority.length >= 2 ? priority : images;
  return Array.from(new Set(selected)).slice(0, 6);
}

function StarRatingLocal({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm font-medium text-gray-600">{rating}</span>
    </div>
  );
}

export default function LocationDetailView() {
  const { id } = useParams();
  const location = locations[id || ''];
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [selectedComments, setSelectedComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentImage, setCommentImage] = useState<string | undefined>();

  useEffect(() => {
    if (selected) {
      const stored = localStorage.getItem(`comments:${selected.id}`);
      setSelectedComments(stored ? JSON.parse(stored) : []);
      setCommentImage(undefined);
    }
  }, [selected]);

  if (!location) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">没有找到这个区域</h2>
        <Link to="/" className="text-orange-500 hover:underline">返回首页</Link>
      </div>
    );
  }

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    let imageToStore = commentImage;
    if (commentImage && (window as any).electronAPI?.saveFile) {
      try {
        const mime = commentImage.substring(5, commentImage.indexOf(';')) || 'image/png';
        const extMatch = mime.match(/image\/(png|jpeg|jpg|gif|webp)/);
        const ext = extMatch ? extMatch[1].replace('jpeg', 'jpg') : 'png';
        const filename = `${selected.id}-${Date.now()}.${ext}`;
        const savedPath = await (window as any).electronAPI.saveFile(filename, commentImage);
        imageToStore = `file://${savedPath}`;
      } catch (err) {
        console.error('Failed to save file via electronAPI', err);
      }
    }

    const c = { name: commentName || '匿名用户', text: commentText, image: imageToStore, created: Date.now() };
    const updated = [c, ...selectedComments];
    localStorage.setItem(`comments:${selected.id}`, JSON.stringify(updated));
    setSelectedComments(updated);
    setCommentName('');
    setCommentText('');
    setCommentImage(undefined);
  };

  const handleCommentImage = (file?: File) => {
    if (!file) {
      setCommentImage(undefined);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCommentImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[350px] w-full">
        <img src={location.coverImage} alt={location.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 w-fit transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={18} className="mr-2" /> 返回首页
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{location.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{location.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">这里吃什么</h2>
          <div className="w-20 h-1 bg-orange-500 mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {location.items.map(item => (
            <div key={item.id} className="cursor-pointer" onClick={() => setSelected(item)}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <div className="mt-auto pt-4">
                    <StarRatingLocal rating={item.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto z-10">
            <div className="flex gap-6 p-6 flex-col md:flex-row">
              <div className="md:w-1/2 w-full space-y-2">
                {curatedImages(selected).map((img, idx) => (
                  <img key={idx} src={img} alt={`${selected.name}-${idx}`} className="w-full h-56 object-contain rounded-md bg-gray-100 p-2" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div className="md:w-1/2 w-full">
                <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
                <StarRatingLocal rating={selected.rating} />
                <p className="mt-4 text-gray-700">{selected.note}</p>
                <h4 className="mt-4 font-semibold">推荐亮点</h4>
                <ul className="list-disc ml-5">
                  {selected.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>

                <div className="mt-6">
                  <h4 className="font-semibold text-lg">同学评论</h4>
                  <div className="space-y-3 mt-3">
                    {selectedComments.length === 0 ? <p className="text-sm text-gray-500">还没有评论</p> : selectedComments.map((c, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm font-medium">{c.name} <span className="text-xs text-gray-400 ml-2">{new Date(c.created).toLocaleString()}</span></div>
                        <div className="text-gray-700 mt-1">{c.text}</div>
                        {c.image && <img src={c.image} alt={`${c.name} upload`} className="mt-3 w-full max-h-48 object-contain rounded-md bg-white border border-gray-100 p-2" />}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={submitComment} className="mt-4">
                    <input value={commentName} onChange={e => setCommentName(e.target.value)} placeholder="你的名字" className="w-full mb-2 p-2 border rounded" />
                    <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="写下你的评价" className="w-full p-2 border rounded mb-2" />
                    <label className="block mb-3">
                      <span className="text-sm font-medium text-gray-600">上传照片</span>
                      <input type="file" accept="image/*" onChange={e => handleCommentImage(e.target.files?.[0])} className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border-0 file:bg-orange-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-orange-700 hover:file:bg-orange-100" />
                    </label>
                    {commentImage && (
                      <div className="mb-3">
                        <img src={commentImage} alt="Upload preview" className="w-full max-h-40 object-contain rounded-md bg-gray-100 p-2" />
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button type="button" onClick={() => setSelected(null)} className="mr-2 px-4 py-2 border rounded">关闭</button>
                      <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">发布评论</button>
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
