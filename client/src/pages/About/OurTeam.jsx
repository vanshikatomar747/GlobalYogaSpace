import React from "react";

const teamMembers = [
  {
    name: "Vatan",
    role: "CEO",
    image: "/team/Ceo.png",
    about: "Delhi Technological University '25",
  },
  {
    name: "Ajay Panwar",
    role: "COO",
    image: "/team/LeadCoach.png",
    about: "Bachelor's and Master in Yoga",
  },
  {
    name: "Vanshika Tomar",
    role: "Tech Lead",
    image: "/team/TechLead.png",
    about: "DCRUST '26",
  },
  {
    name: "Amar",
    role: "Lead Coach",
    image: "/team/HeadCoach.png",
    about: "Leads training with clear guidance and professional expertise.",
  },
  {
    name: "Rajni Lamba",
    role: "Yoga Therapist",
    image: "/team/YogaTherapist.png",
    about: "Supports healing through therapeutic yoga practices.",
  },
  {
    name: "Ye Seong Hwa",
    role: "SNPE Expert",
    image: "/team/SNPE.png",
    about: "Improves posture and balanced body alignment through SNPE.",
  },
  {
    name: "Neetu Gupta",
    role: "Fitness Coach",
    image: "/team/FitnessCoach.png",
    about: "Helps build strength and balanced fitness routines.",
  },
  {
    name: "Aruna singh",
    role: "Yoga Instructor",
    image: "/team/YogaInstructor.png",
    about: "Guides simple and mindful yoga sessions.",
  },
  {
    name: "Surjeet singh",
    role: "Yoga Instructor",
    image: "/team/YogaInstructor1.png",
    about: "Teaches beginner-friendly classes with breath focus.",
  }
];

const OurTeam = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-10 text-center text-orange-main">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-cream-main/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-green-main/10 hover:shadow-xl transition-shadow"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
            />
            <h3 className="text-xl font-bold text-green-main">{member.name}</h3>
            <p className="text-orange-main font-semibold text-sm mb-3 uppercase tracking-wider">{member.role}</p>
            <p className="text-gray-600 text-sm">{member.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
