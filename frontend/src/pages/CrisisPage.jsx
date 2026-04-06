import { motion } from "framer-motion";
import { ChevronLeft, Phone, AlertTriangle } from "lucide-react";

const crisisServices = [
  {
    category: "Emergency",
    services: [
      {
        name: "Emergency Services (Police, Ambulance, Fire)",
        phone: "000",
        description: null
      }
    ]
  },
  {
    category: "Alcohol & Other Drug Support",
    services: [
      {
        name: "ADIS (Alcohol Drug Information Service)",
        phone: "1800 250 015",
        description: "24/7 counselling related to alcohol and other drugs"
      },
      {
        name: "Family Drug Support",
        phone: "1300 368 186",
        description: "24/7 support for families affected by AOD use"
      }
    ]
  },
  {
    category: "Mental Health & Suicide Support",
    services: [
      {
        name: "Lifeline",
        phone: "13 11 14",
        description: "24/7 crisis support"
      },
      {
        name: "Suicide Call Back Service",
        phone: "1300 659 467",
        description: "24/7 counselling"
      },
      {
        name: "Beyond Blue",
        phone: "1300 22 4636",
        description: null
      },
      {
        name: "MHAL (Mental Health Access Line)",
        phone: "1800 011 511",
        description: "Links people in NSW to mental health services – free service"
      }
    ]
  },
  {
    category: "Domestic & Family Violence",
    services: [
      {
        name: "NSW Domestic Violence Line",
        phone: "1800 656 463",
        description: "24/7 support and safety planning"
      },
      {
        name: "1800RESPECT",
        phone: "1800 737 732",
        description: "24/7 national domestic, family and sexual violence support"
      },
      {
        name: "Men's Line Australia",
        phone: "1300 789 978",
        description: null
      }
    ]
  },
  {
    category: "Sexual Assault & Victim Support",
    services: [
      {
        name: "NSW Sexual Violence Helpline (Full Stop Australia)",
        phone: "1800 424 017",
        description: "24/7"
      },
      {
        name: "NSW Victims Access Line",
        phone: "1800 633 063",
        description: null
      }
    ]
  },
  {
    category: "Housing & Crisis Accommodation",
    services: [
      {
        name: "Link2Home (NSW Homelessness Line)",
        phone: "1800 152 152",
        description: "24/7 emergency accommodation referral"
      }
    ]
  },
  {
    category: "Young People",
    services: [
      {
        name: "Kids Helpline (ages 5–25)",
        phone: "1800 55 1800",
        description: "24/7 counselling"
      }
    ]
  },
  {
    category: "Aboriginal & Torres Strait Islander Support",
    services: [
      {
        name: "13YARN",
        phone: "13 92 76",
        description: "24/7 culturally safe crisis support"
      }
    ]
  }
];

const CrisisPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Header */}
      <header className="bg-[#F9F6F0]/90 backdrop-blur-xl border-b border-[#D1C9BC]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A3026]">
              Natalie Bull
            </a>
            <div className="flex items-center gap-6">
              <a href="/about" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium">
                About
              </a>
              <a href="/" className="text-[#5C6656] hover:text-[#2A3026] text-sm font-medium flex items-center gap-2">
                <ChevronLeft size={18} />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C87961]/20 rounded-full mb-6">
            <AlertTriangle className="w-8 h-8 text-[#C87961]" />
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl tracking-tight leading-[1.1] font-medium text-[#2A3026] mb-6">
            Crisis Support
          </h1>
          <div className="bg-[#FFAA80]/20 border border-[#FFAA80]/40 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-[#2A3026] font-medium">
              This service does not provide crisis support. If you are in immediate danger or need urgent assistance, please contact one of the services below.
            </p>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-medium text-[#2A3026] text-center">
            Crisis & Support Services
          </h2>
          <p className="text-[#5C6656] text-center mt-2">Northern NSW / Australia</p>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#C87961] text-white rounded-2xl p-6 mb-8"
        >
          <p className="text-center font-medium mb-4">
            If you or someone else is in immediate danger, please call:
          </p>
          <a 
            href="tel:000" 
            className="flex items-center justify-center gap-3 bg-white text-[#C87961] rounded-xl py-4 px-6 font-bold text-2xl hover:bg-[#F9F6F0] transition-colors"
          >
            <Phone className="w-6 h-6" />
            000
          </a>
          <p className="text-center mt-3 text-white/80 text-sm">
            Emergency Services (Police, Ambulance, Fire)
          </p>
        </motion.div>

        {/* Crisis Categories */}
        <div className="space-y-6">
          {crisisServices.slice(1).map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
              className="bg-[#F4EFE6] rounded-2xl p-6"
            >
              <h3 className="font-['Cormorant_Garamond'] text-xl font-medium text-[#2A3026] mb-4 pb-3 border-b border-[#D1C9BC]">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.services.map((service) => (
                  <div key={service.phone} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-[#2A3026] font-medium">{service.name}</p>
                      {service.description && (
                        <p className="text-[#5C6656] text-sm">{service.description}</p>
                      )}
                    </div>
                    <a
                      href={`tel:${service.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 bg-[#8A9A86] text-white px-4 py-2 rounded-lg hover:bg-[#5C6656] transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4" />
                      {service.phone}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#8A9A86] hover:text-[#2A3026] transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Home
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2A3026] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="font-['Cormorant_Garamond'] text-2xl mb-4">Natalie Bull</p>
          <p className="text-white/60 text-sm">
            Accredited Mental Health Social Worker
          </p>
          <p className="text-white/40 text-sm mt-6">
            Northern NSW, Murwillumbah, Australia
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CrisisPage;
