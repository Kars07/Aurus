import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCircle, Stethoscope, Search, MessageSquare, Send, Clock } from 'lucide-react';

const DoctorChat = () => {
  const { token, user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);

  // 1. Fetch available doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('https://auris-w1og.onrender.com/api/auth/doctors', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setDoctors(data.doctors || []);
          if (data.doctors?.length > 0) {
            setSelectedDoctorId(data.doctors[0]._id);
          }
        }
      } catch (e) {
        console.error("Failed to fetch doctors:", e);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchDoctors();
  }, [token]);

  // 2. Fetch messages for the selected doctor
  const fetchMessages = async (doctorId) => {
    try {
      if (!doctorId) return;
      const res = await fetch(`https://auris-w1og.onrender.com/api/messages/${doctorId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  };

  useEffect(() => {
    if (selectedDoctorId) fetchMessages(selectedDoctorId);
  }, [selectedDoctorId, token]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedDoctorId) return;

    const text = input.trim();
    setInput('');

    // Optimistic UI update
    const optimisticMsg = {
      _id: Date.now().toString(),
      senderId: user?.id,
      receiverId: selectedDoctorId,
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    try {
      const res = await fetch('https://auris-w1og.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: selectedDoctorId,
          text
        })
      });
      if (!res.ok) throw new Error("Failed to send");
      // Could re-fetch to resolve strictly from DB if needed
    } catch (e) {
      console.error("Message send failed:", e);
    }
  };

  const selectedDoctor = doctors.find(d => d._id === selectedDoctorId);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-[#F6FAFF]">
      <div className="w-10 h-10 border-4 border-[#06b6d4] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex-1 flex h-full min-h-[calc(100vh-80px)] overflow-hidden bg-[#F6FAFF]">
      {/* Sidebar: Doctor List */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-black text-slate-800 mb-4">Contact a Doctor</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search clinicans..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/40 focus:border-[#06b6d4] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
          {doctors.map((doc, i) => (
            <button
              key={doc._id}
              onClick={() => setSelectedDoctorId(doc._id)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${selectedDoctorId === doc._id
                  ? 'bg-[#06b6d4] text-white shadow-md shadow-cyan-200'
                  : 'bg-white hover:bg-cyan-50 border border-slate-100'
                }`}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex flex-shrink-0 justify-center items-center">
                <img src={`https://randomuser.me/api/portraits/men/${30 + i}.jpg`} alt="doc" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${selectedDoctorId === doc._id ? 'text-white' : 'text-slate-800'}`}>Dr. {doc.name.split(' ').pop()}</p>
                <p className={`text-xs truncate ${selectedDoctorId === doc._id ? 'text-cyan-200' : 'text-slate-500'}`}>Neurology Specialist</p>
              </div>
            </button>
          ))}
          {doctors.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-10 font-bold">No doctors available on platform right now.</p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedDoctor ? (
        <div className="flex-1 flex flex-col bg-[#F6FAFF]">
          {/* Header */}
          <div className="px-8 py-5 bg-white border-b border-slate-200 flex items-center gap-4 flex-shrink-0">
            <div className="p-2 bg-cyan-50 rounded-lg">
              <Stethoscope className="w-5 h-5 text-[#06b6d4]" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800">Dr. {selectedDoctor.name}</h3>
              <p className="text-sm text-cyan-600 font-semibold">{selectedDoctor.email}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-40">
                <MessageSquare className="w-12 h-12 mb-4 text-slate-300" />
                <p className="font-bold text-slate-400">Start a conversation directly with Dr. {selectedDoctor.name.split(' ').pop()}.</p>
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.senderId === user?.id;
                return (
                  <div key={msg._id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    {isMe ? (
                      <div className="w-9 h-9 flex-shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-slate-500" />
                      </div>
                    ) : (
                      <img src={`https://randomuser.me/api/portraits/men/30.jpg`} alt="doc" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    )}
                    <div className={`max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${isMe ? 'bg-[#06b6d4] text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                        }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold mt-1.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your secure message..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/50 focus:border-[#06b6d4] transition shadow-sm"
              />
              <button
                type="submit"
                className="px-5 py-3.5 bg-[#06b6d4] text-white rounded-xl shadow-sm hover:bg-cyan-800 transition font-bold flex items-center gap-2"
              >
                Send <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
          <p className="font-bold">Select a doctor to start messaging.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorChat;
