import { useState } from "react";
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import LocalizedInput from "../shared/LocalizedInput";

const MEAL_OPTIONS = ["Breakfast", "Lunch", "Dinner"];
const emptyDay = { day: "", title: { en: "", bn: "" }, activities: [], meals: [] };

const ItineraryTab = ({ formData, setFormData }) => {
    const [draft, setDraft] = useState(emptyDay);
    const [activityEn, setActivityEn] = useState("");
    const [activityBn, setActivityBn] = useState("");
    const [expanded, setExpanded] = useState(null);

    const update = (field, value) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const addActivity = () => {
        if (!activityEn.trim()) return;
        setDraft((p) => ({
            ...p,
            activities: [...p.activities, { en: activityEn.trim(), bn: activityBn.trim() || activityEn.trim() }],
        }));
        setActivityEn("");
        setActivityBn("");
    };

    const removeActivity = (i) =>
        setDraft((p) => ({ ...p, activities: p.activities.filter((_, idx) => idx !== i) }));

    const toggleDraftMeal = (meal) => {
        setDraft((p) => ({
            ...p,
            meals: p.meals.includes(meal)
                ? p.meals.filter((m) => m !== meal)
                : [...p.meals, meal],
        }));
    };

    const addDay = () => {
        if (!draft.day || !draft.title.en || !draft.title.bn) return;
        const sorted = [...formData.itinerary, { ...draft, day: parseInt(draft.day) }].sort(
            (a, b) => a.day - b.day
        );
        update("itinerary", sorted);
        setDraft(emptyDay);
    };

    const removeDay = (i) =>
        update("itinerary", formData.itinerary.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-4">
            {/* Existing days */}
            {formData.itinerary.map((dayObj, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => setExpanded(expanded === i ? null : i)}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full flex items-center justify-center">
                                {dayObj.day}
                            </span>
                            <div>
                                <p className="font-medium text-gray-900 text-sm">{dayObj.title.en}</p>
                                <p className="text-xs text-gray-500">{dayObj.title.bn}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                                {dayObj.activities.length} activities
                            </span>
                            {expanded === i ? (
                                <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                            )}
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeDay(i); }}
                                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {expanded === i && (
                        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                            {dayObj.meals?.length > 0 && (
                                <p className="text-xs text-gray-500 mb-2">
                                    Meals: <span className="text-gray-700">{dayObj.meals.join(", ")}</span>
                                </p>
                            )}
                            <ul className="space-y-1">
                                {dayObj.activities.map((act, j) => (
                                    <li key={j} className="text-sm text-gray-600 flex gap-2">
                                        <span className="text-emerald-500 mt-0.5">•</span>
                                        <span>{act.en} {act.bn && act.bn !== act.en && <span className="text-gray-400">/ {act.bn}</span>}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            {/* Draft new day */}
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-4">
                <h4 className="text-sm font-semibold text-emerald-800">+ Add New Day</h4>
                <div className="flex gap-3 items-start">
                    <div className="w-20">
                        <label className="text-xs text-gray-600 mb-1 block">Day #</label>
                        <input
                            type="number"
                            value={draft.day}
                            onChange={(e) => setDraft((p) => ({ ...p, day: e.target.value }))}
                            min="1"
                            placeholder="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <LocalizedInput
                            label="Day Title"
                            required
                            valueEn={draft.title.en}
                            valueBn={draft.title.bn}
                            onChangeEn={(v) => setDraft((p) => ({ ...p, title: { ...p.title, en: v } }))}
                            onChangeBn={(v) => setDraft((p) => ({ ...p, title: { ...p.title, bn: v } }))}
                        />
                    </div>
                </div>

                {/* Activities for this draft day */}
                {draft.activities.length > 0 && (
                    <ul className="space-y-1 pl-2">
                        {draft.activities.map((act, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="text-emerald-500">•</span>
                                <span className="flex-1">{act.en}</span>
                                <button type="button" onClick={() => removeActivity(i)}>
                                    <TrashIcon className="w-3.5 h-3.5 text-red-400 hover:text-red-600" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="text"
                        value={activityEn}
                        onChange={(e) => setActivityEn(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
                        placeholder="Activity (English)"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={activityBn}
                            onChange={(e) => setActivityBn(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
                            placeholder="Activity (বাংলা)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <button
                            type="button"
                            onClick={addActivity}
                            className="px-3 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50"
                        >
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-600 mb-1.5 block">Meals Included</label>
                    <div className="flex gap-2">
                        {MEAL_OPTIONS.map((meal) => (
                            <button
                                key={meal}
                                type="button"
                                onClick={() => toggleDraftMeal(meal)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                    draft.meals.includes(meal)
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "bg-white text-gray-600 border-gray-300 hover:border-emerald-300"
                                }`}
                            >
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={addDay}
                    disabled={!draft.day || !draft.title.en || !draft.title.bn}
                    className="w-full py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add Day to Itinerary
                </button>
            </div>
        </div>
    );
};

export default ItineraryTab;