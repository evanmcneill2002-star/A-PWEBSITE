// Minimal sample content so the site runs. Add more topics later.
export const sectionList = ["general", "airframe", "powerplant"];

export const sections = {
  general: {
    title: "General",
    topics: [
      { slug: "math-and-physics", title: "Mathematics & Basic Physics" },
      { slug: "basic-electricity", title: "Basic Electricity" }
    ]
  },
  airframe: {
    title: "Airframe",
    topics: [
      { slug: "structures", title: "Aircraft Structures" },
      { slug: "hydraulics", title: "Hydraulic & Pneumatic Systems" }
    ]
  },
  powerplant: {
    title: "Powerplant",
    topics: [
      { slug: "ignition", title: "Ignition & Magnetos" },
      { slug: "fuel-systems", title: "Fuel Metering Systems" }
    ]
  }
};

export function getSectionData(section) {
  return sections[section] || null;
}

export function getTopicData(section, topic) {
  // Tiny demo content + interactive flags
  const map = {
    general: {
      "math-and-physics": {
        title: "Mathematics & Basic Physics",
        sections: [
          {
            heading: "Basic Math Refresher",
            texts: [
              "Review arithmetic, fractions, decimals, and unit conversions.",
              "Tip: Use the built-in calculator below for practice."
            ],
            calculator: true
          },
          {
            heading: "Physics Fundamentals",
            texts: [
              "Mass vs. weight, force (F=ma), work, power, energy units.",
              "Know unit conversions (in-lb↔ft-lb), and density basics."
            ]
          }
        ],
        quiz: [
          {
            id: 1,
            question: "What is the unit of force?",
            options: ["Watt", "Newton", "Joule"],
            answerIndex: 1
          },
          {
            id: 2,
            question: "Power equals:",
            options: ["Work / Time", "Force × Distance", "Mass × Acceleration"],
            answerIndex: 0
          }
        ],
        flashcards: [
          { q: "1 horsepower equals how many watts?", a: "≈746 W" },
          { q: "Work formula?", a: "W = F × d" }
        ]
      },
      "basic-electricity": {
        title: "Basic Electricity",
        sections: [
          {
            heading: "Ohm's Law",
            texts: [
              "V = I × R. If two are known, solve for the third.",
              "Practice scenarios with the multimeter simulator."
            ],
            multimeter: true
          }
        ],
        quiz: [
          {
            id: 1,
            question: "If V=12V and R=6Ω, current I is:",
            options: ["2 A", "0.5 A", "72 A"],
            answerIndex: 0
          }
        ],
        flashcards: [
          { q: "Unit of resistance?", a: "Ohm (Ω)" },
          { q: "Unit of current?", a: "Ampere (A)" }
        ]
      }
    },
    airframe: {
      structures: {
        title: "Aircraft Structures",
        sections: [
          {
            heading: "Airframe Basics",
            texts: [
              "Identify key structural members: longerons, stringers, bulkheads.",
              "Try the drag-and-drop label trainer."
            ],
            dragDrop: {
              items: [
                { id: "longeron", name: "Longeron" },
                { id: "bulkhead", name: "Bulkhead" }
              ],
              targets: [
                { id: "longeron", label: "Longeron", position: { x: "40%", y: "30%" } },
                { id: "bulkhead", label: "Bulkhead", position: { x: "70%", y: "60%" } }
              ]
            }
          }
        ],
        quiz: [
          {
            id: 1,
            question: "A longitudinal structural member in a fuselage is a:",
            options: ["Bulkhead", "Longeron", "Rib"],
            answerIndex: 1
          }
        ],
        flashcards: [
          { q: "Function of bulkhead?", a: "Transverse structural support" }
        ]
      },
      hydraulics: {
        title: "Hydraulic & Pneumatic Systems",
        sections: [
          {
            heading: "Hydraulics Basics",
            texts: [
              "Pascal’s Law: Pressure applied to a confined fluid is transmitted equally.",
              "Identify typical components: pump, reservoir, actuators, valves."
            ]
          }
        ],
        quiz: [
          {
            id: 1,
            question: "Fluid pressure acts:",
            options: ["Unequally", "Equally in all directions", "Only downward"],
            answerIndex: 1
          }
        ],
        flashcards: [{ q: "Hydraulic fluid property?", a: "Incompressible" }]
      }
    },
    powerplant: {
      ignition: {
        title: "Ignition & Magnetos",
        sections: [
          {
            heading: "Magneto Purpose",
            texts: [
              "Provide spark to ignite the mixture independent of aircraft electrical system."
            ]
          }
        ],
        quiz: [
          {
            id: 1,
            question: "Primary purpose of a magneto:",
            options: [
              "Generate avionics power",
              "Ignite the fuel-air mixture",
              "Start the engine cranking"
            ],
            answerIndex: 1
          }
        ],
        flashcards: [{ q: "Impulse coupling use?", a: "Improves starting spark timing" }]
      },
      "fuel-systems": {
        title: "Fuel Metering Systems",
        sections: [
          {
            heading: "Carburetion vs. Fuel Injection",
            texts: [
              "Know icing susceptibility, mixture control, and altitude compensation."
            ]
          }
        ],
        quiz: [
          {
            id: 1,
            question: "A common carb icing symptom is:",
            options: ["RPM increase", "RPM drop/roughness", "Higher EGT immediately"],
            answerIndex: 1
          }
        ],
        flashcards: [{ q: "Mixture controls:", a: "Air-fuel ratio" }]
      }
    }
  };

  return map?.[section]?.[topic] || null;
}
