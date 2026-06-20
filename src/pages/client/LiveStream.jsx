import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Heart, Share2, MessageCircle, Send, Eye } from "lucide-react";

const FAKE_COMMENTS = [
    { user: "Rahim Mia", av: "RM", color: "#16a34a", text: "Khub sundor farm! 🌾" },
    { user: "Fatema Begum", av: "FB", color: "#0284c7", text: "Daam koto taka per kg?" },
    { user: "Karim Ahmed", av: "KA", color: "#7c3aed", text: "Delivery ki Dhaka te hobe?" },
    { user: "Nasrin Akter", av: "NA", color: "#dc2626", text: "Organic product? 🌱" },
    { user: "Jamal Hossain", av: "JH", color: "#d97706", text: "Bhai kothay farm ta?" },
    { user: "Ritu Das", av: "RD", color: "#0891b2", text: "❤️ Live dekhchi" },
    { user: "Sohel Rana", av: "SR", color: "#15803d", text: "Daal ki available ache?" },
    { user: "Momena Khatun", av: "MK", color: "#9333ea", text: "Ei goru gulo ki sale e ache? 🐄" },
    { user: "Tuhin Sikder", av: "TS", color: "#b45309", text: "Best farming channel! 🙌" },
    { user: "Lina Parvin", av: "LP", color: "#1d4ed8", text: "Share korchi bhai! 🔗" },
    { user: "Arif Hossain", av: "AH", color: "#be185d", text: "Kobe next live?" },
    { user: "Salma Khanam", av: "SK", color: "#0f766e", text: "Maach ki ache? 🐟" },
];

// ✅ Farming video — autoplay + muted + loop
const VIDEO_ID = "Oqpj0NKTTJA";
const VIDEO_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=1&modestbranding=1&rel=0`;

const LiveBadge = () => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#dc2626",
            borderRadius: 6,
            padding: "4px 12px",
        }}
    >
        <span
            style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#fff",
                display: "inline-block",
                animation: "liveBlink 1s ease-in-out infinite alternate",
            }}
        />
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>LIVE</span>
    </div>
);

const Avatar = ({ label, color, size = 26 }) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.34,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
        }}
    >
        {label}
    </div>
);

const LiveStream = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [viewers, setViewers] = useState(1284);
    const [likes, setLikes] = useState(342);
    const [liked, setLiked] = useState(false);
    const chatRef = useRef(null);
    const ciRef = useRef(3);

    useEffect(() => {
        setMessages(FAKE_COMMENTS.slice(0, 3).map((c, i) => ({ ...c, id: i })));
        const t = setInterval(() => {
            const c = FAKE_COMMENTS[ciRef.current % FAKE_COMMENTS.length];
            ciRef.current++;
            setMessages((prev) => [...prev, { ...c, id: Date.now() }].slice(-40));
            setViewers((v) => v + Math.floor(Math.random() * 6));
        }, 2800);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);

    const sendMsg = () => {
        if (!inputText.trim()) return;
        setMessages((prev) =>
            [
                ...prev,
                {
                    user: "আপনি",
                    av: "আপ",
                    color: "#059669",
                    text: inputText.trim(),
                    id: Date.now(),
                },
            ].slice(-40),
        );
        setInputText("");
    };

    const toggleLike = () => {
        setLiked((l) => !l);
        setLikes((n) => (liked ? n - 1 : n + 1));
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                fontFamily: "'DM Sans','Segoe UI',sans-serif",
                padding: "24px 16px",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes liveBlink { from{opacity:1} to{opacity:0.2} }
        .ls-chat::-webkit-scrollbar{width:3px}
        .ls-chat::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}
        .ls-btn:hover{background:#334155!important}
        .ls-btn.liked{background:#dc2626!important}
        .ls-send:hover{background:#15803d!important}
        .ls-input::placeholder{color:#64748b}
        .ls-input:focus{outline:none;border-color:#16a34a!important}
        @media(max-width:700px){.ls-grid{grid-template-columns:1fr!important}}
      `}</style>

            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <LiveBadge />
                    <h1 style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 700, margin: 0 }}>
                        AgroFarm Live — সরাসরি মাঠ থেকে 🌾
                    </h1>
                </div>

                <div
                    className="ls-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 330px",
                        gap: 18,
                        alignItems: "start",
                    }}
                >
                    {/* Video */}
                    <div>
                        <div
                            style={{
                                position: "relative",
                                paddingBottom: "56.25%",
                                background: "#000",
                                borderRadius: 12,
                                overflow: "hidden",
                            }}
                        >
                            {/* Badges overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 12,
                                    left: 12,
                                    display: "flex",
                                    gap: 8,
                                    zIndex: 2,
                                    pointerEvents: "none",
                                }}
                            >
                                <LiveBadge />
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                        background: "rgba(0,0,0,0.6)",
                                        borderRadius: 6,
                                        padding: "4px 10px",
                                    }}
                                >
                                    <Eye size={13} color="#94a3b8" />
                                    <span
                                        style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}
                                    >
                                        {viewers.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* ✅ Video iframe — autoplay, muted, loop */}
                            <iframe
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                                src={VIDEO_SRC}
                                title="AgroFarm Live Stream"
                                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Meta */}
                        <div
                            style={{
                                marginTop: 14,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 10,
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        color: "#f1f5f9",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        margin: 0,
                                    }}
                                >
                                    Green Valley Farm — ধান ও সবজি চাষ Live
                                </p>
                                <p style={{ color: "#64748b", fontSize: 12, margin: "4px 0 0" }}>
                                    Borga Agro Farm · চলমান লাইভ
                                </p>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <motion.button
                                    className={`ls-btn${liked ? " liked" : ""}`}
                                    onClick={toggleLike}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        background: liked ? "#dc2626" : "#1e293b",
                                        border: "none",
                                        borderRadius: 8,
                                        padding: "8px 14px",
                                        cursor: "pointer",
                                        color: "#f1f5f9",
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: "inherit",
                                        transition: "background .2s",
                                    }}
                                >
                                    <Heart
                                        size={15}
                                        fill={liked ? "#fff" : "none"}
                                        stroke={liked ? "#fff" : "currentColor"}
                                    />
                                    {likes}
                                </motion.button>
                                <button
                                    className="ls-btn"
                                    onClick={() =>
                                        navigator.clipboard?.writeText(window.location.href)
                                    }
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        background: "#1e293b",
                                        border: "none",
                                        borderRadius: 8,
                                        padding: "8px 14px",
                                        cursor: "pointer",
                                        color: "#f1f5f9",
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: "inherit",
                                        transition: "background .2s",
                                    }}
                                >
                                    <Share2 size={15} /> শেয়ার
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                gap: 10,
                                marginTop: 14,
                            }}
                        >
                            {[
                                {
                                    label: "দর্শক",
                                    val: viewers.toLocaleString(),
                                    icon: <Users size={16} color="#16a34a" />,
                                },
                                {
                                    label: "লাইক",
                                    val: likes,
                                    icon: <Heart size={16} color="#dc2626" />,
                                },
                                {
                                    label: "মন্তব্য",
                                    val: messages.length,
                                    icon: <MessageCircle size={16} color="#0284c7" />,
                                },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        background: "#1e293b",
                                        borderRadius: 10,
                                        padding: "12px 14px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    {s.icon}
                                    <div>
                                        <div
                                            style={{
                                                color: "#f1f5f9",
                                                fontWeight: 700,
                                                fontSize: 17,
                                            }}
                                        >
                                            {s.val}
                                        </div>
                                        <div style={{ color: "#64748b", fontSize: 11 }}>
                                            {s.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat */}
                    <div
                        style={{
                            background: "#1e293b",
                            borderRadius: 12,
                            display: "flex",
                            flexDirection: "column",
                            height: 520,
                        }}
                    >
                        <div
                            style={{
                                padding: "13px 15px",
                                borderBottom: "1px solid #334155",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <MessageCircle size={15} color="#16a34a" />
                            <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14 }}>
                                লাইভ চ্যাট
                            </span>
                            <span
                                style={{
                                    marginLeft: "auto",
                                    background: "#dc2626",
                                    color: "#fff",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: "2px 8px",
                                    borderRadius: 20,
                                    letterSpacing: 0.5,
                                }}
                            >
                                LIVE
                            </span>
                        </div>

                        <div
                            ref={chatRef}
                            className="ls-chat"
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                padding: "12px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            <AnimatePresence initial={false}>
                                {messages.map((m) => (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.28 }}
                                        style={{
                                            display: "flex",
                                            gap: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Avatar label={m.av} color={m.color} size={26} />
                                        <div>
                                            <div
                                                style={{
                                                    color: m.color,
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    marginBottom: 2,
                                                }}
                                            >
                                                {m.user}
                                            </div>
                                            <div
                                                style={{
                                                    color: "#cbd5e1",
                                                    fontSize: 13,
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {m.text}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div
                            style={{
                                padding: "11px 12px",
                                borderTop: "1px solid #334155",
                                display: "flex",
                                gap: 8,
                            }}
                        >
                            <input
                                className="ls-input"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                                placeholder="মন্তব্য করুন..."
                                style={{
                                    flex: 1,
                                    background: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: 8,
                                    padding: "8px 11px",
                                    color: "#f1f5f9",
                                    fontSize: 13,
                                    fontFamily: "inherit",
                                    transition: "border-color .2s",
                                }}
                            />
                            <button
                                className="ls-send"
                                onClick={sendMsg}
                                style={{
                                    background: "#16a34a",
                                    border: "none",
                                    borderRadius: 8,
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    transition: "background .2s",
                                }}
                            >
                                <Send size={15} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveStream;
