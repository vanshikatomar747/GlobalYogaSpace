import React, { useEffect, useState } from "react";

const Loader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show for 2 seconds then hide
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-cream-main flex flex-col items-center justify-center text-green-main transition-opacity duration-500 px-4">
      <div className="animate-pulse flex flex-col items-center">
        {/* Om Image / Character */}
        <div className="text-7xl md:text-9xl font-bold text-orange-main mb-6 md:mb-8 leading-none drop-shadow-lg">
          ॐ
        </div>

        {/* Mantra */}
        <div className="text-center space-y-2 md:space-y-4 max-w-2xl px-4">
          <div className="text-base md:text-2xl lg:text-3xl font-serif font-medium leading-relaxed flex flex-col items-center">
            <span>ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।</span>
            <span>सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ।</span>
            <span>ॐ शान्तिः शान्तिः शान्तिः ॥</span>
          </div>
          <div className="text-xs md:text-sm lg:text-base opacity-80 mt-2 md:mt-4 italic font-sans flex flex-col items-center">
            <span>Om Sarve Bhavantu Sukhinah Sarve Santu Niraamayaah |</span>
            <span>Sarve Bhadraanni Pashyantu Maa Kashcid-Duhkha-Bhaag-Bhavet |</span>
            <span>Om Shaantih Shaantih Shaantih ||</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
