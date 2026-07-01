import { useState } from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import LocalizedInput from "../shared/LocalizedInput";
import LocalizedTextarea from "../shared/LocalizedTextarea";

// Reusable localized list (inclusions, exclusions)
const LocalizedList = ({ label, items, onAdd, onRemove }) => {
    const [en, setEn] = useState("");
    const [bn, setBn] = useState("");

    const handleAdd = () => {
        if (!en.trim()) return;
        onAdd({ en: en.trim(), bn: bn.trim() || en.trim() });
        setEn(""); setBn("");
    };

    return (
        <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">{label}</h4>
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex-1 text-sm">
                        <span className="text-gray-800">{item.en}</span>
                        {item.bn && item.bn !== item.en && (
                            <span className="text-gray-400 ml-2 text-xs">/ {item.bn}</span>
                        )}
                    </div>
                    <button type="button" onClick={() => onRemove(i)}>
                        <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-600" />
                    </button>
                </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
                <input
                    type="text"
                    value={en}
                    onChange={(e) => setEn(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
                    placeholder="English"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={bn}
                        onChange={(e) => setBn(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
                        placeholder="বাংলা"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!en.trim()}
                        className="px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100 disabled:opacity-50"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ContentTab = ({ formData, setFormData }) => {
    const [faqDraft, setFaqDraft] = useState({
        question: { en: "", bn: "" },
        answer: { en: "", bn: "" },
    });

    const update = (field, value) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const updateNoteField = (key, lang, value) =>
        setFormData((p) => ({
            ...p,
            importantNotes: {
                ...p.importantNotes,
                [key]: { ...p.importantNotes[key], [lang]: value },
            },
        }));

    const addFaq = () => {
        if (!faqDraft.question.en || !faqDraft.answer.en) return;
        update("faqs", [...formData.faqs, faqDraft]);
        setFaqDraft({ question: { en: "", bn: "" }, answer: { en: "", bn: "" } });
    };

    return (
        <div className="space-y-8">
            {/* Inclusions */}
            <LocalizedList
                label="✅ Inclusions"
                items={formData.inclusions}
                onAdd={(item) => update("inclusions", [...formData.inclusions, item])}
                onRemove={(i) =>
                    update("inclusions", formData.inclusions.filter((_, idx) => idx !== i))
                }
            />

            <hr className="border-gray-200" />

            {/* Exclusions */}
            <LocalizedList
                label="❌ Exclusions"
                items={formData.exclusions}
                onAdd={(item) => update("exclusions", [...formData.exclusions, item])}
                onRemove={(i) =>
                    update("exclusions", formData.exclusions.filter((_, idx) => idx !== i))
                }
            />

            <hr className="border-gray-200" />

            {/* Important Notes */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">📝 Important Notes</h4>
                {[
                    { key: "clothing", label: "Clothing" },
                    { key: "health", label: "Health" },
                    { key: "cultural", label: "Cultural" },
                    { key: "connectivity", label: "Connectivity" },
                ].map(({ key, label }) => (
                    <LocalizedInput
                        key={key}
                        label={label}
                        valueEn={formData.importantNotes?.[key]?.en || ""}
                        valueBn={formData.importantNotes?.[key]?.bn || ""}
                        onChangeEn={(v) => updateNoteField(key, "en", v)}
                        onChangeBn={(v) => updateNoteField(key, "bn", v)}
                    />
                ))}
            </div>

            <hr className="border-gray-200" />

            {/* Cancellation Policy */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">🔁 Cancellation Policy</h4>
                {Object.entries(formData.cancellationPolicy || {}).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={key}
                            readOnly
                            className="w-36 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-600"
                        />
                        <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                                update("cancellationPolicy", {
                                    ...formData.cancellationPolicy,
                                    [key]: e.target.value,
                                })
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const cp = { ...formData.cancellationPolicy };
                                delete cp[key];
                                update("cancellationPolicy", cp);
                            }}
                            className="text-red-400 hover:text-red-600"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        const key = `before${Object.keys(formData.cancellationPolicy || {}).length + 1}`;
                        update("cancellationPolicy", {
                            ...formData.cancellationPolicy,
                            [key]: "",
                        });
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                    <PlusIcon className="w-4 h-4" /> Add policy row
                </button>
            </div>

            <hr className="border-gray-200" />

            {/* FAQs */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">❓ FAQs</h4>

                {formData.faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex gap-3"
                    >
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">Q: {faq.question.en}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{faq.question.bn}</p>
                            <p className="text-sm text-gray-600 mt-1">A: {faq.answer.en}</p>
                            <p className="text-xs text-gray-400">{faq.answer.bn}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => update("faqs", formData.faqs.filter((_, idx) => idx !== i))}
                        >
                            <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-600" />
                        </button>
                    </div>
                ))}

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 space-y-3">
                    <h5 className="text-xs font-semibold text-yellow-800">New FAQ</h5>
                    <LocalizedInput
                        label="Question"
                        valueEn={faqDraft.question.en}
                        valueBn={faqDraft.question.bn}
                        onChangeEn={(v) =>
                            setFaqDraft((p) => ({ ...p, question: { ...p.question, en: v } }))
                        }
                        onChangeBn={(v) =>
                            setFaqDraft((p) => ({ ...p, question: { ...p.question, bn: v } }))
                        }
                    />
                    <LocalizedTextarea
                        label="Answer"
                        rows={2}
                        valueEn={faqDraft.answer.en}
                        valueBn={faqDraft.answer.bn}
                        onChangeEn={(v) =>
                            setFaqDraft((p) => ({ ...p, answer: { ...p.answer, en: v } }))
                        }
                        onChangeBn={(v) =>
                            setFaqDraft((p) => ({ ...p, answer: { ...p.answer, bn: v } }))
                        }
                    />
                    <button
                        type="button"
                        onClick={addFaq}
                        disabled={!faqDraft.question.en || !faqDraft.answer.en}
                        className="w-full py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
                    >
                        Add FAQ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentTab;