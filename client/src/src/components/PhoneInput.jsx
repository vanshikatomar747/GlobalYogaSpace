import React, { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { getPhoneCountryCode } from "../utils/geolocation";

// Add flags for a more premium feel (using emoji for simplicity and performance)
const countryCodes = [
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+33", country: "FR", flag: "🇫🇷" },
];

const PhoneInput = ({ value, onChange, name = "phone", placeholder = "Phone Number", required = true }) => {
    const [selectedCode, setSelectedCode] = useState("+91"); // Temporary default
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // Auto-detect country code based on user's location using browser geolocation
    useEffect(() => {
        const detectCountry = async () => {
            try {
                const detectedCode = await getPhoneCountryCode();
                setSelectedCode(detectedCode);
            } catch (error) {
                console.log('Could not detect country, using default +91');
                // Keep default +91 if detection fails
            }
        };

        detectCountry();
    }, []);

    // Sync with prop value
    useEffect(() => {
        if (value) {
            const foundCode = countryCodes.find(c => value.startsWith(c.code));
            if (foundCode) {
                setSelectedCode(foundCode.code);
                setPhoneNumber(value.replace(foundCode.code, "").trim());
            } else {
                setPhoneNumber(value);
            }
        }
    }, []);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setSelectedCode(newCode);
        const newVal = `${newCode}${phoneNumber}`;
        onChange({ target: { name, value: newVal } });
    };

    const handleNumberChange = (e) => {
        const newNumber = e.target.value.replace(/[^0-9]/g, "");
        setPhoneNumber(newNumber);
        const newVal = `${selectedCode}${newNumber}`;
        onChange({ target: { name, value: newVal } });
    };

    return (
        <div
            className={`flex items-center w-full rounded-xl border bg-white transition-all duration-200 ease-in-out ${isFocused
                ? "border-orange-main ring-2 ring-orange-main/20 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
                }`}
        >
            <div className="relative border-r border-gray-100 flex-shrink-0">
                <select
                    value={selectedCode}
                    onChange={handleCodeChange}
                    className="appearance-none bg-transparent pl-4 pr-10 py-3.5 text-gray-700 font-medium cursor-pointer focus:outline-none z-10 relative h-full w-full"
                >
                    {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                        </option>
                    ))}
                </select>
                {/* Custom Arrow */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 font-bold">
                    <HiChevronDown size={16} />
                </div>
            </div>

            <input
                type="tel"
                name={name}
                value={phoneNumber}
                onChange={handleNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                required={required}
                className="flex-1 px-4 py-3.5 focus:outline-none bg-transparent text-gray-800 placeholder-gray-400 font-medium min-w-0"
            />
        </div>
    );
};

export default PhoneInput;
