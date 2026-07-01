const LocalizedInput = ({
    label,
    required,
    valueEn,
    valueBn,
    onChangeEn,
    onChangeBn,
    placeholderEn = "English",
    placeholderBn = "বাংলা",
    type = "text",
}) => (
    <div>
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        )}
        <div className="grid grid-cols-2 gap-2">
            <div>
                <input
                    type={type}
                    value={valueEn}
                    onChange={(e) => onChangeEn(e.target.value)}
                    placeholder={placeholderEn}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
                <p className="text-[11px] text-gray-400 mt-0.5">English</p>
            </div>
            <div>
                <input
                    type={type}
                    value={valueBn}
                    onChange={(e) => onChangeBn(e.target.value)}
                    placeholder={placeholderBn}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
                <p className="text-[11px] text-gray-400 mt-0.5">বাংলা</p>
            </div>
        </div>
    </div>
);

export default LocalizedInput;